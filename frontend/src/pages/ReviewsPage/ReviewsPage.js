import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MdAddCircle } from "react-icons/md";
import AuthContext from "../../context/AuthContext";

import ReviewsList from "../../components/Reviews/ReviewsList";
import "./ReviewsPage.css";

const ReviewsPage = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)

  return (
    <div className='container-reviews'>
      <MdAddCircle
        className='material-icons'
        onClick={() => navigate("/addReviews")}
      />
      <ReviewsList filter={user.userName}/>
    </div>
  );
};

export default ReviewsPage;
