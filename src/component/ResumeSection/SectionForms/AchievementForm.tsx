import { useContext } from "react";
import { AppContext, AppContextStateType } from "../../../context/appContext";
import { ErrorBoundary } from "react-error-boundary";
import TextEditor from "../../TextEditor/TextEditor";
import { FormButton } from "../../AppForm/FormComponents";
import { ApiContext } from "../../../context/apiContext";
import notification from "../../../utils/notification";
import {
  FETCH_ERROR,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "../../../context/constant";
import { saveAchievement } from "../../../service/appApi";

const AchievementForm = () => {
  const {
    state: appState,
    dispatch,
    activeSection,
  } = useContext(AppContext) as AppContextStateType;
  const { dispatch: apiDispatch } = useContext(ApiContext);
  const notify = notification();
  const achievements = appState["achievements"];

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.currentTarget;
  //   dispatch({type:"ACHIEVEMENTS", data: {name:name, value:value}});
  // }

  const handleTextArea = (content: string) => {
    dispatch({
      type: "ACHIEVEMENTS",
      data: { name: "achievements", value: content },
    });
  };

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    apiDispatch({ type: FETCH_REQUEST });
    try {
      const data = appState.achievements;
      const response = await saveAchievement(data);
      apiDispatch({ type: FETCH_SUCCESS, payload: response.data });
      console.log("Success", response);
      notify(response.message, "SUCCESS");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      apiDispatch({ type: FETCH_ERROR, payload: errorMessage });
      console.log("Error");
      notify(errorMessage, "ERROR");
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
            id="achievements"
            value={achievements}
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
