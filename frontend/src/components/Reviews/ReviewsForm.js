import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import ReactStars from "react-rating-stars-component";
import "react-datepicker/dist/react-datepicker.css";

import AxiosReviews from "../../Routes/reviewsRoutes";
import useCustomForm from "../../hooks/UseCustomForm";
import AuthContext from "../../context/AuthContext";
import AxiosAPI from "../../Routes/distanceRoutes";

const ReviewsForm = ({ reviews, setReviews }) => {
  const { user,getAllReviews } = useContext(AuthContext);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false)
  const [date, setDate] = useState(new Date());
  const [showNotListed, setShowNotListed] = useState(false);
  const defaultValues = {
    contractorName: "",
    contractorPhone: "",
    categoryOfService: "Select category of service",
    dateOfService: "",
    title: "",
    rating: 0,
    body: "",
    reviewer: user.userName,
    reviewerId: user._id,
    tempCategory: "",
    tempCategory2: "",
    reviewCity: user.city,
    reviewState: user.state,
    reviewStreetAddress: user.streetAddressLine1,
    coordinates: []
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    AxiosReviews.postReview
  );

  useEffect(() => {
    if (formData.tempCategory === "Other") setShowNotListed(true);
    else setShowNotListed(false);
  }, [formData.tempCategory]);

  useEffect(() => {
    let temp = getReviews
    if(temp)
    setReviews(temp)
  }, [update])
  

  async function submit(e) {
    e.preventDefault();
    if (formData.tempCategory === "Other") {
      formData.categoryOfService = formData.tempCategory2.valueOf();
      delete formData.tempCategory;
      delete formData.tempCategory2;
    } else {
      formData.categoryOfService = formData.tempCategory.valueOf();
      delete formData.tempCategory;
      delete formData.tempCategory2;
    }
    formData.dateOfService = date;
    await getCoordinates(`${formData.reviewStreetAddress}, ${formData.reviewCity}, ${formData.reviewState}`)
    handleSubmit(e);
    setUpdate(true)
    navigate('/')
  }
  const getReviews = async () => {
    try {
      let result = await getAllReviews
      if (result) return result
    } catch (error) {
      
    }
  }

  const getCoordinates = async (address) => {
    try {
      let result = await AxiosAPI.getGeocode(address)
      if (result)
      formData.coordinates.push(`${result[0]}`)
      formData.coordinates.push(`${result[1]}`)
    } catch (error) {
      console.log('Error getting coordinates')
    }
  }

  return (
    <div>
      <Form onSubmit={(event) => submit(event)} variant='info' onKeyUp={(event)=> {if(event.key === 'Enter')handleSubmit(event)}}>
        <Form.Text>
          <strong>Add a Review</strong>
        </Form.Text>
        <Form.Control
          type='text'
          value={formData.contractorName}
          name='contractorName'
          placeholder='Enter contractor/business name'
          onChange={handleInputChange}
        />
        <Form.Control
          type='text'
          value={formData.contractorPhone}
          name='contractorPhone'
          placeholder='Enter contractor/business phone'
          onChange={handleInputChange}
        />
        <Form.Select
          name='tempCategory'
          value={formData.tempCategory}
          variant='info'
          onChange={handleInputChange}>
          <option>Select category of service</option>
          <option>Handyman</option>
          <option>Windows and Doors</option>
          <option>Lanscaping</option>
          <option>Remodeling</option>
          <option>Concrete/Asphalt</option>
          <option>Plumbing</option>
          <option>Electrical</option>
          <option>Other</option>
        </Form.Select>
        {showNotListed && (
          <Form.Control
            type='text'
            name='tempCategory2'
            value={formData.tempCategory2}
            placeholder='Enter category of service'
            onChange={handleInputChange}
          />
        )}
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
        <Form.Control
          type='text'
          name='title'
          value={formData.title}
          placeholder='Enter a title for your review'
          onChange={handleInputChange}
        />
        <ReactStars
          count={5}
          name='rating'
          onChange={(rating) => (formData.rating = rating)}
          size={24}
          color2={"#ffd700"}
          value={formData.rating}
          half={true}
        />
        <Form.Control
          type='textarea'
          name='body'
          value={formData.body}
          onChange={handleInputChange}
          placeholder='Enter your review'
        />
        <Button
          type='submit'
          onSubmit={(event) => submit(event)}
          variant='info'>
          Submit
        </Button>
        <Button type='cancel' onClick={() => navigate("/")} variant='info'>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default ReviewsForm;
