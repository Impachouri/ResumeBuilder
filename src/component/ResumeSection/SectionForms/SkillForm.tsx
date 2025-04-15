import { useContext } from "react";
import { AppContext, AppContextStateType } from "../../../context/appContext";
import TextEditor from "../../TextEditor/TextEditor";
import Modal from "../../Modal/Modal";
import { FaRegLightbulb } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import AiAssistant from "../../ai/AiAssistant";

const SkillForm = () => {
  const {
    state: apiState,
    dispatch,
    // activeSection,
  } = useContext(AppContext) as AppContextStateType;
  const skills = apiState["skills"];
  const tips = [
    "Focus on job-relevant skills.",
    "Group similar skills together.",
    "Example: 'Frontend: React, Redux | Backend: Node.js, Django.'",
    "Example: 'Programming Languages: JavaScript, Python, Go.'",
  ];
  const handleTextArea = (content: string) => {
    dispatch({
      type: "SKILLS",
      data: { name: "responsibilities", value: content },
    });
  };

  return (
    <div className="flex flex-col overflow-auto h-full p-1">
      <div className="flex flex-col  flex-wrap gap-6 mb-6">
        <h1 className="text-5xl font-extrabold py-2 text-gray-800">
          What tools & technologies do you excel at?
        </h1>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium py-2 text-gray-600">
            Let’s add the skills that power your work.
          </h3>{" "}
          <Modal
            tipMessage="Tips to optimize the resume"
            label={"Tips"}
            icon={<FaRegLightbulb className="text-3xl cursor-pointer" />}
          >
            <ul className="list-disc pl-5 space-y-2">
              {tips.map((tip, index) => (
                <li key={index} className="leading-relaxed">
                  {tip}
                </li>
              ))}
            </ul>
          </Modal>
        </div>
      </div>
      <form className="flex flex-col gap-7">
        <div className="relative flex ">
          <TextEditor
            label="Description"
            id="responsibilities"
            value={skills}
            handleTextArea={handleTextArea}
          />
          <Modal
            tipMessage="Let AI assist you!"
            className="absolute left-36 items-center"
            label="AI-Assistant"
            icon={<FaWandMagicSparkles className="text-purple-700 text-3xl" />}
          >
            <AiAssistant input={skills} />
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default SkillForm;
