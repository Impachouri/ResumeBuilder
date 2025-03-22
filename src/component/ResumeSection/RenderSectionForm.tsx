import { useContext } from "react";
import PersonalInfoForm from "./SectionForms/PersonalInfoForm";
import ExperienceForm from "./SectionForms/ExperienceForm";
import ProjectForm from "./SectionForms/ProjectForm";
import SkillForm from "./SectionForms/SkillForm";
import AchievementForm from "./SectionForms/AchievementForm";
import EducationForm from "./SectionForms/EductionForm";
import { AppContext, AppContextStateType } from "../../context/appContext";
import { ErrorBoundary } from "react-error-boundary";

const RenderSectionForm = () => {
  const { activeSection } = useContext(AppContext) as AppContextStateType;

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
        <ErrorBoundary
          fallback={<p>There was an error while submitting the form</p>}
        >
          <div className="flex flex-col px-6 py-8 h-[90vh] bg-white rounded-lg shadow-md">
            {renderFormComponent(activeSection)}
          </div>
        </ErrorBoundary>
      ) : null}
    </>
  );
};

export default RenderSectionForm;
