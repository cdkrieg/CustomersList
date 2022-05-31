import React, { useState, useEffect, useContext } from "react";
import AxiosCategories from "../../Routes/categoriesRoutes";
import EditReviewForm from "../../components/Reviews/EditReviewForm";
import AuthContext from "../../context/AuthContext";

const EditReviewPage = ({ reviewEdit }) => {
  const {user} = useContext(AuthContext)
  const [categoryList, setCategoryList] = useState();
  const [update, setUpdate] = useState(false)

  useEffect(() => {
      (async()=>{
        let categories = await getCategories();
    setCategoryList(categories);
      })()
  
  }, []);

  const getCategories = async () => {
    try {
      let result = await AxiosCategories.getCategories();
      return result.category;
    } catch (error) {
      console.log("error getting categories");
    }
  };

  return (
    <div>
      {user.phone === reviewEdit.contractorPhone && <h2>Respond To Review</h2>}
      {user.phone !== reviewEdit.contractorPhone && <h2>Edit Review</h2>}
      <br/>
      {reviewEdit && categoryList && categoryList.length && (
        <EditReviewForm reviewEdit={reviewEdit} categoryList={categoryList} />
      )}
    </div>
  );
};

export default EditReviewPage;
