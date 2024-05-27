import PersonalInfoForm from "./SectionForms/PersonalInfoForm";
import ExperienceForm from "./SectionForms/EperienceForm";
import ProjectForm from "./SectionForms/ProjectForm";
import SkillForm from "./SectionForms/SkillForm";
import AchievementForm from "./SectionForms/AchievementForm";
import EducationForm from "./SectionForms/EductionForm";
import { useContext } from "react";
import {
  SectionContext,
  SectionDataContext,
} from "../../context/appContext/AppContext";

const RenderSectionForm = () => {
  const { activeSection } = useContext(SectionDataContext) as SectionContext;

  const renderFormComponent = (sectionId: string) => {
    switch (sectionId) {
      case "personalInfo":
        return <PersonalInfoForm />;
      case "experience":
        return <ExperienceForm />;
      case "projects":
        return <ProjectForm />;
      case "education":
        return <EducationForm />;
      case "skills":
        return <SkillForm />;
      case "achievements":
        return <AchievementForm />;
      default:
        return null;
    }
  };

  return (
    <>
      {activeSection ? (
        <div className="section-form-component">
          <div className="section-heading"></div>
          {renderFormComponent(activeSection)}
        </div>
      ) : null}
    </>
  );
};

export default RenderSectionForm;
