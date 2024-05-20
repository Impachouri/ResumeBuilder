// import SectionFormTemplate, { FormFieldProps } from "./SectionFormTemplate";
// import { FormTextArea } from "../../Forms/FormComponents";
import { ErrorBoundary } from "react-error-boundary";
import { useContext } from "react";
import {
  SectionContext,
  SectionDataContext,
} from "../../../context/AppContext";
import TextEditor from "../../TextEditor/TextEditor";

const SkillForm = () => {
  const { sectionState, dispatch, activeSection } = useContext(
    SectionDataContext
  ) as SectionContext;
  const skills = sectionState["skills"];

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
