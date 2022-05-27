import axios from "axios";

const baseUrl = "http://localhost:3010/api/contractor";

const editContractor = async (contractorId, contractorData) => {
    try {
      let response = await axios.put(
        `${baseUrl}/update/${contractorId}`,
        { contractorData },
        { new: true }
      );
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const getAllContractors = async () => {
    try {
      let response = await axios.get(baseUrl);
      if (response)
        return response.data.map((contractor) => {
          return { contractorId: contractor._id, contractorName: contractor.contractorName };
        });
    } catch (error) {}
  };
  
  const loginContractor = async (loginData) => {
    try {
      let response = await axios.post(`${baseUrl}/login`, loginData);
      if (response.status === 200) return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const registerContractor = async (registerData) => {
    try {
      let response = await axios.post(`${baseUrl}/register`, registerData);
      if (response.status === 200) return response;
    } catch (error) {
      console.log(error);
    }
  };
  
  const uploadImage = async (contractorId, imageData) => {
    try {
      let response = await axios.put(
        `${baseUrl}/updateImage/${contractorId}`,
        imageData
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  





const AxiosContractor = {loginContractor,
    registerContractor,
    editContractor,
    getAllContractors,
    uploadImage,}
export default AxiosContractor