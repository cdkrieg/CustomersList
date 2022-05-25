import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";
import AxiosReviews from "../../Routes/reviewsRoutes";

import ReviewsList from "../../components/Reviews/ReviewsList";
import "./HomePage.css";

const HomePage = ({reviews, setReviews}) => {
  const { user } = useContext(AuthContext);

  const uploadImage = async (reviewId, imageData) => {
    try {
      let result = await AxiosReviews.uploadImage(reviewId, imageData)
      if (result) {
          let review = await AxiosReviews.getReviews()
          if (review)
          setReviews(review)
      }
    } catch (error) {
      console.log('Error uploading review photo')
    }

  }

  return (
    <div className='container-homePage bg-secondary text-white'>
      <p>Welcome, {user.userName} </p>
      {user.image !== "" && <img src={`http://localhost:3010/uploads/images/${user.image}`} alt='profile'/>}
      <br/>
      <Dropdown className='dropdown'>
        <Dropdown.Toggle variant='dark'>Select Filters</Dropdown.Toggle>
        <Dropdown.Menu variant='dark'>
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
          <Dropdown.Item>Item 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <ReviewsList reviews={reviews} setReviews={setReviews} filtered={false} uploadImage={uploadImage} />
    </div>
  );
};

export default HomePage;
