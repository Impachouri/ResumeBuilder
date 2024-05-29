import { ToastOptions, toast } from "react-toastify";

// Define options outside the hook
const options: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

// Create the custom hook
const notification = () => {
  const notify = (message: string, type: "SUCCESS" | "INFO" | "ERROR") => {
    switch (type) {
      case "SUCCESS":
        toast.success(message, options);
        break;
      case "INFO":
        toast.info(message, options);
        break;
      case "ERROR":
        toast.error(message, options);
        break;
      default:
        toast.info(message, options);
        break;
    }
  };

  return notify;
};

export default notification;
