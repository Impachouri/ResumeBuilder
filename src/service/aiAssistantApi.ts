const API_KEY = import.meta.env.VITE_COHERE_API_KEY;
// import OpenAI from "openai";
import { CohereClientV2 } from "cohere-ai";

const systemPrompt = `
You are a professional resume expert and ATS specialist.
Your job is to enhance specific sections of a resume — like work experience, education, or project descriptions.
Make the language more impactful, concise, and tailored for recruiters and ATS systems.
Use action verbs, quantify results where applicable, and optimize for relevant keywords.
Always return only the improved section, without any extra explanation.
`;

// Helper to build user prompt
const buildPrompt = (
  section: string,
  userInstruction?: string,
  jobTitle?: string,
  jobDescription?: string
) => {
  let basePrompt = `Here is a section from my resume:\n\n"${section}"\n\nPlease improve this section to make it more impactful, concise, and optimized for ATS systems.`;

  if (jobTitle) {
    basePrompt += `\n\nI am applying for the role of "${jobTitle}".`;
  }

  if (jobDescription) {
    basePrompt += `\n\nHere is the job description for the role:\n"${jobDescription}"`;
  }

  if (userInstruction) {
    basePrompt += `\n\nAdditional instruction: ${userInstruction}`;
  }

  return basePrompt;
};

// Main function to call OpenAI
const getAiResponse = async (
  section: string,
  userInstruction?: string,
  jobTitle?: string,
  jobDescription?: string
): Promise<string> => {
  try {
    const cohere = new CohereClientV2({
      token: API_KEY,
    });
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: buildPrompt(
            section,
            userInstruction,
            jobTitle,
            jobDescription
          ),
        },
      ],
    });

    console.log(response);
    return response.message.content?.[0].text ?? "No response from assistant.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Something went wrong while enhancing the resume section.";
  }
};

export default getAiResponse;
