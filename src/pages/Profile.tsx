import { FaPlus } from "react-icons/fa";
import useRedirectToPath from "../utils/redirectToPath";

const Profile = () => {
  const profiles = ["frontend"];
  const redirect = useRedirectToPath();

  const handleOpenExistResume = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    redirect("/resume");
  };

  return (
    <div className="min-h-screen w-full flex items-center p-20 pt-36 overflow-y-auto">
      <div className="h-full w-full grid grid-cols-5 gap-20 text-black text-3xl">
        <button onClick={() => redirect("/create")}>
          <div className="relative group">
            <div className="absolute inset-1 bg-white shadow-2xl rotate-6 origin-bottom-right transition-transform group-hover:rotate-12"></div>
            <div className="aspect-[3/4] flex bg-white items-center justify-center transform -rotate-6 shadow-2xl origin-bottom-left transition-transform group-hover:-rotate-12">
              <FaPlus className="mr-2" />
              <span className="">Create new</span>
            </div>
          </div>
        </button>
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="bg-white aspect-[3/4] p-4 rounded-lg flex flex-col items-center justify-center relative"
          >
            <button onClick={handleOpenExistResume}>
              <span>{profile}</span>
            </button>
            <button>
              <div className="absolute bottom-2 right-2 ">
                <svg viewBox="0,0 100,100" height="30" width="3l0" role="img">
                  <circle cx="50" cy="15" r="10" />
                  <circle cx="50" cy="50" r="10" />
                  <circle cx="50" cy="85" r="10" />
                </svg>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
