/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";

import AxiosReviews from "../../Routes/reviewsRoutes";
import AuthContext from "../../context/AuthContext";
import CommonMethods from "../../utils/CommonMethods";
import "./ReviewsList.css";
import UploadPhoto from "../Images/UploadPhoto";

const ReviewsList = ({
  reviews,
  setReviews,
  filtered,
  uploadImage,
  filter,
  setReviewEdit,
  reviewEdit,
}) => {
  const [update, setUpdate] = useState(false);
  const { user } = useContext(AuthContext);
  const formatDate = (date) => CommonMethods.formatDate(date);
  const [reviewsFiltered, setReviewsFiltered] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedReview, setSelectedReview] = useState({});
  const title = "Review";
  const navigate = useNavigate();
  const distance = (review) => {
    let temp = CommonMethods.haversineDistance(
      [parseFloat(user.coordinates[1]), parseFloat(user.coordinates[0])],
      [parseFloat(review.coordinates[1]), parseFloat(review.coordinates[0])],
      true
    );
    return temp;
  };

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
    if (reviews && filter) {
      setReviewsFiltered(filterReviews(reviews));
    } else if (reviews) {
      setReviewsFiltered(filteredReviewsByReviewer(reviews));
    }
  }, [reviews, filter]);

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

  function filteredReviewsByReviewer(reviews) {
    let temp;
    if (filtered) {
      temp = reviews.filter((review) => {
        return review.reviewer === user.userName;
      });
      return temp;
    } else {
      return reviews;
    }
  }

  function filterReviews() {
    let temp;
    if (filter) {
      if (filter === "None" && filtered) {
        return filteredReviewsByReviewer(reviews);
      } else if (filter === "None") {
        return true;
      } else {
        temp = reviews.filter((review) => {
          if (review.categoryOfService.toLowerCase() === filter.toLowerCase())
            return filteredReviewsByReviewer(review);
          else return null;
        });
      }
      return temp;
    } else {
      return reviews;
    }
  }

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
    <div className='container-reviewList'>
      {!show && Array.isArray(reviewsFiltered) && (
        <Table className='reviewTable' id='reviewTable'>
          {reviewsFiltered.map((review, index) => {
            if (distance(review) <= 50) {
              return (
                <tbody key={index} id='reviewTableBody'>
                  <tr id='bold'>
                    <td>Date:</td>
                    <td>Contractor: </td>
                    <td>Reviewer:</td>
                  </tr>
                  <tr>
                    <td>{formatDate(review.dateAdded)}</td>
                    <td>{review.contractorName}</td>
                    {review.reviewerId !== user._id && (
                      <Td
                        to='/sendMessage'
                        state={{
                          receiver: {
                            id: review.reviewerId,
                            userName: review.reviewer,
                          },
                          messageToReply: {
                            id: review._id,
                            title: review.title,
                          },
                        }}>
                        Reviewer: {review.reviewer}
                      </Td>
                    )}
                    {review.reviewerId === user._id && (
                      <td>{`${review.reviewer}`}</td>
                    )}
                  </tr>
                  <tr id='bold'>
                    <td>Category:</td>
                    <td>Phone:</td>
                    <td>Location:</td>
                  </tr>
                  <tr className='head'>
                    <td>{review.categoryOfService}</td>
                    <td>{CommonMethods.phoneFormat(review.contractorPhone)}</td>
                    <td>{`${review.reviewCity}, ${review.reviewState}`}</td>
                  </tr>
                  <tr>
                    <td id='reviewTitle' colSpan={3}>
                      {review.title}
                    </td>
                  </tr>
                  <tr className='ratingStars rating' id='ratingStars'>
                    <td>Rating</td>
                    <td className='rating stars' id='stars' colSpan={2}>
                      <ReactStars
                        count={5}
                        edit={false}
                        value={review.rating}
                        size={20}
                        isHalf={true}
                        emptyIcon={<i className='far fa-star'></i>}
                        halfIcon={<i className='fa fa-star-half-alt'></i>}
                        fullIcon={<i className='fa fa-star'></i>}
                        activeColor='#ffd700'
                      />
                    </td>
                  </tr>
                  <tr><td><strong>Review</strong></td></tr>
                  <tr>
                    <td id='reviewBody' colSpan={3}>
                      {review.body}
                    </td>
                  </tr>
                  {user.isContractor &&
                    review.contractorPhone === user.phone &&
                    review.response === "" && (
                      <tr>
                        <td colSpan={3} onClick={() => {
                              setReviewEdit(review);
                              navigate("/editReview");
                            }} style={{color: "#0000EE", textDecoration: "underline"}}>
                        Respond to Review
                            
                           
                          
                        </td>
                      </tr>
                    )}
                  {review.response && review.response !== "" && (
                    <>
                      <tr>
                        <td><strong>Response:</strong></td>
                      </tr>
                      <tr className="reviewResponse">
                        <td colSpan={3}>{review.response}</td>
                      </tr>
                    </>
                  )}
                  {review.reviewerId === user._id && (
                    <tr>
                      <td>
                        <Button
                          onClick={() => {
                            setShow(true);
                            setSelectedReview({
                              id: review._id,
                              currentImage: review.image,
                            });
                          }}>
                          Change/Upload Photo
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() => {
                            setReviewEdit(review);
                            setUpdate(!update)
                            navigate("/editReview");
                          }}>
                          Edit Review
                        </Button>
                      </td>
                    </tr>
                  )}
                  {review.image !== "" && (
                    <tr>
                      <td colSpan={3}>
                        <img
                          src={`http://localhost:3010/uploads/images/${review.image}`}
                          alt='review'
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              );
            } else {
              return null;
            }
          })}
        </Table>
      )}
      {show && (
        <UploadPhoto
          uploadImage={uploadImage}
          id={selectedReview.id}
          currentImage={selectedReview.currentImage}
          title={title}
          setShow={setShow}
        />
      )}
    </div>
  );
};

export default ReviewsList;
