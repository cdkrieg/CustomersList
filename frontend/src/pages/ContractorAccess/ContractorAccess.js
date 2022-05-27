import React, { useState, useContext } from 'react';
import {Button} from 'react-bootstrap'

import AuthContext from '../../context/AuthContext';
import UploadPhoto from '../../components/Images/UploadPhoto';
import ContractorForm from '../../components/Contractor/ContractorForm'

const ContractorAccess = () => {
    const { user, uploadImage } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const title = "Contractor";

  return (
    <div className='container-ContractorAccess'>
      {!show && user && (
        <>
          <ContractorForm />
          <Button onClick={() => setShow(true)}>
            Change/Upload Photo
          </Button>{" "}
        </>
      )}

      {show && (
        <UploadPhoto
          uploadImage={uploadImage}
          id={user._id}
          currentImage={user.image}
          title={title}
          setShow={setShow}
        />
      )}
      {!user && <p>User not logged in</p>}
    </div>
  )}

export default ContractorAccess;