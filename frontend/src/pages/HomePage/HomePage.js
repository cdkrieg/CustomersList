import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";
import AxiosReviews from "../../Routes/reviewsRoutes";
import AxiosCategories from "../../Routes/categoriesRoutes"

import ReviewsList from "../../components/Reviews/ReviewsList";
import "./HomePage.css";

const HomePage = ({reviews, setReviews}) => {
  const { user } = useContext(AuthContext);
  const [filtered, setFiltered] = useState(false)
  const [filter, setFilter] = useState(null)
  const [dropdownValue, setDropdownValue] = useState('Select Filters')
  const [categoryList, setCategoryList] = useState()

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

const getCategoryList = async () => {
  try {
    let result = await AxiosCategories.getCategories()
    if (result)
    return result
  } catch (error) {
    console.log(`Error getting category list: ${error}`)
  }
}

useEffect(() => {
  (async () => {
    try {
      let temp = await getCategoryList()
      setCategoryList(temp.category)
    } catch (error) {
      console.log("Error with setCategoryList in useEffect")
    }
  })()
}, [])


  return (
    <div className='container-homePage bg-secondary text-white'>
      <p>Welcome, {user.userName} </p>
      {user.image !== "" && <img src={`http://localhost:3010/uploads/images/${user.image}`} alt='profile'/>}
      <br/>
      {Array.isArray(categoryList) &&  categoryList.length && <Dropdown className='dropdown' value={dropdownValue} onSelect={(e)=>{setFilter(e)}}>
        <Dropdown.Toggle variant='dark'>Select Filters</Dropdown.Toggle>
        <Dropdown.Menu variant='dark'>
          <Dropdown.Item>None</Dropdown.Item>
          {categoryList.map((cl, index) => {
            return (
          <Dropdown.Item key={index} eventKey={cl.toLowerCase()}>{cl.toUpperCase()}</Dropdown.Item>
            )})}
        </Dropdown.Menu>
      </Dropdown>}
      <ReviewsList reviews={reviews} setReviews={setReviews} filtered={filtered} uploadImage={uploadImage} categoryList={categoryList} filter={filter}/>
    </div>
  );
};

export default HomePage;
