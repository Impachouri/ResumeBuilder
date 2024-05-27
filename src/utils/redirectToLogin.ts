import { useNavigate } from "react-router-dom";

const useRedirectToLogin = () => {
  const navigate = useNavigate();
  return (path: string) => navigate(path);
};
export default useRedirectToLogin;
