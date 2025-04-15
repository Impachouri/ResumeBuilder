import axios from "axios";
import { useState } from "react";

interface AiResponse {
  response: string;
  error: string;
  loading: boolean;
}

const useAiAssistant = () => {
  const [aiState, setAiState] = useState<AiResponse>({
    response: "",
    error: "",
    loading: false,
  });

  const fetchResponse = async ({ input }: { input: string }) => {
    setAiState((prev) => ({ ...prev, loading: true }));

    try {
      const res = await axios.post("https://www.google.com/", { input });
      setAiState({ response: res.data, error: "", loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAiState({ response: "", error: error.message, loading: false });
      } else {
        setAiState({
          response: "",
          error: "An unknown error occurred",
          loading: false,
        });
        console.error(error);
      }
    }
  };

  return { aiState, fetchResponse };
};

export default useAiAssistant;
