import axios from "axios";

const baseUrl = "http://localhost:3010/api/reviews";

const deleteReview = async (reviewId) => {
  try {
    let response = await axios.delete(`${baseUrl}/${reviewId}`);
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
    let response = await axios.post(baseUrl, review);
    if (response) {
      let response1 = await axios.put(`${baseUrl}/${response.data._id}`, {$addToSet:{$each:[response.data.coordinates[0],response.data.coordinates[1]]}})
      return response1.data;
    }
  } catch (error) {
    console.log(`Error posting the review: ${error}`);
  }
};

const updateReview = async (reviewId) => {
  try {
    let response = await axios.put(`${baseUrl}/${reviewId}`);
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
      imageData
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
