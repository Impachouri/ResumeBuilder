import { useContext, useEffect, useState } from "react";
import { signIn } from "../service/userApi";
import { ApiContext } from "../context/apiContext/ApiContext";
import { UserContext } from "../context/userContext/UserContext";
import { LOGGED_IN } from "../context/constant";
import { UserType } from "../context/userContext/types";
import useRedirectToLogin from "../utils/redirectToLogin";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useRedirectToLogin();
  const { state: apiState, dispatch: apiDispatch } = useContext(ApiContext);
  const { dispatch: userDispatch } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(apiDispatch, formData);
  };

  useEffect(() => {
    if (apiState.data && apiState.actionType === "SIGNIN") {
      userDispatch({
        type: LOGGED_IN,
        payload: apiState.data as UserType,
      });
      navigate("/create");
    }
  }, [apiState, userDispatch, navigate]);

  if (apiState.loading) return <div>Loading...</div>;
  if (apiState.error) return <div>Error: {apiState.error}</div>;

  return (
    <div className="w-screen h-screen text-black text-5xl p-96 gap-5">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-4"
      >
        <div className="flex gap-3">
          <label htmlFor="email">Email</label>
          <input onChange={handleChange} type="email" name="email" />
        </div>
        <div className="flex gap-3">
          <label htmlFor="email">Password</label>
          <input onChange={handleChange} type="password" name="password" />
        </div>
        <button
          type="submit"
          className="py-2 px-3 rounded-xl text-white text-lg font-bold cursor-pointer bg-[#7C3AED]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignIn;
