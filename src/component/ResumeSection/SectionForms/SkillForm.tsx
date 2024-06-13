// import SectionFormTemplate, { FormFieldProps } from "./SectionFormTemplate";
// import { FormTextArea } from "../../Forms/FormComponents";
import { ErrorBoundary } from "react-error-boundary";
import { useContext } from "react";
import { AppContext, AppContextStateType } from "../../../context/appContext";
import TextEditor from "../../TextEditor/TextEditor";
import { ApiContext } from "../../../context/apiContext";
import { FormButton } from "../../AppForm/FormComponents";
import ResumeAPI from "../../../service/appApi";

const SkillForm = () => {
  const {
    state: appState,
    dispatch: appDispatch,
    activeSection,
    resumeProfile,
  } = useContext(AppContext) as AppContextStateType;
  const { dispatch: apiDispatch } = useContext(ApiContext);

  const skills = appState["skills"];
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.currentTarget;
  //   console.log(name, value)
  //   dispatch({type:"SKILLS", data: {name:name, value:value}});
  // }

  const handleTextArea = (content: string) => {
    appDispatch({
      type: "SKILLS",
      data: { name: "summary", value: content },
    });
  };

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = appState.skills;
    let response;
    try {
      if (data._id) {
        response = await ResumeAPI.update(
          `resume/skill/${data._id}`,
          data,
          apiDispatch
        );
      } else {
        response = await ResumeAPI.create(
          `resume/skill/${resumeProfile}`,
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
            value={skills.summary}
            handleTextArea={handleTextArea}
          />
          <FormButton label="Save" id="saveSkill" handleClick={handleSave} />
          {/* <FormTextArea type="text" label="Responsibility" id="responsibilities" defaultValue={skills} handleInputChange={ handleInputChange } /> */}
        </form>
      </div>
    </ErrorBoundary>
  );
};

export default SkillForm;

// const formFields: FormFieldProps["formFields"]  = [
//   { label: "Name", type: "text-area", name: "skills", id: "skills", value:skills },
// ];

// const formAction: FormFieldProps["formAction"] = [
//   {label:"Add", name:"addSkill" , id:"addSkill"},
//   {label:"Save", name:"saveSkill" , id:"saveSkill"},
// ]
