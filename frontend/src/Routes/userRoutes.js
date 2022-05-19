import axios from "axios";

const BASE_URL = "http://localhost:3010/api/users";

const editUser = async (userId, userData) => {
  try {
    let response = await axios.put(
      `${BASE_URL}/update/${userId}`,
      { updates: userData },
      { new: true }
    );
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (loginData) => {
  try {
    let response = await axios.post(`${BASE_URL}/login`, loginData);
    if (response.status === 200) return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

const registerUser = async (registerData) => {
  try {
    let response = await axios.post(`${BASE_URL}/register`, registerData);
    if (response.status === 200) return response;
  } catch (error) {
    console.log(error);
  }
};

const AxiosUser = { loginUser, registerUser, editUser };
export default AxiosUser;
