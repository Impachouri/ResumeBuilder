import { useContext, useState } from "react";
import { MdCancel } from "react-icons/md";
import { AppContext, AppContextStateType } from "../../../context/appContext";
import {
  FormInput,
  FormButton,
  FormChecked,
} from "../../AppForm/FormComponents";
import FormLink from "../../AppForm/FormLink";
import TextEditor from "../../TextEditor/TextEditor";
import { v4 as uuidv4 } from "uuid";
import Modal from "../../Modal/Modal";
import { FaRegLightbulb } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import AiAssistant from "../../ai/AiAssistant";

const ProjectForm = () => {
  const {
    state: appState,
    dispatch,
    // activeSection,
  } = useContext(AppContext) as AppContextStateType;
  const projects = appState["projects"];
  const [activeProject, setActiveProject] = useState<number>(0);
  const [endDateDisabled, setEndDateDisabled] = useState(false);
  const handleEndDateDisable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setEndDateDisabled(checked);
    dispatch({
      type: "PROJECTS",
      data: { name: "end_date", value: "Present", index: activeProject },
    });
  };
  const tips = [
    "Highlight key technologies used.",
    "Explain the problem solved and impact.",
    "Include links to live projects or GitHub.",
    "Example: 'Built a chat app using React, Node.js, and Socket.io.'",
    "Example: 'Automated report generation, reducing manual effort by 40%.''",
    "Example: 'Live: myapp.com | GitHub: github.com/amanpachouri/myapp'",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    dispatch({
      type: "PROJECTS",
      data: { name: name, value: value, index: activeProject },
    });
  };

  const handleTextArea = (content: string) => {
    dispatch({
      type: "PROJECTS",
      data: { name: "description", value: content, index: activeProject },
    });
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch({ type: "ADD_PROJECT" });
  };

  const handleRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    dispatch({ type: "REMOVE_PROJECT", data: { index: index } });
  };

  return (
    <div className="flex flex-col overflow-auto h-full p-1">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-5xl font-extrabold py-2 text-gray-800">
          Showcase the projects you're proud of!
        </h1>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium py-2 text-gray-600">
            What projects highlight your skills?
          </h3>
          <Modal
            label={"Tips"}
            tipMessage="Tips to optimize the resume"
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
        <div className="flex flex-wrap gap-1 text-xl font-semibold">
          {projects.map((_, index: number) => (
            <div
              key={uuidv4()}
              className={`flex item-center gap-2 border-1 rounded-lg border-solid p-2  ${
                activeProject === index && "bg-secondary text-white font-medium"
              }`}
            >
              <button
                className="bg-none boder-0 cursor-pointer"
                onClick={() => setActiveProject(index)}
              >
                Project {index + 1}
              </button>
              <button
                className="bg-none boder-0 cursor-pointer"
                onClick={(e) => handleRemove(e, index)}
              >
                <MdCancel />
              </button>
            </div>
          ))}
        </div>
      </div>
      {projects[activeProject] && (
        <form className="flex flex-col gap-5">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 ">
            <FormInput
              type="text"
              label="Name"
              id="name"
              defaultValue={projects[activeProject]["name"]}
              handleInputChange={handleInputChange}
            />
            <FormInput
              type="text"
              label="Live Link"
              id="liveLink"
              defaultValue={projects[activeProject]["liveLink"]}
              handleInputChange={handleInputChange}
            />
            <FormInput
              type="month"
              label="Start Date"
              id="start_date"
              defaultValue={projects[activeProject]["start_date"]}
              handleInputChange={handleInputChange}
            />
            <FormInput
              type="month"
              label="End Date"
              id="end_date"
              endDateDisabled={endDateDisabled}
              defaultValue={projects[activeProject]["end_date"]}
              handleInputChange={handleInputChange}
            />
          </div>
          <FormChecked
            label="Currently working on this project"
            id="currently_working"
            handleEndDateDisable={handleEndDateDisable}
          />
          <FormLink activeItem={activeProject} />
          <div className="relative flex ">
            {projects.map(
              (project, index: number) =>
                activeProject === index && (
                  <TextEditor
                    key={index}
                    label="Description"
                    id="description"
                    value={project["description"]}
                    handleTextArea={handleTextArea}
                  />
                )
            )}
            <Modal
              tipMessage="Let AI assist you!"
              className="absolute left-36 items-center"
              label="AI-Assistant"
              icon={
                <FaWandMagicSparkles className="text-purple-700 text-3xl" />
              }
            >
              <AiAssistant input={projects[activeProject]["description"]} />
            </Modal>
          </div>

          <FormButton label="Add" id="addProject" handleClick={handleAdd} />
        </form>
      )}
    </div>
  );
};
export default ProjectForm;
