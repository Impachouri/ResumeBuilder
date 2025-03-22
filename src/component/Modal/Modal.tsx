import { ReactElement, ReactNode, useState } from "react";
// import { FaRegLightbulb } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

interface ModalProps {
  children: ReactNode;
  className?: string;
  tipMessage: string;
  label: string;
  icon?: ReactElement;
}

const Modal = ({
  children,
  className,
  tipMessage,
  label,
  icon,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // const tips: TipsType = {
  //   personalInfo: [
  //     "Use a professional email address.",
  //     "Include your LinkedIn profile and portfolio link.",
  //     "Avoid personal details like marital status or religion",
  //     "Example: aman.pachouri@gmail.com",
  //     "Example: linkedin.com/in/amanpachouri, github.com/amanpachouri",
  //     "No need to mention: Married, Hindu, or Male/Female.",
  //   ],
  //   experience: [
  //     "Use reverse-chronological order.",
  //     "Include measurable achievements.",
  //     "Use action verbs.",
  //     "Example: List your most recent job at the top.",
  //     "Example: 'Increased system efficiency by 30% through optimization.'",
  //     "Example: 'Managed a team of 5 developers' or 'Implemented CI/CD pipelines.'",
  //   ],
  //   projects: [
  //     "Highlight key technologies used.",
  //     "Explain the problem solved and impact.",
  //     "Include links to live projects or GitHub.",
  //     "Example: 'Built a chat app using React, Node.js, and Socket.io.'",
  //     "Example: 'Automated report generation, reducing manual effort by 40%.''",
  //     "Example: 'Live: myapp.com | GitHub: github.com/amanpachouri/myapp'",
  //   ],
  //   education: [
  //     "List your highest degree first.",
  //     "Add relevant coursework if applicable.",
  //     "Example: 'Master of Science in Computer Science, XYZ University.'",
  //     "Example: 'Relevant Coursework: Machine Learning, Data Structures.'",
  //   ],
  //   skills: [
  //     "Focus on job-relevant skills.",
  //     "Group similar skills together.",
  //     "Example: 'Frontend: React, Redux | Backend: Node.js, Django.'",
  //     "Example: 'Programming Languages: JavaScript, Python, Go.'",
  //   ],
  //   achievements: [
  //     "Highlight awards, certifications, and recognitions.",
  //     "Include the date and organization.",
  //     "Example: 'Certified Kubernetes Administrator, Linux Foundation.'",
  //     "Example: 'AWS Certified Solutions Architect, Amazon Web Services, 2024.'",
  //   ],
  // };

  return (
    <div className={`${className}`}>
      <div className="relative group">
        <button type="button" onClick={openModal} aria-label="Show Tip">
          {icon ? icon : <span className="text-3xl cursor-pointer">ℹ️</span>}
        </button>
        <span className="absolute right-full text-nowrap p-2 ml-2 hidden group-hover:block bg-black text-white text-sm rounded-2xl">
          {tipMessage}
        </span>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold ">{label}</h2>
              <button type="button" onClick={closeModal} className=" text-2xl">
                <GiCancel className="" />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
