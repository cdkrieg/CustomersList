import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

import AxiosReviews from "../../Routes/reviewsRoutes";
import AuthContext from "../../context/AuthContext";
import CommonMethods from "../../utils/CommonMethods";
import "./ReviewsList.css";

const ReviewsList = (props) => {
  const [reviews, setReviews] = useState();
  const [update, setUpdate] = useState(false);
  const { user } = useContext(AuthContext);
  const formatDate = (date) => CommonMethods.formatDate(date)

  useEffect(() => {
    (async () => {
      if (props.filter) {
        try {
          let temp = await getUserReviews(props.filter);
          setReviews(temp);
        } catch (error) {
          console.log("Error with setReviews in useEffect");
        }
      } else if (user) {
        try {
          let temp = await getAllReviews();
          setReviews(temp);
        } catch (error) {
          console.log("Error with setReviews in useEffect");
        }
      }
    })();
  }, [update]);

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

  async function getUserReviews(userName) {
    try {
      let tempReviews = AxiosReviews.getUserReviews(userName);
      if (tempReviews) {
        return tempReviews;
      }
      setUpdate(!update);
    } catch (error) {
      console.log(`Error getting all reviews on Reviews Page: ${error}`);
    }
  }

  function Td({ children, to, state }) {
    const ContentTag = to ? Link : 'div';
  
    return (
      <td>
        <ContentTag to={to} state={state}>{children}</ContentTag>
      </td>
    );
  }

  return (
    <div>
      <p></p>
      {reviews && (
        <Table variant='dark'>
          {reviews.map((review, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>Date of Review: {formatDate(review.dateAdded)}</td>
                  <td>Contractor: {review.contractorName}</td>        
                  <Td to='/sendMessage' state={{receiver: {id: " ", userName: review.reviewer}, messageToReply:{id: review._id, title: review.title}}} >Reviewer: {review.reviewer}</Td>
                </tr>
                <tr>
                  <td>Category: {review.categoryOfService}</td>
                  <td colSpan={2}>Location: {`${review.reviewCity}, ${review.reviewState}`}</td>
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
