import React from 'react';

import ReviewsForm from '../../components/Reviews/ReviewsForm';


const AddReviewsPage = ({reviews, setReviews}) => {

    return ( 
        <ReviewsForm reviews={reviews} setReviews={setReviews}/>
     );
}
 
export default AddReviewsPage;