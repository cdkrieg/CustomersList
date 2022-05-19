import axios from "axios";

const baseUrl = "http://localhost:3010/api/reviews";

const deleteReview = async (reviewId) => {
  try {
      let response = await axios.delete(`${baseUrl}/${reviewId}` )
      if (response){
          return response.data
      }
  } catch (error) {
      console.log(`Error deleting the review: ${error}`);
  }
}

const getReviews = async () =>  {
  try {
    let response = await axios.get(baseUrl);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(`Error getting reviews: ${error}`);
  }
}

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
}

const postReview = async (review) => {
  try {
    let response = await axios.post(baseUrl, review);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(`Error posting the review: ${error}`);
  }
}

const updateReview = async (reviewId) =>{
    try {
        let response = await axios.put(`${baseUrl}/${reviewId}`)
        if (response){
            return response.data
        }
    } catch (error) {
        console.log(`Error posting the review: ${error}`);
    }
}
const updateReviewImage = async (reviewId, formData) => {
    try {
        let response = await axios.put(`${baseUrl}/updateImage/${reviewId}`)
        if (response){
            return response.data
        }
    } catch (error) {
        console.log(`Error posting the review: ${error}`);
    }
}



const AxiosReviews = { postReview, getReviews, getUserReviews, updateReview, updateReviewImage, deleteReview };
export default AxiosReviews;
