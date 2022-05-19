import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import ReactStars from "react-rating-stars-component";
import "react-datepicker/dist/react-datepicker.css";

import AxiosReviews from "../../Routes/reviewsRoutes";
import useCustomForm from "../../hooks/UseCustomForm";
import AuthContext from "../../context/AuthContext";

const ReviewsForm = ({ username, setShow }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
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
    tempCategory: "",
    tempCategory2: "",
    reviewCity: user.city,
    reviewState: user.state,
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    AxiosReviews.postReview
  );

  useEffect(() => {
    if (formData.tempCategory === "Other") setShowNotListed(true);
    else setShowNotListed(false);
  }, [formData.tempCategory]);

  function submit(e) {
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
    console.log("submitting data");
    handleSubmit(e);
  }

  return (
    <div>
      <Form onSubmit={(event) => submit(event)} variant='dark'>
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
          variant='dark'
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
          variant='dark'>
          Submit
        </Button>
        <Button type='cancel' onClick={() => navigate("/")} variant='dark'>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default ReviewsForm;
