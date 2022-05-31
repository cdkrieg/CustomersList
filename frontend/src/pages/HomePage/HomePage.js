import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";
import AxiosReviews from "../../Routes/reviewsRoutes";
import AxiosCategories from "../../Routes/categoriesRoutes";
import ReviewsList from "../../components/Reviews/ReviewsList";
import "./HomePage.css";

const HomePage = ({ reviews, setReviews, categoryList, setCategoryList, setReviewEdit, reviewEdit }) => {
  const { user, getAllReviews } = useContext(AuthContext);
  const [filtered, setFiltered] = useState(false);
  const [filter, setFilter] = useState(null);
  const [dropdownValue, setDropdownValue] = useState("Select Filter");

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

  const getCategoryList = async () => {
    try {
      let result = await AxiosCategories.getCategories();
      if (result) return result;
    } catch (error) {
      console.log(`Error getting category list: ${error}`);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let temp = await getCategoryList();
        setCategoryList(temp.category);
        let temp2 = await getAllReviews()
        setReviews(temp2)
      } catch (error) {
        console.log("Error with setCategoryList in useEffect");
      }
    })();
  }, []);
  

  return (
    <div className='container-homePage '>
      <p>Welcome, {user.userName} </p>
      {user.image !== "" && (
        <img
          src={`http://localhost:3010/uploads/images/${user.image}`}
          alt='profile'
        />
      )}
      <br />
      {Array.isArray(categoryList) && categoryList.length && (
        <Dropdown
          className='dropdown'
          value={dropdownValue}
          onSelect={(e) => {
            setFilter(e);
            if(e===null) {
            setDropdownValue('Select Filter')
            } else {
            setDropdownValue(e)
            }
          }}>
          <Dropdown.Toggle>{dropdownValue}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>None</Dropdown.Item>
            {categoryList.map((cl, index) => {
              return <Dropdown.Item key={index} eventKey={cl}>{cl}</Dropdown.Item>;
            })}
          </Dropdown.Menu>
        </Dropdown>
      )}
      {reviews && <ReviewsList
        reviews={reviews}
        setReviews={setReviews}
        reviewEdit={reviewEdit}
        setReviewEdit={setReviewEdit}
        filtered={filtered}
        uploadImage={uploadImage}
        categoryList={categoryList}
        filter={filter}
        myReview={false}
      />}
    </div>
  );
};

export default HomePage;
