import { ErrorBoundary } from "react-error-boundary";
import {
  FormInput,
  FormChecked,
  FormButton,
} from "../../AppForm/FormComponents";
import FormLink from "../../AppForm/FormLink";
import TextEditor from "../../TextEditor/TextEditor";

interface GenericFormSectionProps {
  title: string;
  subtitle?: string;
  items?: any[];
  activeItem?: number;
  setActiveItem?: (index: number) => void;
  handleRemove?: (e: React.MouseEvent, index: number) => void;
  inputs?: Array<{
    type: string;
    label: string;
    id: string;
    defaultValue: string;
    endDateDisabled?: boolean;
  }>;
  showTextEditor?: boolean;
  textEditorId?: string;
  textEditorValue?: string;
  handleTextArea?: (id: string, value: string) => void;
  showFormChecked?: boolean;
  formCheckedLabel?: string;
  formCheckedId?: string;
  handleEndDateDisable?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showAddButton?: boolean;
  handleAdd?: () => void;
  showFormLink?: boolean;
  formLinkActiveItem?: number;
}

const GenericFormSection: React.FC<GenericFormSectionProps> = ({
  title,
  subtitle,
  items,
  activeItem,
  setActiveItem,
  handleRemove,
  inputs,
  showTextEditor,
  textEditorId,
  textEditorValue,
  handleTextArea,
  showFormChecked,
  formCheckedLabel,
  formCheckedId,
  handleEndDateDisable,
  showAddButton,
  handleAdd,
  showFormLink,
  formLinkActiveItem,
}) => {
  return (
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <div className="flex flex-col px-6 py-8 min-h-[90vh] bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-5xl font-extrabold py-2 text-gray-800">
            {title}
          </h1>
          {subtitle && (
            <h3 className="text-2xl font-medium py-2 text-gray-600">
              {subtitle}
            </h3>
          )}

          {items && items.length > 0 && (
            <div className="flex flex-wrap gap-1 text-xl font-semibold">
              {items.map((_, index: number) => (
                <div
                  key={index}
                  className={`flex item-center gap-2 border-1 rounded-lg border-solid p-2 ${
                    activeItem === index &&
                    "bg-secondary text-white font-medium"
                  }`}
                >
                  <button
                    className="bg-none boder-0 cursor-pointer"
                    onClick={() => setActiveItem && setActiveItem(index)}
                  >
                    {title} {index + 1}
                  </button>
                  {handleRemove && (
                    <button
                      className="bg-none boder-0 cursor-pointer"
                      onClick={(e) => handleRemove(e, index)}
                    >
                      🗙
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <form className="flex flex-col gap-7">
          {/* Dynamic Inputs */}
          {inputs && inputs.length > 0 && (
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  type={input.type}
                  label={input.label}
                  id={input.id}
                  defaultValue={input.defaultValue}
                  handleInputChange={(e) => console.log(e.target.value)}
                  endDateDisabled={input.endDateDisabled}
                />
              ))}
            </div>
          )}

          {/* Form Checked */}
          {showFormChecked && (
            <FormChecked
              label={formCheckedLabel || ""}
              id={formCheckedId || ""}
              handleEndDateDisable={handleEndDateDisable}
            />
          )}

          {/* Form Links */}
          {showFormLink && <FormLink activeItem={formLinkActiveItem || -1} />}

          {/* Text Editor */}
          {showTextEditor && textEditorId && handleTextArea && (
            <TextEditor
              label="Description"
              id={textEditorId}
              value={textEditorValue || ""}
              handleTextArea={handleTextArea}
            />
          )}

          {/* Add Button */}
          {showAddButton && (
            <FormButton label="Add" id="add" handleClick={handleAdd} />
          )}
        </form>
      </div>
    </ErrorBoundary>
  );
};

export default GenericFormSection;
