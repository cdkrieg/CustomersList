import React, { useContext, useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/UseCustomForm";
import stateArray from "../../components/StateList/StateList";
import { Form, Button } from "react-bootstrap";
import "./RegisterPage.css";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const [passwordConfirm, setPasswordConfirm] = useState(""); 
  const defaultValues = {
    userName: "",
    email: "",
    password: "",
    streetAddressLine1: "",
    streetAddressLine2: "",
    city: "",
    state: "Choose State",
    zipCode: "",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );
  const [passwordValidation, setPasswordValidation] = useState("notValid");
  const [showPasswordAlert1, setShowPasswordAlert1] = useState(false);
  const [showPasswordAlert2, setShowPasswordAlert2] = useState(false);
  const [showStateAlert, setShowStateAlert] = useState(false);
  const mask = (item) => {
    let temp = "";
    for (let i = 0; i < item.length; i++) {
      temp = temp + "*";
    }
    return temp;
  };

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
    if (
      formData.password === "" ||
      formData.password !== passwordConfirm
    ) {
      setPasswordValidation("notValid");
    } else {
      setPasswordValidation("valid");
      setShowPasswordAlert1(false);
    }
  }, [passwordConfirm]);

  useEffect(() => {
    if (formData.state !== stateArray[0].value) setShowStateAlert(false);
  }, [formData.state]);

  return (
    <div className='container-register'>
      <Form className='form' onSubmit={(event) => passwordCheck(event)}>
        <Form.Label>
          User Name:{" "}
          <Form.Control
            type='text'
            name='userName'
            value={formData.userName}
            onChange={handleInputChange}
          />
        </Form.Label>
        <Form.Label>
          Email:{" "}
          <Form.Control
            type='text'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Label>
        <Form.Label>
          Password:{" "}
          <Form.Control
            type='text'
            name='password'
            autoComplete='off'
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Label>

        <Form.Label className={passwordValidation}>
          Re-Enter Password:{" "}
          <Form.Control
            type='text'
            name='passwordConfirm'
            autoComplete='off'
            value={passwordConfirm}
            onChange={(e)=>setPasswordConfirm(e.target.value)}
          />
        </Form.Label>
        <p> (Password must be at least 8 characters long)</p>
        <p>
          {showPasswordAlert1 && (
            <Alert
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
              variant='danger'
              onClose={() => setShowPasswordAlert2(false)}
              dismissible>
              <Alert.Heading>Password too short!</Alert.Heading>Passwords must
              contain at least 8 characters.
            </Alert>
          )}
        </p>
        <Form.Label>
          Street Address Line 1:{" "}
          <Form.Control
            type='text'
            name='streetAddressLine1'
            value={formData.streetAddressLine1}
            onChange={handleInputChange}
          />
        </Form.Label>
        <Form.Label>
          Street Address Line 2:{" "}
          <Form.Control
            type='text'
            name='streetAddressLine2'
            value={formData.streetAddressLine2}
            onChange={handleInputChange}
          />
        </Form.Label>
        <Form.Label>
          City:{" "}
          <Form.Control
            type='text'
            name='city'
            value={formData.city}
            onChange={handleInputChange}
          />
        </Form.Label>
        <Form.Label className="state">
          State:{" "}
          <Form.Select
            name='state'
            value={formData.state}
            onChange={(event) => handleInputChange(event)}>
            {stateArray.map((item, index) => {
              return <option key={index}>{item.value}</option>;
            })}
          </Form.Select>
        </Form.Label>
        <p>
          {showStateAlert && (
            <Alert
              variant='danger'
              onClose={() => setShowStateAlert(false)}
              dismissible>
              <Alert.Heading>Please choose a state!</Alert.Heading>
            </Alert>
          )}
        </p>
        <Form.Label>
          Zip Code:{" "}
          <Form.Control
            type='text'
            name='zipCode'
            checked={formData.isAdmin}
            onChange={handleInputChange}
          />
        </Form.Label>
        <div className='submitButton'>
          <Button
            id='submitButton'
            type='submit'
            variant="dark"
            onSubmit={(event) => passwordCheck(event)}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
