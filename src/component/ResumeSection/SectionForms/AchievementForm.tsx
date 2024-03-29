import { useContext } from "react";
import { SectionContext, SectionDataContext } from "../../../SectionData/Context";
import { FormTextArea } from "../../Forms/FormComponents";
import { ErrorBoundary } from "react-error-boundary";

const AchievementForm = () => {
  const { sectionState, dispatch, activeSection } = useContext(SectionDataContext) as SectionContext;
  const achievements = sectionState['achievements'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    dispatch({type:"ACHIEVEMENTS", data: {name:name, value:value}});
  }
  
  return (
  <ErrorBoundary
    fallback={<p>There was an error while submitting the form</p>}
  >
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-6 mb-6">
        <h2 className="uppercase text-3xl font-bold">
          {activeSection}
        </h2>
      </div>
      <form className="flex flex-col gap-7">
        
      <FormTextArea type="text" label="Responsibility" id="responsibilities" defaultValue={achievements} handleInputChange={ handleInputChange } />
      </form>
    </div>
  </ErrorBoundary>
  );
}

export default AchievementForm;



  // const formFields: FormFieldProps["formFields"]  = [
  //   { label: "Achievements", type: "text-area", name: "achievements", id: "achievements", value:achievements },
  // ];

  // const formAction: FormFieldProps["formAction"] = [
  //   {label:"Save", name:"saveAchievement" , id:"saveAchievement"},
  // ]