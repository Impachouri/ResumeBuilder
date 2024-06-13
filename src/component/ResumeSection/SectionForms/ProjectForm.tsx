import { ErrorBoundary } from "react-error-boundary";
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
import { ApiContext } from "../../../context/apiContext";
import ResumeAPI from "../../../service/appApi";

const ProjectForm = () => {
  const {
    state: appState,
    dispatch: appDispatch,
    activeSection,
    resumeProfile,
  } = useContext(AppContext) as AppContextStateType;
  const { dispatch: apiDispatch } = useContext(ApiContext);

  const projects = appState["projects"];
  const [activeProject, setActiveProject] = useState<number>(0);
  const [endDateDisabled, setEndDateDisabled] = useState(false);

  const handleEndDateDisable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setEndDateDisabled(checked);
    appDispatch({
      type: "PROJECTS",
      data: { name: "end_date", value: "Present", index: activeProject },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    appDispatch({
      type: "PROJECTS",
      data: { name: name, value: value, index: activeProject },
    });
  };

  const handleTextArea = (content: string) => {
    appDispatch({
      type: "PROJECTS",
      data: { name: "description", value: content, index: activeProject },
    });
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    appDispatch({ type: "ADD_PROJECT" });
  };

  const handleRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    appDispatch({ type: "REMOVE_PROJECT", data: { index: index } });
  };
  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = appState.projects[activeProject];
    let response;
    try {
      if (data._id) {
        response = await ResumeAPI.update(
          `resume/project/${data._id}`,
          data,
          apiDispatch
        );
      } else {
        response = await ResumeAPI.create(
          `resume/project/${resumeProfile}`,
          data,
          apiDispatch
        );
        appDispatch({
          type: "PROJECTS",
          data: {
            name: "_id",
            value: response.data._id,
            index: activeProject,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-6 mb-6">
          <h2 className="uppercase text-3xl font-bold">{activeSection}</h2>
          <div className="flex flex-wrap gap-1 justify-center">
            {projects.map((_, index: number) => (
              <div
                key={uuidv4()}
                className={`flex item-center gap-2 border-1 rounded-lg border-solid p-2  ${
                  activeProject === index &&
                  "bg-secondary text-white font-medium"
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
          <form className="flex flex-col gap-7">
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
              <FormLink activeItem={activeProject} />
            </div>
            <FormChecked
              label="Currently working on this project"
              id="currently_working"
              handleEndDateDisable={handleEndDateDisable}
            />
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
            <FormInput
              type="text"
              label="Technology"
              id="technologies"
              defaultValue={projects[activeProject]["technologies"]}
              handleInputChange={handleInputChange}
            />
            <div className="flex flex-row justify-end">
              <FormButton label="Add" id="addProject" handleClick={handleAdd} />
              <FormButton
                label="Save"
                id="saveProject"
                handleClick={handleSave}
              />
            </div>
          </form>
        )}
      </div>
    </ErrorBoundary>
  );
};
export default ProjectForm;

// const formFields: FormFieldProps["formFields"]  = [
//   { label: "Name", type: "text", name: "name", id: "name", value: projects[0]['name'] },
//   { label: "Date", type: "month", name: "date", id: "date", value: projects[0]['date'] },
//   { label: "Description", type: "text-area", name: "description", id: "description", value: projects[0]['description'] },
//   { label: "Technology", type: "text", name: "technologies", id: "technologies", value: projects[0]['technologies'] },
// ];

// const formAction: FormFieldProps["formAction"] = [
//   {label:"Add", name:"addProject" , id:"addProject"},
//   {label:"Save", name:"saveProject" , id:"saveProject"},
// ]
