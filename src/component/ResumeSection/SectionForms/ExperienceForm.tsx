import { useContext, useEffect, useState } from "react";
import { AppContext, AppContextStateType } from "../../../context/appContext";
import {
  FormButton,
  FormChecked,
  FormInput,
} from "../../AppForm/FormComponents";
import { MdCancel } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import TextEditor from "../../TextEditor/TextEditor";
import { v4 as uuidv4 } from "uuid";
import Modal from "../../Modal/Modal";
import { FaWandMagicSparkles } from "react-icons/fa6";
import AiAssistant from "../../ai/AiAssistant";

const ExperienceForm = () => {
  const {
    state: appState,
    dispatch,
    // activeSection,
  } = useContext(AppContext) as AppContextStateType;
  const experiences = appState["experience"];
  const tips = [
    "Use reverse-chronological order.",
    "Include measurable achievements.",
    "Use action verbs.",
    "Example: List your most recent job at the top.",
    "Example: 'Increased system efficiency by 30% through optimization.'",
    "Example: 'Managed a team of 5 developers' or 'Implemented CI/CD pipelines.'",
  ];
  const [activeExperience, setActiveExperience] = useState(0);
  const [endDateDisabled, setEndDateDisabled] = useState(false);
  const handleEndDateDisable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setEndDateDisabled(checked);
    const name = "end_date";
    const value = "Present";
    dispatch({
      type: "EXPERIENCE",
      data: { name: name, value: value, index: activeExperience },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    dispatch({
      type: "EXPERIENCE",
      data: { name: name, value: value, index: activeExperience },
    });
  };

  const handleTextArea = (content: string) => {
    const name = "responsibilities";
    const value = content;

    dispatch({
      type: "EXPERIENCE",
      data: { name: name, value: value, index: activeExperience },
    });
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch({ type: "ADD_EXPERIENCE" });
  };

  const handleRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    dispatch({ type: "REMOVE_EXPERIENCE", data: { index: index } });
  };

  useEffect(() => setActiveExperience(experiences.length - 1), [experiences]);

  return (
    <div className="flex flex-col overflow-auto h-full p-1">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-5xl font-extrabold py-2 text-gray-800">
          Tell us about your most recent job — we’ll work backward.
        </h1>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium py-2 text-gray-600">
            What roles have shaped your career?
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

        {/* Experience List */}
        <div className="flex flex-wrap gap-1">
          {experiences.map((_, index: number) => (
            <div
              key={uuidv4()}
              className={`flex items-center gap-2 border rounded-lg border-solid p-2 ${
                activeExperience === index &&
                "bg-secondary text-white font-medium"
              }`}
            >
              <button
                className="bg-none border-0 cursor-pointer text-xl font-semibold"
                onClick={() => setActiveExperience(index)}
              >
                Experience {index + 1}
              </button>
              <button
                className="bg-none border-0 cursor-pointer"
                onClick={(e) => handleRemove(e, index)}
              >
                <MdCancel />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Active Experience Form */}
      {experiences[activeExperience] && (
        <form className="flex flex-col">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <FormInput
              type="text"
              label="Company"
              id="company"
              defaultValue={experiences[activeExperience]["company"]}
              handleInputChange={handleInputChange}
            />
            <FormInput
              type="text"
              label="Position"
              id="position"
              defaultValue={experiences[activeExperience]["position"]}
              handleInputChange={handleInputChange}
            />
            <FormInput
              type="month"
              label="Start Date"
              id="start_date"
              defaultValue={experiences[activeExperience]["start_date"]}
              handleInputChange={handleInputChange}
            />
            <FormInput
              type="month"
              label="End Date"
              id="end_date"
              endDateDisabled={endDateDisabled}
              defaultValue={experiences[activeExperience]["end_date"]}
              handleInputChange={handleInputChange}
            />
          </div>

          <FormChecked
            label="I currently work here"
            id="currently_work"
            handleEndDateDisable={handleEndDateDisable}
          />
          <div className="relative flex ">
            <div className="relative">
              <TextEditor
                label="Description"
                id="description"
                value={experiences[activeExperience]["responsibilities"]}
                handleTextArea={handleTextArea}
              />
            </div>
            <Modal
              tipMessage="Let AI assist you!"
              className="absolute left-36 items-center"
              label="AI-Assistant"
              icon={
                <FaWandMagicSparkles className="text-purple-700 text-3xl" />
              }
            >
              {(closeModal) => (
                <AiAssistant
                  input={experiences[activeExperience]["responsibilities"]}
                  handleTextArea={(content) => {
                    handleTextArea(content);
                    closeModal();
                  }}
                />
              )}
            </Modal>
          </div>
          <FormButton label="Add" id="addExperience" handleClick={handleAdd} />
        </form>
      )}
    </div>
  );
};

export default ExperienceForm;
