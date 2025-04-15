import { useContext, useEffect, useState } from "react";
import { AppContext, AppContextStateType } from "../../../context/appContext";
import {
  FormInput,
  FormButton,
  FormChecked,
} from "../../AppForm/FormComponents";
import { MdCancel } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import Modal from "../../Modal/Modal";
import { FaRegLightbulb } from "react-icons/fa";

const EducationForm = () => {
  const {
    state: apiState,
    dispatch,
    // activeSection,
  } = useContext(AppContext) as AppContextStateType;
  const educations = apiState["education"];
  const [activeEducation, setActiveEducation] = useState(0);
  const [endDateDisabled, setEndDateDisabled] = useState(false);
  const tips = [
    "List your highest degree first.",
    "Add relevant coursework if applicable.",
    "Example: 'Master of Science in Computer Science, XYZ University.'",
    "Example: 'Relevant Coursework: Machine Learning, Data Structures.'",
  ];

  const handleEndDateDisable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setEndDateDisabled(checked);
    dispatch({
      type: "EDUCATION",
      data: { name: "end_date", value: "Present", index: activeEducation },
    });
    dispatch({
      type: "EDUCATION",
      data: { name: "grade", value: "", index: activeEducation },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    dispatch({
      type: "EDUCATION",
      data: { name: name, value: value, index: activeEducation },
    });
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch({ type: "ADD_EDUCATION" });
  };

  const handleRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    dispatch({ type: "REMOVE_EDUCATION", data: { index: index } });
  };

  useEffect(() => setActiveEducation(educations.length - 1), [educations]);

  return (
    <div className="flex flex-col overflow-auto h-full p-1">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-5xl font-extrabold py-2 text-gray-800">
          Where did you learn the skills you have today?
        </h1>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium py-2 text-gray-600">
            Let’s add your educational journey.
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
          {educations.map((_, index: number) => (
            <div
              key={uuidv4()}
              className={`flex item-center gap-2 border-1 rounded-lg border-solid p-2 ${
                activeEducation === index &&
                "bg-secondary text-white font-medium"
              }`}
            >
              <button
                className="bg-none boder-0 cursor-pointer"
                onClick={() => setActiveEducation(index)}
              >
                Education {index + 1}
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
      {educations[activeEducation] && (
        <form className="flex flex-col gap-7">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 ">
            <FormInput
              type="text"
              label="Institute"
              id="institution"
              defaultValue={educations[activeEducation]["institution"]}
              handleInputChange={handleInputChange}
            />
            <FormInput
              type="text"
              label="Degree"
              id="degree"
              defaultValue={educations[activeEducation]["degree"]}
              handleInputChange={handleInputChange}
            />
            <FormInput
              type="month"
              label="Start"
              id="start_date"
              defaultValue={educations[activeEducation]["start_date"]}
              handleInputChange={handleInputChange}
            />
            <FormInput
              type="month"
              label="End"
              id="end_date"
              endDateDisabled={endDateDisabled}
              defaultValue={educations[activeEducation]["end_date"]}
              handleInputChange={handleInputChange}
            />
            <FormInput
              type="text"
              label="Grade"
              id="grade"
              endDateDisabled={endDateDisabled}
              defaultValue={educations[activeEducation]["grade"]}
              handleInputChange={handleInputChange}
            />
          </div>
          <FormChecked
            label="I currently study here"
            id="currently_study"
            handleEndDateDisable={handleEndDateDisable}
          />
          <FormButton label="Add" id="addEducation" handleClick={handleAdd} />
        </form>
      )}
    </div>
  );
};

export default EducationForm;
