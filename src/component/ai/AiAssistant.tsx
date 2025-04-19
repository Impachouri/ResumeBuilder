import { useEffect, useState } from "react";
import { FormButton } from "../AppForm/FormComponents";
import { CiEdit } from "react-icons/ci";
import DOMPurify from "dompurify";
import useAiAssistant from "../../hooks/useAiAssistant";
import Loading from "../../utils/Loading";

interface AiAssistantProps {
  input: string;
  handleTextArea: (content: string) => void;
}

const sanitizedHtml = (htmlString: string) => {
  const sanitizedHtmlString = DOMPurify.sanitize(htmlString);
  return sanitizedHtmlString;
};

const AiAssistant = ({ input, handleTextArea }: AiAssistantProps) => {
  const [isPrompt, setIsPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [editableInput, setEditableInput] = useState(input);
  const { aiState, fetchResponse } = useAiAssistant();

  const handleChangePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleGenerateClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const res = await fetchResponse(input);
    setEditableInput(res);
  };

  const handleAccept = () => {
    handleTextArea(editableInput);
  };
  return (
    <>
      {aiState.loading && <Loading />}
      <div className="flex flex-col gap-2 max-h-96 overflow-auto">
        <div className="flex gap-5">
          <div
            className="focus:ring-0 focus:outline-none w-full min-h-52 bg-gray-100 p-4 rounded-2xl whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: `<ul class="list-disc pl-5">${sanitizedHtml(
                editableInput
              )}</ul>`,
            }}
          />
        </div>

        {/* Prompt Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-md font-bold">Add Prompt</span>
            <button type="button" onClick={() => setIsPrompt((pre) => !pre)}>
              <CiEdit className="text-2xl " />
            </button>
          </div>
          {isPrompt && (
            <textarea
              value={prompt}
              name="aiAssist"
              id="aiAssist"
              onChange={handleChangePrompt}
              className="focus:ring-0 focus:outline-none w-full bg-gray-100 p-4 rounded-2xl"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <FormButton
            label="Generate"
            id=""
            handleClick={handleGenerateClick}
          />
          <FormButton label="Accept" id="" handleClick={handleAccept} />
        </div>
      </div>
    </>
  );
};

export default AiAssistant;
