import { useNavigate } from "react-router-dom";

const useRedirectToPath = () => {
  const navigate = useNavigate();
  return (path: string) => navigate(path);
};
export default useRedirectToPath;
