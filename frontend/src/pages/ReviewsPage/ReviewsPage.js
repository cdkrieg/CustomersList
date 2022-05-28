import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { MdAddCircle } from "react-icons/md";
import AuthContext from "../../context/AuthContext";
import AxiosReviews from "../../Routes/reviewsRoutes";
import ReviewsList from "../../components/Reviews/ReviewsList";
import "./ReviewsPage.css";

const ReviewsPage = ({ reviews, setReviews }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const uploadImage = async (reviewId, imageData) => {
    try {
      let result = await AxiosReviews.uploadImage(reviewId, imageData);
      if (result) {
        let review = await AxiosReviews.getReviews();
        if (review) setReviews(review);
      }
    } catch (error) {
      console.log("Error uploading review photo");
    }
  };

  return (
    <div className='container-reviews'>
      <MdAddCircle
        className='material-icons'
        onClick={() => navigate("/addReviews")}
      />
      <ReviewsList
        filter={null}
        reviews={reviews}
        setReviews={setReviews}
        filtered={true}
        uploadImage={uploadImage}
        myReview={true}
      />
    </div>
  );
};

export default ReviewsPage;
