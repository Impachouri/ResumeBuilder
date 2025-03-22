import React, { useContext, useEffect, useRef, useState } from "react";
import ResumeTemplate from "./component/ResumeTemplate/ResumeTemplate";
import ResumeSectionHeader from "./component/ResumeSection/ResumeSectionHeader";
import {
  PersonalInfo,
  Achievements,
  Education,
  Experience,
  Projects,
  TechnicalSkills,
} from "./component/ResumeTemplate/ResumeSections";
import RenderSectionForm from "./component/ResumeSection/RenderSectionForm";
import {
  AppContext,
  AppContextStateType,
  AppStateType,
} from "./context/appContext";
import { ApiContext } from "./context/apiContext";
import PdfGenerator from "./component/PdfGenerator/PdfGenerator";
import { IconType } from "react-icons";
import { FaBriefcase, FaCode, FaUser, FaGraduationCap } from "react-icons/fa";
import { GrAchievement } from "react-icons/gr";
import { MdOutlineMilitaryTech } from "react-icons/md";
import "./App.css";
// import { fetchResume } from "./service/appApi";

export interface ResumeSectionData {
  id: keyof AppStateType;
  title: string;
  heading: string;
  subHeading: string;
  component: React.ReactNode;
  order: number;
  Icon: IconType;
}

const Resume: React.FC = () => {
  const resumeRef = useRef(null);
  const [dragId, setDragId] = useState<string | undefined>();
  const [fontFamily, setFontFamily] = useState<string>("font-sans");
  const [fontSize, setFontSize] = useState<number>(10);

  const { activeSection, setActiveSection } = useContext(
    AppContext
  ) as AppContextStateType;

  const { state } = useContext(ApiContext);

  const [sections, setSections] = useState<ResumeSectionData[]>([
    {
      id: "personalInfo",
      title: "Personal Info",
      heading: "Let's start with the basics!",
      subHeading: "Tell us who you are and how employers can reach you.",
      order: 1,
      component: <PersonalInfo />,
      Icon: FaUser,
    },
    {
      id: "experience",
      title: "Experience",
      heading: "Tell us about your most recent job!",
      subHeading: "We’ll start here and work backward.",
      order: 2,
      component: <Experience />,
      Icon: FaBriefcase,
    },
    {
      id: "projects",
      title: "Projects",
      heading: "Showcase the projects you're proud of!",
      subHeading: "Highlight work that demonstrates your skills.",
      order: 3,
      component: <Projects />,
      Icon: FaCode,
    },
    {
      id: "education",
      title: "Education",
      heading: "Where did you learn your skills?",
      subHeading: "List your degrees, certifications, or relevant courses.",
      order: 4,
      component: <Education />,
      Icon: FaGraduationCap,
    },
    {
      id: "skills",
      title: "Skills",
      heading: "What tools & technologies do you excel at?",
      subHeading:
        "List programming languages, frameworks, and software expertise.",
      order: 5,
      component: <TechnicalSkills />,
      Icon: MdOutlineMilitaryTech,
    },
    {
      id: "achievements",
      title: "Achievements",
      heading: "Show off your proudest moments!",
      subHeading: "Highlight awards, recognitions, or key milestones.",
      order: 6,
      component: <Achievements />,
      Icon: GrAchievement,
    },
  ]);

  // const fontFamilyOption: string[] = ["font-sans", "font-serif", "font-mono"];
  // const fontOption = ["10", "12", "14", "16"];

  const handleActiveSession = (sectionId: keyof AppStateType) => {
    setActiveSection((prevActiveSection: keyof AppStateType) => {
      return prevActiveSection === sectionId ? prevActiveSection : sectionId;
    });
  };

  const handleDrag = (ev: React.DragEvent<HTMLDivElement>) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    const dragSection: ResumeSectionData | undefined = sections.find(
      (section) => section.id === dragId
    );
    const dropSection: ResumeSectionData | undefined = sections.find(
      (section) => section.id === ev.currentTarget.id
    );

    if (dragSection && dropSection) {
      const dragSectionOrder = dragSection.order;
      const dropSectionOrder = dropSection.order;

      const newSectionState = sections.map((section) => {
        if (section.id === dragId) {
          section.order = dropSectionOrder;
        }
        if (section.id === ev.currentTarget.id) {
          section.order = dragSectionOrder;
        }
        return section;
      });
      setSections(newSectionState);
    }
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="grid grid-cols-6 gap-4 text-black  m-5 ">
      {/* Section Header */}
      <div className="col-span-1 border-solid border-r-2 p-5  flex flex-col gap-5">
        <div className="text-4xl font-extrabold pb-10 self-center  text-black">
          Resume
        </div>
        <div className="flex flex-col gap-4   lg:grid-cols-4">
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section, index) => (
              <ResumeSectionHeader
                key={index}
                sectionId={section.id}
                sectionName={section.title}
                handleDrag={handleDrag}
                handleDrop={handleDrop}
                isActiveSession={activeSection === section.id}
                toggleActiveSection={() => handleActiveSession(section.id)}
                Icon={section.Icon}
              />
            ))}
        </div>
      </div>

      {/* Section Form */}
      <div className="col-span-3 m-10">
        <RenderSectionForm />
      </div>

      {/* preview */}
      <div className="col-span-2 flex justify-end items-center h-screen">
        <div
          ref={resumeRef}
          className={`bg-white rounded-2xl p-5 shadow-lg overflow-auto max-h-[90vh] w-full max-w-[400px] ${fontFamily} text-[5px]`}
          style={{ perspective: 2000 }}
        >
          <ResumeTemplate sections={sections} />
        </div>
      </div>
      <PdfGenerator resumeRef={resumeRef} />
    </div>
  );
};

export default Resume;
