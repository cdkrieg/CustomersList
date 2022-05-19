import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Form, Button, Alert, FormCheck } from "react-bootstrap";
import stateArray from "../../components/StateList/StateList";
import useCustomForm from "../../hooks/UseCustomForm";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const defaultValues = {
    name: user.name || "",
    streetAddressLine1: user.streetAddressLine1,
    streetAddressLine2: user.streetAddressLine2 || "",
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues
  );
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("notValid");
  const [showPasswordAlert1, setShowPasswordAlert1] = useState(false);
  const [showPasswordAlert2, setShowPasswordAlert2] = useState(false);
  const [showStateAlert, setShowStateAlert] = useState(false);
  const [checked, setChecked] = useState(false)

  function passwordCheck(event) {
    event.preventDefault()
    if (formData.password && formData.password !== passwordConfirm) {
      return setShowPasswordAlert1(true);
    } else if (
      formData.password &&
      formData.password !== "" &&
      formData.password.length < 8
    ) {
      return setShowPasswordAlert2(true);
    } else if (formData.state === "Choose State") {
      console.log(formData.state);
      return setShowStateAlert(true);
    } else {
      return ((event)=>handleSubmit(event))
      
    }
  }

  useEffect(() => {
    if (formData.password) {
      if (formData.password !== passwordConfirm) {
        setPasswordValidation("notValid");
      } else {
        setPasswordValidation("valid");
        setShowPasswordAlert1(false);
      }
    }
  }, [passwordConfirm]);

  return (
    <div className='container-profilePage'>
      <Form className='form' onSubmit={(event) => passwordCheck(event)}>
        <Form.Control
          name='name'
          value={formData.name}
          placeholder={"Enter first and last name (optional)"}
          onChange={handleInputChange}
        />
        <Form.Control
          name='streetAddressLine1'
          value={formData.streetAddressLine1}
          onChange={handleInputChange}
        />
        <Form.Control
          name='streetAddressLine2'
          value={formData.streetAddressLine2}
          onChange={handleInputChange}
        />

        <Form.Select
          name='state'
          value={formData.state}
          onChange={(event) => handleInputChange(event)}>
          {stateArray.map((item, index) => {
            return <option key={index}>{item.value}</option>;
          })}
        </Form.Select>
        <Form.Control
          name='city'
          value={formData.city}
          onChange={handleInputChange}
          id="profileCity"
        />
        <Form.Control
          name='zipCode'
          value={formData.zipCode}
          onChange={handleInputChange}
        />
        <Form.Check type="checkbox" label="Check to change password" onChange={()=>{setChecked(!checked);defaultValues.password=""}}/>
        {checked && <Form.Control
          name='password'
          placeholder='Enter new password'
          type="password"
          autoComplete='off'
          value={formData.password}
          onChange={handleInputChange}
        />}
        {checked && <Form.Control
          name='passwordConfirm'
          className={passwordValidation}
          autoComplete='off'
          type="password"
          placeholder='Enter password to confirm'
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />}
        
          {checked && showPasswordAlert1 && (
            <Alert
              className='alert'
              variant='danger'
              onClose={() => setShowPasswordAlert1(false)}
              dismissible>
              <Alert.Heading>Passwords do not match!</Alert.Heading>
            </Alert>
          )}
   
          {checked && showPasswordAlert2 && (
            <Alert
              className='alert'
              variant='danger'
              onClose={() => setShowPasswordAlert2(false)}
              dismissible>
              <Alert.Heading>Password too short!</Alert.Heading>Passwords must
              contain at least 8 characters.
            </Alert>
          )}
       
        <div className='submitButton'>
          <Button
            id='submitButton'
            type='submit'
            variant='dark'
            onSubmit={(event) => passwordCheck(event)}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfilePage;
