import axios from "axios";

const baseUrl = "http://localhost:3010/api/messages";
const token = JSON.parse(localStorage.getItem('token'))
const header = {headers: {"x-auth-token": token}}

const deleteMessage = async (messageId) => {
  try {
    let response = await axios.delete(`${baseUrl}/${messageId}`, header);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(`Error deleting the message: ${error}`);
  }
};

const getMessages = async () => {
  try {
    let response = await axios.get(baseUrl);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(`Error getting messages: ${error}`);
  }
};

const getUserMessages = async (userId) => {
  try {
    let response = await axios.get(`${baseUrl}/${userId}`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(`Error getting messages for user:${userId}
    error: ${error}`);
  }
};

const postMessage = async (message) => {
  try {
    let response = await axios.post(baseUrl, message, header);
    if (response) {
      console.log(response.data)
      return response.data;
    }
  } catch (error) {
    console.log(`Error posting the message: ${error}`);
  }
};

const updateMessage = async (messageId, message) => {
  try {
    let response = await axios.put(`${baseUrl}/${messageId}`, message, header);
    return response.data
  } catch (error) {
    console.log(`Error posting the message: ${error}`);
  }
};

const AxiosMessages = {
  postMessage,
  getMessages,
  getUserMessages,
  updateMessage,
  deleteMessage,
};
export default AxiosMessages;
