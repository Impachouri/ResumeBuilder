import axios from "axios";
// import getUserToken from "../utils/getUserToken";

const API_URL = import.meta.env.API_URL || "http://localhost:4000/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
  withCredentials: true,
});

// const setInterceptor = (redirectToLogin: () => void) => {
//   api.interceptors.request.use(
//     function (config) {
//       const userID = getUserToken();
//       if (userID) {
//         config.headers["X-User-ID"] = userID;
//       } else {
//         redirectToLogin();
//         return Promise.reject(new Error("User is not Found, Please login!"));
//       }
//       return config;
//     },
//     function (error) {
//       return Promise.reject(error);
//     }
//   );
// };

export { api };
