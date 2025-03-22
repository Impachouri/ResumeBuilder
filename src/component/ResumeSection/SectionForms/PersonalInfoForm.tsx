import { useContext } from "react";
import { AppContext, AppContextStateType } from "../../../context/appContext";
import { FormInput, FormTextArea } from "../../AppForm/FormComponents";
import FormLink from "../../AppForm/FormLink";
import Modal from "../../Modal/Modal";
import { FaRegLightbulb } from "react-icons/fa";

const PersonalInfoForm = () => {
  const {
    state: appState,
    dispatch,
    activeSection,
  } = useContext(AppContext) as AppContextStateType;

  const personalInfo = appState["personalInfo"];
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    dispatch({ type: "PERSONAL_INFO", data: { name: name, value: value } });
  };
  const tips = [
    "Use a professional email address.",
    "Include your LinkedIn profile and portfolio link.",
    "Avoid personal details like marital status or religion",
    "Example: aman.pachouri@gmail.com",
    "Example: linkedin.com/in/amanpachouri, github.com/amanpachouri",
    "No need to mention: Married, Hindu, or Male/Female.",
  ];

  return (
    <div className="flex flex-col overflow-auto h-full p-1">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-5xl font-extrabold py-2 text-gray-800">
          Let's start with the basics!
        </h1>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium py-2 text-gray-600">
            Tell us about yourself. This is where your story begins.
          </h3>
          <Modal
            label="Tips"
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
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 ">
          <FormInput
            type="text"
            label="First Name"
            id="fname"
            defaultValue={personalInfo["fname"]}
            handleInputChange={handleInputChange}
          />
          <FormInput
            type="text"
            label="Last Name"
            id="lname"
            defaultValue={personalInfo["lname"]}
            handleInputChange={handleInputChange}
          />
          <FormInput
            type="text"
            label="Phone"
            id="phone"
            defaultValue={personalInfo["phone"]}
            handleInputChange={handleInputChange}
          />
          <FormInput
            type="email"
            label="Email"
            id="email"
            defaultValue={personalInfo["email"]}
            handleInputChange={handleInputChange}
          />
          <FormLink activeItem={-1} />
        </div>
        <FormTextArea
          type="text"
          label="Profile Summary"
          id="profileSummary"
          defaultValue={personalInfo["profileSummary"]}
          handleInputChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default PersonalInfoForm;
