import React, {useContext, useRef, useState} from 'react';
import  ResumeTemplate  from './component/ResumeTemplate/ResumeTemplate';
import ResumeSectionHeader from './component/ResumeSection/ResumeSectionHeader';
import { PersonalInfo, Achievements, Education, Experience, Projects, TechnicalSkills } from './component/ResumeTemplate/ResumeSections';
import RenderSectionForm from './component/ResumeSection/RenderSectionForm';
import { SectionContext, SectionDataContext } from './SectionData/Context';
import PdfGenerator from './component/PdfGenerator/PdfGenerator';
import { IconType } from "react-icons";
import { FaBriefcase, FaCode, FaUser, FaGraduationCap } from "react-icons/fa";
import { GrAchievement } from "react-icons/gr";
import { MdOutlineMilitaryTech } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import './App.css';

export interface ResumeSectionData {
  id: string;
  title: string;
  component: React.ReactNode;
  order: number;
  Icon: IconType;
}

const Resume: React.FC = () => {

  const resumeRef = useRef(null);
  const [dragId, setDragId] = useState <string | undefined> ();
  const [fontFamily, setFontFamily] = useState<string>('font-sans');
  const [color, setColor] = useState<string>('#000000');
  const {activeSection, setActiveSection} = useContext(SectionDataContext) as SectionContext;

  
  const [sections, setSections] = useState<ResumeSectionData[]>([
    { id: 'personalInfo', title: 'Personal Info', order:1, component: <PersonalInfo />, Icon: FaUser },
    { id: 'experience', title: 'Experience', order:2, component: <Experience />, Icon: FaBriefcase },
    { id: 'projects', title: 'Projects', order:3, component: <Projects />, Icon: FaCode },
    { id: 'education', title: 'Education', order:4, component: <Education />, Icon: FaGraduationCap },
    { id: 'skills', title: 'Technical Skills', order:5, component: <TechnicalSkills />, Icon: MdOutlineMilitaryTech },
    { id: 'achievements', title: 'Achievements', order:6, component: <Achievements />, Icon: GrAchievement },
  ]);

  const fontFamilyOption:string[] = [ 'font-sans', 'font-serif', 'font-mono' ];
  const colorOptions = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#2563EB'];

  const handleActiveSession = (sectionId: string) => {
    setActiveSection((prevActiveSection) =>
        prevActiveSection === sectionId ? "" : sectionId
    )
  }

  const handleDrag = (ev:any) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev: any) => {
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

  return (
    <div className="text-black flex mt-[85px]">
      <div className="flex flex-col w-[50%] border-solid border-r-2 p-5 gap-5">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {sections
            .sort((a,b) => a.order - b.order)
            .map((section) =>(
                <ResumeSectionHeader
                    key={uuidv4()}
                    sectionId={section.id}
                    sectionName={section.title}
                    handleDrag={handleDrag} 
                    handleDrop={handleDrop} 
                    isActiveSession={activeSection === section.id}
                    toggleActiveSection={() => handleActiveSession(section.id)}
                    Icon = {section.Icon}
                    />
            ))}
          </div>
          <div className="flex flex-wrap gap-9 text-xl place-items-center">
            <div className="flex gap-5">
              <label htmlFor="font-family" className="font-semibold">Font family</label>
              <select 
                name="font-family" 
                id="font-family"
                className="rounded-md focus:outline-none focus:ring p-1"
                onChange={(e)=> setFontFamily(e.target.value)}
              >
                {fontFamilyOption.map((font)=>
                  <option key={font} value={font}>{font}</option>
                )}
              </select>
            </div>
            <div className="flex gap-5 font-semibold place-items-center">
              <label htmlFor="color">Colors</label>
              <div className="flex gap-2 place-items-center">
                {colorOptions.map((optionColor, index) => (
                  <button
                    key={index}
                    className={`rounded-full border-2  ${
                      color === optionColor ? 'w-9 h-9' : 'w-7 h-7'
                    }`}
                    style={{ backgroundColor: optionColor }}
                    onClick={() => setColor(optionColor)}
                  />
                ))}
              </div>
            </div>
          </div>
          <RenderSectionForm />
      </div>
      <div style={{perspective:2000}} ref={resumeRef} className={`flex-1 items-center justify-center bg-white rounded-2xl p-9 ${fontFamily} text-[${color}]`} >
        <ResumeTemplate sections={sections} />
      </div>
      <PdfGenerator resumeRef={resumeRef}/>
    </div>
  );
};

export default Resume;