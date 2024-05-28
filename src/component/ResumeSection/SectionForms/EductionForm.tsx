import { ErrorBoundary } from "react-error-boundary";
import { useContext, useEffect, useState } from "react";
import {
  SectionContext,
  SectionDataContext,
} from "../../../context/appContext/AppContext";
import {
  FormInput,
  FormButton,
  FormChecked,
} from "../../AppForm/FormComponents";
import { MdCancel } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const EducationForm = () => {
  const { sectionState, dispatch, activeSection } = useContext(
    SectionDataContext
  ) as SectionContext;
  const educations = sectionState["education"];
  const [activeEducation, setActiveEducation] = useState(0);
  const [endDateDisabled, setEndDateDisabled] = useState(false);

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
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-6 mb-6">
          <h2 className="uppercase text-3xl font-bold">{activeSection}</h2>
          <div className="flex flex-wrap gap-1 justify-center">
            {educations.map((_, index) => (
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
    </ErrorBoundary>
  );
};

export default EducationForm;

// const formFields: FormFieldProps["formFields"]  = [
//   { label: "Institute", type: "text", name: "institution", id: "institution", value: education[0]['institution'] },
//   { label: "Session", type: "month", name: "date", id: "date", value: education[0]['date'] },
//   { label: "Degree", type: "text", name: "degree", id: "degree", value: education[0]['degree'] },
//   { label: "Grade", type: "text", name: "grade", id: "grade", value: education[0]['grade'] },
// ];

// const formAction: FormFieldProps["formAction"] = [
//   {label:"Add", name:"addEducation" , id:"addEducation"},
//   {label:"Save", name:"saveEducation" , id:"saveEducation"},
// ]
