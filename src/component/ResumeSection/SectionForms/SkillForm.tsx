// import SectionFormTemplate, { FormFieldProps } from "./SectionFormTemplate";
// import { FormTextArea } from "../../Forms/FormComponents";
import { ErrorBoundary } from "react-error-boundary";
import { useContext } from "react";
import { AppContext, AppContextStateType } from "../../../context/appContext";
import TextEditor from "../../TextEditor/TextEditor";
import { ApiContext } from "../../../context/apiContext";
import notification from "../../../utils/notification";
import {
  FETCH_ERROR,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "../../../context/constant";
import { saveSkill } from "../../../service/appApi";
import { FormButton } from "../../AppForm/FormComponents";

const SkillForm = () => {
  const {
    state: appState,
    dispatch,
    activeSection,
  } = useContext(AppContext) as AppContextStateType;
  const { dispatch: apiDispatch } = useContext(ApiContext);

  const skills = appState["skills"];
  const notify = notification();
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.currentTarget;
  //   console.log(name, value)
  //   dispatch({type:"SKILLS", data: {name:name, value:value}});
  // }

  const handleTextArea = (content: string) => {
    dispatch({
      type: "SKILLS",
      data: { name: "responsibilities", value: content },
    });
  };

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    apiDispatch({ type: FETCH_REQUEST });
    try {
      const data = appState.skills;
      const response = await saveSkill(data);
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
            id="responsibilities"
            value={skills}
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
