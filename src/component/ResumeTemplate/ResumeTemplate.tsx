import React from "react";
import { ResumeSectionData } from "../../Resume";
import { useMotionValue } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

interface ResumeTemplateProps {
  sections: ResumeSectionData[];
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ sections }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {sections.map((section: ResumeSectionData) => (
        <div key={uuidv4()}>{section.component}</div>
      ))}
    </div>
  );
};

export default ResumeTemplate;
