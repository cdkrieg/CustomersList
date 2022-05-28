import axios from "axios";

const baseUrl = "http://localhost:3010/api/reviews";
const token = JSON.parse(localStorage.getItem('token'))
const header = {headers: {"x-auth-token": token}}

const deleteReview = async (reviewId) => {
  try {
    let response = await axios.delete(`${baseUrl}/${reviewId}`, header);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(`Error deleting the review: ${error}`);
  }
};

const getReviews = async () => {
  try {
    let response = await axios.get(baseUrl);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(`Error getting reviews: ${error}`);
  }
};

const getReviewsById = async (reviewId) => {
  try {
    let response = await axios.get(baseUrl, reviewId);
    if (response) return response.data;
  } catch (error) {
    console.log(`Error getting review ID: ${reviewId}`);
  }
};

const getUserReviews = async (userName) => {
  try {
    let response = await axios.get(`${baseUrl}/${userName}`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(`Error getting reviews for user:${userName}
    error: ${error}`);
  }
};

const postReview = async (review) => {
  try {
    let response = await axios.post(baseUrl, review, header);
    if (response) {
     
      return response.data;
    }
  } catch (error) {
    console.log(`Error posting the review: ${error}`);
  }
};

const updateReview = async (reviewId, update) => {
  try {
    let response = await axios.put(`${baseUrl}/${reviewId}`, update, header);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(`Error posting the review: ${error}`);
  }
};
const uploadImage = async (reviewId, imageData) => {
  try {
    let response = await axios.put(
      `${baseUrl}/updateImage/${reviewId}`,
      imageData, header
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(`Error posting the review: ${error}`);
  }
};

const AxiosReviews = {
  postReview,
  getReviews,
  getReviewsById,
  getUserReviews,
  updateReview,
  uploadImage,
  deleteReview,
};
export default AxiosReviews;
