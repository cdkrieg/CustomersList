import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import ReactStars from "react-rating-stars-component";
import "react-datepicker/dist/react-datepicker.css";

import AxiosReviews from "../../Routes/reviewsRoutes";
import useCustomForm from "../../hooks/UseCustomForm";
import AxiosAPI from "../../Routes/distanceRoutes";

const EditReviewForm = ({ reviewEdit, categoryList }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(Date.parse(reviewEdit.dateOfService));
  const [showNotListed, setShowNotListed] = useState(false);

  const defaultValues = {
    contractorName: reviewEdit.contractorName,
    contractorPhone: reviewEdit.contractorPhone,
    categoryOfService: reviewEdit.categoryOfService,
    dateOfService: date,
    title: reviewEdit.title,
    rating: reviewEdit.rating,
    body: reviewEdit.body,
    reviewer: reviewEdit.reviewer,
    reviewerId: reviewEdit.reviewerId,
    tempCategory: reviewEdit.categoryOfService,
    tempCategory2: "",
    reviewCity: reviewEdit.reviewCity,
    reviewState: reviewEdit.reviewState,
    reviewStreetAddress: reviewEdit.reviewStreetAddress,
    coordinates: reviewEdit.coordinates,
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues
  );

  useEffect(() => {
    if (formData.tempCategory === "Other") setShowNotListed(true);
    else setShowNotListed(false);
  }, [formData.tempCategory]);

  useEffect(() => {}, [categoryList]);

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
    await getCoordinates(
      `${formData.reviewStreetAddress}, ${formData.reviewCity}, ${formData.reviewState}`
    );
    AxiosReviews.updateReview(reviewEdit._id, formData)
    navigate("/");
  }

  const getCoordinates = async (address) => {
    try {
      let result = await AxiosAPI.getGeocode(address);
      if (result) formData.coordinates.push(`${result[0]}`);
      formData.coordinates.push(`${result[1]}`);
    } catch (error) {
      console.log("Error getting coordinates");
    }
  };

  const selectOptions = () => {};

  return (
    <div>
      <Form
        onSubmit={(event) => submit(event)}
        variant='info'
        onKeyUp={(event) => {
          if (event.key === "Enter") handleSubmit(event);
        }}>
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
          {categoryList.map((category, index) => {
            if (category === reviewEdit.categoryOfService) {
              return (
                <option key={index} value={category} selected>
                  {category}
                </option>
              );
            } else {
              return (
                <option key={index} value={category}>
                  {category}
                </option>
              );
            }
          })}
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

export default EditReviewForm;
