import React, {useState,useEffect} from 'react';
import AxiosCategories from "../../Routes/categoriesRoutes";
import EditReviewForm from '../../components/Reviews/EditReview';

const EditReviewPage = ({reviewEdit}) => {
    const [categoryList, setCategoryList] = useState()

    useEffect(()=>{
        let categories =async()=> await getCategories()
        setCategoryList(categories)
      },[])

      const getCategories = async () => {
        try {
            let result = await AxiosCategories.getCategories()
            return result.category
        } catch (error) {
            console.log('error getting categories')
        }
      }

    return ( <div>
        <h2>Edit Review</h2>
        {reviewEdit && categoryList && categoryList.length && <EditReviewForm reviewEdit={reviewEdit} categoryList={categoryList}/>}

    </div> );
}
 
export default EditReviewPage;