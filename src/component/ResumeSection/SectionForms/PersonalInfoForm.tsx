import { useContext } from "react";
import { AppContext, AppContextStateType } from "../../../context/appContext";
import {
  FormButton,
  FormInput,
  FormTextArea,
} from "../../AppForm/FormComponents";
import FormLink from "../../AppForm/FormLink";
import { ErrorBoundary } from "react-error-boundary";
import { ApiContext } from "../../../context/apiContext";
import notification from "../../../utils/notification";
import {
  FETCH_ERROR,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "../../../context/constant";
import { savePersonalInfo, updatePersonalInfo } from "../../../service/appApi";

const PersonalInfoForm = () => {
  const {
    state: appState,
    dispatch: appDispatch,
    activeSection,
    resumeProfile,
  } = useContext(AppContext) as AppContextStateType;
  const { dispatch: apiDispatch } = useContext(ApiContext);

  const personalInfo = appState["personalInfo"];
  const notify = notification();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    appDispatch({ type: "PERSONAL_INFO", data: { name: name, value: value } });
  };

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    apiDispatch({ type: FETCH_REQUEST });
    try {
      const data = appState.personalInfo;
      let response;
      if (data._id) {
        response = await updatePersonalInfo(data, data._id);
      } else {
        response = await savePersonalInfo(data, resumeProfile);
        appDispatch({
          type: "PERSONAL_INFO",
          data: { name: "_id", value: response.data._id },
        });
      }

      apiDispatch({ type: FETCH_SUCCESS, payload: response.data });
      console.log("Success", response);
      notify(response.message, "SUCCESS");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      apiDispatch({ type: FETCH_ERROR, payload: errorMessage });
      console.log("Error");
      notify(errorMessage, "ERROR");
    }
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
          <FormButton
            label="Save"
            id="savePersonalInfo"
            handleClick={handleSave}
          />
        </form>
      </div>
    </ErrorBoundary>
  );
};

export default PersonalInfoForm;
