import { ErrorBoundary } from "react-error-boundary";
import { useContext, useState } from "react";
import { AppContext, ExperienceType } from "../../../context/appContext";
import {
  FormButton,
  FormChecked,
  FormInput,
} from "../../AppForm/FormComponents";
import { MdCancel } from "react-icons/md";
import TextEditor from "../../TextEditor/TextEditor";
import { v4 as uuidv4 } from "uuid";
import { saveExperience, updateExperience } from "../../../service/appApi";
import { ApiContext } from "../../../context/apiContext";
import {
  FETCH_ERROR,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "../../../context/constant";
import notification from "../../../utils/notification";

const ExperienceForm = () => {
  const {
    state: appState,
    dispatch: appDispatch,
    activeSection,
    resumeProfile,
  } = useContext(AppContext);
  const { dispatch: apiDispatch } = useContext(ApiContext);
  const [activeExperience, setActiveExperience] = useState(0);
  const [endDateDisabled, setEndDateDisabled] = useState(false);
  const experiences = appState.experience;
  const notify = notification();

  const handleEndDateDisable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setEndDateDisabled(checked);
    const name = "end_date";
    const value = "Present";
    appDispatch({
      type: "EXPERIENCE",
      data: { name: name, value: value, index: activeExperience },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    appDispatch({
      type: "EXPERIENCE",
      data: { name: name, value: value, index: activeExperience },
    });
  };

  const handleTextArea = (content: string) => {
    const name = "responsibilities";
    const value = content;

    appDispatch({
      type: "EXPERIENCE",
      data: { name: name, value: value, index: activeExperience },
    });
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    appDispatch({ type: "ADD_EXPERIENCE" });
  };

  const handleRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    appDispatch({ type: "REMOVE_EXPERIENCE", data: { index: index } });
  };

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    apiDispatch({ type: FETCH_REQUEST });
    try {
      const data = appState.experience[activeExperience];
      let response;
      if (data._id) {
        response = await updateExperience(data, data._id);
      } else {
        response = await saveExperience(data, resumeProfile);
        appDispatch({
          type: "EXPERIENCE",
          data: {
            name: "_id",
            value: response.data._id as string,
            index: activeExperience,
          },
        });
      }
      apiDispatch({ type: FETCH_SUCCESS, payload: response.data });
      console.log("Success", response);
      notify(response.message, "SUCCESS");
    } catch (error) {
      console.log("error ", error);
    }
  };

  // useEffect(() => setActiveExperience(experiences.length - 1), [experiences]);

  return (
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-6 mb-6">
          <h2 className="uppercase text-3xl font-bold">{activeSection}</h2>
          <div className="flex flex-wrap gap-1 justify-center">
            {experiences.map((_: ExperienceType, index: number) => (
              <div
                key={uuidv4()}
                className={`flex item-center gap-2 border-1 rounded-lg border-solid p-2  ${
                  activeExperience === index &&
                  "bg-secondary text-white font-medium"
                }`}
              >
                <button
                  className="bg-none boder-0 cursor-pointer"
                  onClick={() => setActiveExperience(index)}
                >
                  Experience {index + 1}
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
        {experiences[activeExperience] && (
          <form className="flex flex-col gap-7">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 ">
              <FormInput
                type="text"
                label="Comapny"
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
            {experiences.map(
              (experience, index) =>
                activeExperience === index && (
                  <TextEditor
                    key={index}
                    label="Description"
                    id="description"
                    value={experience["responsibilities"]}
                    handleTextArea={handleTextArea}
                  />
                )
            )}
            <div className="flex flex-row justify-end">
              <FormButton
                label="Add"
                id="addExperience"
                handleClick={handleAdd}
              />
              <FormButton
                label="Save"
                id="saveExperience"
                handleClick={handleSave}
              />
            </div>
          </form>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ExperienceForm;

// const formFields: FormFieldProps["formFields"]  = [
//   { label: "Company", type: "text", name: "company", id: "company", value: experience[0]['company'] },
//   { label: "Date", type: "month", name: "date", id: "date", value: experience[0]['date'] },
//   { label: "Position", type: "text", name: "position", id: "position", value: experience[0]['position'] },
//   { label: "Responsibility", type: "text-area", name: "responsibilities", id: "responsibilities", value: experience[0]['responsibilities'] },
// ];

// const formAction: FormFieldProps["formAction"] = [
//   {label:"Add", name:"addExperience" , id:"addExperience"},
//   {label:"Save", name:"saveExperience" , id:"saveExperience"},
// ]
// <SectionFormTemplate formFields={formFields} formAction={formAction} formHandle={formHandle}/>
