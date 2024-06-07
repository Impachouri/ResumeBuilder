import { useContext, useState } from "react";
import notification from "../utils/notification";
import useRedirectToPath from "../utils/redirectToPath";
import { AppContext, AppContextStateType } from "../context/appContext";

const questions = [
  {
    question: "Which profile are you aiming to build your resume for?",
    name: "profile",
    value: "",
  },
  { question: "Enter your first name?", name: "fname", value: "" },
  { question: "Enter your last name?", name: "lname", value: "" },
  { question: "Enter your Email?", name: "email", value: "" },
  { question: "Enter your Mobile Number", name: "phone", value: "" },
];

const CreateResume = () => {
  const notify = notification();
  const navigate = useRedirectToPath();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionAnswer, setQuestionAnswer] = useState(questions);
  const { dispatch } = useContext(AppContext) as AppContextStateType;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;
    setQuestionAnswer((prevQuestionAnswer) => {
      const updatedQuestionAnswer = [...prevQuestionAnswer];
      updatedQuestionAnswer[currentQuestionIndex] = {
        ...updatedQuestionAnswer[currentQuestionIndex],
        value: value,
      };
      return updatedQuestionAnswer;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (questionAnswer[currentQuestionIndex].value === "") {
        notify("Please Enter profile", "ERROR");
      } else {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (currentQuestionIndex === questions.length - 1) {
          questionAnswer.forEach((question) => {
            dispatch({
              type: "PERSONAL_INFO",
              data: { name: question.name, value: question.value },
            });
          });
          navigate("/resume");
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen text-black text-5xl flex flex-col justify-around px-40 pt-28">
      <div className="flex flex-col gap-28">
        <span className="self-start">
          {questionAnswer[currentQuestionIndex].question}
        </span>
        <div className="relative z-0 w-full group">
          <input
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            type="email"
            name={questionAnswer[currentQuestionIndex].name}
            className="block py-5 px-0 w-full text-4xl font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer"
            placeholder=""
            value={questionAnswer[currentQuestionIndex].value}
            required
          />
          <label
            htmlFor={questionAnswer[currentQuestionIndex].name}
            className="peer-focus:font-semibold absolute text-4xl text-gray-500 duration-300 transform -translate-y-14 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-14"
          >
            {`Type your ${questionAnswer[currentQuestionIndex].name} here`}
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateResume;
