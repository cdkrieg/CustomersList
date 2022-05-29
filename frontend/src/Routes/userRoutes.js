import axios from "axios";

const BASE_URL = "http://localhost:3010/api/users";
const token = JSON.parse(localStorage.getItem("token")) || "";
const header = { headers: { "x-auth-token": token } };

const editUser = async (userId, userData) => {
  try {
    let response = await axios.put(
      `${BASE_URL}/update/${userId}`,
      userData,
      header
    );
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  try {
    let response = await axios.get(BASE_URL);
    if (response)
      return response.data.map((user) => {
        return { userId: user._id, userName: user.userName };
      });
  } catch (error) {}
};

const loginUser = async (loginData) => {
  try {
    let response = await axios.post(`${BASE_URL}/login`, loginData);
    if (response.status === 200) 
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

const registerUser = async (registerData) => {
  try {
    let response = await axios.post(`${BASE_URL}/register`, registerData);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

const uploadImage = async (userId, imageData) => {
  try {
    let response = await axios.put(
      `${BASE_URL}/updateImage/${userId}`,
      imageData,
      header
    );
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

const AxiosUser = {
  loginUser,
  registerUser,
  editUser,
  getAllUsers,
  uploadImage,
};
export default AxiosUser;
