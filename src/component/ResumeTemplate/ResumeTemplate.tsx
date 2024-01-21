import React from 'react';
import { ResumeSectionData } from '../../Resume';
import { useMotionValue, useTransform, motion, useSpring } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
   

interface ResumeTemplateProps {
  sections:ResumeSectionData[];
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({sections}) => {

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["27.5deg", "-27.5deg"]
  );

  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-27.5deg", "27.5deg"]
  );

  const handleMouseMove = (e: any) => {
    const rect = e.target.getBoundingClientRect();

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
        // rotateY,
        // rotateX,
        transformStyle: "preserve-3d",
      }}
      // className="w-full p-5 border-2 rounded-2xl border-black"
      >
      {sections.map((section: ResumeSectionData) => (
        <div key={uuidv4()}>
          {section.component}
        </div>
      ))}
    </div>
  );
};

export default ResumeTemplate;