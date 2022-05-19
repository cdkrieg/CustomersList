import React, { useState, useEffect, useContext } from 'react';

import ReviewsForm from '../../components/Reviews/ReviewsForm';
import AuthContext from '../../context/AuthContext';

const AddReviewsPage = () => {
    const {user} = useContext(AuthContext)
    return ( 
        <ReviewsForm userName={user.userName}/>
     );
}
 
export default AddReviewsPage;