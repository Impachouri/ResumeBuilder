import React from "react";
import { IconType } from "react-icons";

interface ResumeSectionHeaderProps {
  sectionId: string;
  sectionName: string;
  isActiveSession: boolean;
  toggleActiveSection: () => void;
  handleDrag: (ev: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (ev: React.DragEvent<HTMLDivElement>) => void;
  Icon: IconType;
}

const ResumeSectionHeader: React.FC<ResumeSectionHeaderProps> = ({
  sectionId,
  sectionName,
  isActiveSession,
  toggleActiveSection,
  handleDrag,
  handleDrop,
  Icon
}) => {

  return (
      <button onClick={toggleActiveSection}>
        <div
          draggable={true}
          id={sectionId}
          onDragOver={(ev) => ev.preventDefault()}
          onDragStart={handleDrag}
          onDrop={handleDrop}
          className={`w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group resume-section  ${ isActiveSession ? 'bg-violet-600' : 'bg-white'}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-x-[-99%] group-hover:translate-x-[0%] transition-transform duration-300 `} />
          <Icon className={`absolute z-10 -top-5 -right-5 text-7xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300 ${isActiveSession && 'rotate-12 text-violet-400'}`} />
          <Icon className={`mb-2 text-2xl group-hover:text-white transition-colors relative z-10 duration-300 ${isActiveSession ? 'text-white' : 'text-violet-600'}`} />
          <h3 className={`font-medium text-lg  group-hover:text-white relative z-10 duration-300 ${isActiveSession ? 'text-white' : 'text-slate-950' }`}>
            {sectionName}
          </h3>
        </div>
      </button>
  );
};

export default ResumeSectionHeader;


