import * as Yup from "yup";

type FormValuesTypes = {
  email: string;
  password: string;
};

const formValidationSchema: Yup.ObjectSchema<FormValuesTypes> = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(2, "Too Short!"),
});

const initialValue: FormValuesTypes = {
  email: "",
  password: "",
};

export { initialValue, formValidationSchema };
