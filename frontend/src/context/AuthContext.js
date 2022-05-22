import { createContext, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AxiosUser from "../Routes/userRoutes";

const AuthContext = createContext();

export default AuthContext;
export const AuthProvider = ({ children }) => {
  const decodedUser = localStorage.getItem("token");
  const decodedToken = decodedUser ? jwtDecode(decodedUser) : null;
  const [file, setFile] = useState();
  const [isServerError, setIsServerError] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(() => decodedToken);

  const loginUser = async (loginData) => {
    try {
      let result = await AxiosUser.loginUser(loginData);
      if (result) {
        localStorage.setItem("token", JSON.stringify(result));
        setUser(jwtDecode(result));
        setIsServerError(false);
        navigate("/");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(`Error logging in user: ${error}`);
      setIsServerError(true);
    }
  };
  const webMaster = {id: "62858a96c113086f6d55662a", userName: "cdkrieg"}
  const logoutUser = async () => {
    if (user) {
      navigate("/");
      localStorage.removeItem("token");
      console.log("token removed");
      setUser(null);
      setFile(null);
    }
  };

  const registerUser = async (registerData) => {
    try {
      let result = await AxiosUser.registerUser(registerData);
      if (result) {
        let token = result.headers["x-auth-token"];
        localStorage.setItem("token", JSON.stringify(token));
        setUser(jwtDecode(token));
        navigate("/");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(`Error registering user: ${error}`);
    }
  };

  const updateUser = async (userData) => {
    try {
      let result = await AxiosUser.editUser(user._id, userData);
      if (result) {
        setIsServerError(false);
      }
    } catch (error) {
      console.log(`Error updating user: ${error}`);
      setIsServerError(true);
    }
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    isServerError,
    file,
    setFile,
    updateUser,
    webMaster
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
