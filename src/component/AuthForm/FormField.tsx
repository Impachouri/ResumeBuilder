import { Field, ErrorMessage } from "formik";

type FormFieldProps = {
  name: string;
  type: string;
  placeholder: string;
};

export const FormField: React.FC<FormFieldProps> = ({
  name,
  type,
  placeholder,
}) => {
  return (
    <div>
      <Field
        className="w-full px-8 py-4 rounded-lg font-medium bg-white border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-gray-50 mt-5"
        type={type}
        name={name}
        autoComplete="on"
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};
