import { useState } from "react";
import notification from "../utils/notification";
import getAiResponse from "../service/aiAssistantApi";

interface AiResponse {
  response: string;
  loading: boolean;
}

const useAiAssistant = () => {
  const [aiState, setAiState] = useState<AiResponse>({
    response: "",
    loading: false,
  });
  const notify = notification();

  const fetchResponse = async (input: string) => {
    setAiState((prev) => ({ ...prev, loading: true }));

    try {
      const res = await getAiResponse(input);
      setAiState({ response: res, loading: false });
      return res;
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message, "ERROR");
        setAiState({ response: "", loading: false });
      } else {
        notify("An unknown error occurred", "ERROR");
        setAiState({ response: "", loading: false });
        console.error(error);
      }
      return "Something went wrong!!";
    }
  };

  return { aiState, fetchResponse };
};

export default useAiAssistant;
