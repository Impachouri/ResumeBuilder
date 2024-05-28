import * as Yup from "yup";

type FormValuesTypes = {
  fName: string;
  lName: string;
  email: string;
  password: string;
};

const formValidationSchema: Yup.ObjectSchema<FormValuesTypes> = Yup.object({
  fName: Yup.string().required("Required"),
  lName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(2, "Too Short!"),
});

const initialValue: FormValuesTypes = {
  fName: "",
  lName: "",
  email: "",
  password: "",
};

export { initialValue, formValidationSchema };
