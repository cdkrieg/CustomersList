import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

import AxiosReviews from "../../Routes/reviewsRoutes";
import "./ReviewsList.css";
import AuthContext from "../../context/AuthContext";

const ReviewsList = (props) => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    (async () => {
      if (props.filter){
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
  return (
    <div>
      <p></p>
      {reviews && (
        <Table variant='dark'>
          {reviews.map((review, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{review.dateAdded}</td>
                  <td>{review.contractorName}</td>
                  <td>{review.reviewer}</td>
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
