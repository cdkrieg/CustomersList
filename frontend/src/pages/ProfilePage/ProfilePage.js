import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Form, Button, Alert } from "react-bootstrap";
import stateArray from "../../components/StateList/StateList";
import useCustomForm from "../../hooks/UseCustomForm";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const defaultValues = {
    name: user.name || "Enter first and last name (optional)",
    password: "",
    streetAddressLine1: user.streetAddressLine1,
    streetAddressLine2:
      user.streetAddressLine2 || "Enter Street Address Line 2",
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

  function passwordCheck(event) {
    event.preventDefault();
    if (formData.password !== passwordConfirm) {
      return setShowPasswordAlert1(true);
    } else if (formData.password.length < 8) {
      return setShowPasswordAlert2(true);
    } else if (formData.state === "Choose State") {
      console.log(formData.state);
      return setShowStateAlert(true);
    } else {
      console.log(formData.state);
      handleSubmit(event);
    }
  }

  useEffect(() => {
    if (formData.password === "" || formData.password !== passwordConfirm) {
      setPasswordValidation("notValid");
    } else {
      setPasswordValidation("valid");
      setShowPasswordAlert1(false);
    }
  }, [passwordConfirm]);

  return (
    <div className='container-profilePage'>
      <Form className='form' onSubmit={(event) => passwordCheck(event)}>
        <Form.Control
          name='name'
          value={formData.name}
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
        </Form.Select><Form.Control
          name='city'
          value={formData.city}
          onChange={handleInputChange}
        />
        <Form.Control
          name='zipCode'
          value={formData.zipCode}
          onChange={handleInputChange}
        />
        <Form.Control
          name='password'
          placeholder='Enter new password'
          autoComplete="off"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Form.Control
          name='passwordConfirm'
          className={passwordValidation}
          autoComplete='off'
          placeholder='Enter password to confirm'
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <p>
          {showPasswordAlert1 && (
            <Alert
            className="alert"
              variant='danger'
              onClose={() => setShowPasswordAlert1(false)}
              dismissible>
              <Alert.Heading>Passwords do not match!</Alert.Heading>
            </Alert>
          )}
        </p>
        <p>
          {showPasswordAlert2 && (
            <Alert
            className="alert"
              variant='danger'
              onClose={() => setShowPasswordAlert2(false)}
              dismissible>
              <Alert.Heading>Password too short!</Alert.Heading>Passwords must
              contain at least 8 characters.
            </Alert>
          )}
        </p>
        <div className="submitButton">
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
