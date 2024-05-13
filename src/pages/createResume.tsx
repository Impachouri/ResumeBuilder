import { Link } from "react-router-dom";

const Createresume = () => {
  return (
    <div className="w-screen h-screen text-black text-5xl flex items-center justify-around p-96">
      <label htmlFor="profile">Select Profile :</label>
      <select
        name="profile"
        id="profile"
        className="p-7 rounded-2xl focus:ring"
      >
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="fullstack">Full Stack</option>
      </select>
      <Link
        to="/resume"
        className="py-2 px-3 rounded-xl text-white  font-bold cursor-pointer transition ease-in-out delay-150 bg-[#7C3AED] hover:-translate-y-1 hover:scale-110 hover:bg-[#7C3AED] duration-300 "
      >
        Next
      </Link>
    </div>
  );
};

export default Createresume;
