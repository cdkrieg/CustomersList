/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

import AxiosReviews from "../../Routes/reviewsRoutes";
import AuthContext from "../../context/AuthContext";
import CommonMethods from "../../utils/CommonMethods";
import "./ReviewsList.css";

const ReviewsList = ({ reviews, setReviews, filtered }) => {
  const [update, setUpdate] = useState(false);
  const { user } = useContext(AuthContext);
  const formatDate = (date) => CommonMethods.formatDate(date);
  const [reviewsFiltered, setReviewsFiltered] = useState([])

  useEffect(() => {
    (async () => {
      try {
        let temp = await getAllReviews();
        setReviews(temp);
      } catch (error) {
        console.log("Error with setReviews in useEffect");
      }
    })();
  }, [update]);

  useEffect(() => {
    if(reviews)
  setReviewsFiltered(filteredReviews())

  }, [reviews])
  

  async function getAllReviews() {
    try {
      let tempReviews = AxiosReviews.getReviews();
      if (tempReviews) {
        return tempReviews;
      }
      setUpdate(!update);
    } catch (error) {
      console.log(`Error getting all reviews on Reviews Page: ${error}`);
    }
  }

  function filteredReviews(){
    let temp;
    if (filtered) {
      temp = reviews.filter((review) => {
        return review.reviewerId === user._id;
      });
      return temp;
    } else {
      return reviews;
    }
  };

  function Td({ children, to, state }) {
    const ContentTag = to ? Link : "div";

    return (
      <td>
        <ContentTag to={to} state={state}>
          {children}
        </ContentTag>
      </td>
    );
  }

  return (
    <div>
      <p></p>
      {Array.isArray(reviewsFiltered) && (
        <Table variant='dark'>
          {reviewsFiltered.map((review, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>Date of Review: {formatDate(review.dateAdded)}</td>
                  <td>Contractor: {review.contractorName}</td>
                  <Td
                    to='/sendMessage'
                    state={{
                      receiver: {
                        id: review.reviewerId,
                        userName: review.reviewer,
                      },
                      messageToReply: { id: review._id, title: review.title },
                    }}>
                    Reviewer: {review.reviewer}
                  </Td>
                </tr>
                <tr>
                  <td>Category: {review.categoryOfService}</td>
                  <td colSpan={2}>
                    Location: {`${review.reviewCity}, ${review.reviewState}`}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>{review.title}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td colSpan={2}>
                    <ReactStars
                      count={5}
                      edit={false}
                      value={review.rating}
                      size={24}
                      isHalf={true}
                      emptyIcon={<i className='far fa-star'></i>}
                      halfIcon={<i className='fa fa-star-half-alt'></i>}
                      fullIcon={<i className='fa fa-star'></i>}
                      activeColor='#ffd700'
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>{review.body}</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      )}
    </div>
  );
};

export default ReviewsList;
