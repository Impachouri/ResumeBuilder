import { useState } from "react";
import { FormButton } from "../AppForm/FormComponents";
import { CiEdit } from "react-icons/ci";
import DOMPurify from "dompurify";

interface AiAssistantProps {
  input: string;
}

const sanitizedHtml = (htmlString: string) => {
  const sanitizedHtmlString = DOMPurify.sanitize(htmlString);
  return sanitizedHtmlString;
};

const AiAssistant = ({ input }: AiAssistantProps) => {
  const [isPrompt, setIsPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleChangePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  // Convert input into bullet points
  // const formattedInput = input
  //   .split("\n")
  //   .map((line) => `<li>${line.trim()}</li>`)
  //   .join("");

  return (
    <div className="flex flex-col gap-2">
      {/* Read-only View with Bullet Points */}
      <div
        className="focus:ring-0 focus:outline-none w-full min-h-52 bg-gray-100 p-4 rounded-2xl whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: `<ul class="list-disc pl-5">${sanitizedHtml(input)}</ul>`,
        }}
      />

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
        <FormButton label="Generate" id="" />
        <FormButton label="Accept" id="" />
      </div>
    </div>
  );
};

export default AiAssistant;
