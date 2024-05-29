import { useContext } from "react";
import { AppContext, AppContextStateType } from "../../../context/appContext";
import { FormInput, FormTextArea } from "../../AppForm/FormComponents";
import FormLink from "../../AppForm/FormLink";
import { ErrorBoundary } from "react-error-boundary";

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

  return (
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <div className="flex flex-col">
        <div className="item-center flex-wrap gap-7 mb-2">
          <h2 className="uppercase text-3xl font-bold">{activeSection}</h2>
        </div>
        <form className="mt-5 flex flex-col gap-7">
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
    </ErrorBoundary>
  );
};

export default PersonalInfoForm;
