import { useContext, useState } from "react";
import { signUp } from "../service/userApi";
import { ApiContext } from "../context/apiContext/ApiContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { state, dispatch } = useContext(ApiContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(dispatch, formData);
    navigate("/signin");
  };

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;

  return (
    <div className="w-screen h-screen text-black text-5xl p-96 gap-5">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-4"
      >
        <div className="flex gap-3">
          <label htmlFor="fName">First Name</label>
          <input onChange={handleChange} type="text" name="fName" />
        </div>
        <div className="flex gap-3">
          <label htmlFor="lName">Last Name</label>
          <input onChange={handleChange} type="text" name="lName" />
        </div>
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

export default SignUp;
