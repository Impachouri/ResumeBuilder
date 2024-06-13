import { useContext } from "react";
import { AppContext, AppContextStateType } from "../../../context/appContext";
import { ErrorBoundary } from "react-error-boundary";
import TextEditor from "../../TextEditor/TextEditor";
import { FormButton } from "../../AppForm/FormComponents";
import { ApiContext } from "../../../context/apiContext";
import ResumeAPI from "../../../service/appApi";
// import { saveAchievement } from "../../../service/appApi";

const AchievementForm = () => {
  const {
    state: appState,
    dispatch: appDispatch,
    activeSection,
    resumeProfile,
  } = useContext(AppContext) as AppContextStateType;
  const { dispatch: apiDispatch } = useContext(ApiContext);
  const achievements = appState["achievements"];

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.currentTarget;
  //   dispatch({type:"ACHIEVEMENTS", data: {name:name, value:value}});
  // }

  const handleTextArea = (content: string) => {
    appDispatch({
      type: "ACHIEVEMENTS",
      data: { name: "summary", value: content },
    });
  };

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = appState.achievements;
    let response;
    try {
      if (data._id) {
        response = await ResumeAPI.update(
          `resume/achievement/${data._id}`,
          data,
          apiDispatch
        );
      } else {
        response = await ResumeAPI.create(
          `resume/achievement/${resumeProfile}`,
          data,
          apiDispatch
        );
        appDispatch({
          type: "ACHIEVEMENTS",
          data: {
            name: "_id",
            value: response.data._id,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-6 mb-6">
          <h2 className="uppercase text-3xl font-bold">{activeSection}</h2>
        </div>
        <form className="flex flex-col gap-7">
          <TextEditor
            label=""
            id="summary"
            value={achievements.summary}
            handleTextArea={handleTextArea}
          />
          <FormButton
            label="Save"
            id="saveAchievement"
            handleClick={handleSave}
          />
          {/* <FormTextArea type="text" label="Responsibility" id="responsibilities" defaultValue={achievements} handleInputChange={ handleInputChange } /> */}
        </form>
      </div>
    </ErrorBoundary>
  );
};

export default AchievementForm;

// const formFields: FormFieldProps["formFields"]  = [
//   { label: "Achievements", type: "text-area", name: "achievements", id: "achievements", value:achievements },
// ];

// const formAction: FormFieldProps["formAction"] = [
//   {label:"Save", name:"saveAchievement" , id:"saveAchievement"},
// ]
