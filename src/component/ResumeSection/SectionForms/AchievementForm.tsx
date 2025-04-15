import { useContext } from "react";
import { AppContext, AppContextStateType } from "../../../context/appContext";
import TextEditor from "../../TextEditor/TextEditor";
import Modal from "../../Modal/Modal";
import { FaRegLightbulb } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import AiAssistant from "../../ai/AiAssistant";

const AchievementForm = () => {
  const {
    state: appState,
    dispatch,
    // activeSection,
  } = useContext(AppContext) as AppContextStateType;
  const achievements = appState["achievements"];

  const tips = [
    "Highlight awards, certifications, and recognitions.",
    "Include the date and organization.",
    "Example: 'Certified Kubernetes Administrator, Linux Foundation.'",
    "Example: 'AWS Certified Solutions Architect, Amazon Web Services, 2024.'",
  ];
  const handleTextArea = (content: string) => {
    dispatch({
      type: "ACHIEVEMENTS",
      data: { name: "achievements", value: content },
    });
  };

  return (
    <div className="flex flex-col overflow-auto h-full p-1">
      <div className="flex flex-col flex-wrap gap-6 mb-6">
        <h1 className="text-5xl font-extrabold py-2 text-gray-800">
          Show off your proudest moments!
        </h1>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium py-2 text-gray-600">
            What accomplishments make you stand out?
          </h3>
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
            id="achievements"
            value={achievements}
            handleTextArea={handleTextArea}
          />
          <Modal
            tipMessage="Let AI assist you!"
            className="absolute left-36 items-center"
            label="AI-Assistant"
            icon={<FaWandMagicSparkles className="text-purple-700 text-3xl" />}
          >
            <AiAssistant input={achievements} />
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default AchievementForm;
