import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/UseCustomForm";

import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { email: "", password: "" };
  const [checked, setChecked] = useState(false)
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div className="container-login">
      <Form className="form" onSubmit={handleSubmit} onKeyUp={(event)=> {if(event.key === 'Enter')handleSubmit(event)}}>
        <Form.Label>
          Email:{" "}
          <Form.Control
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Label>
        <Form.Label>
          Password:{" "}
          <Form.Control
            name='password'
            placeholder='Enter new password'
            type="password"
            autoComplete='off'
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Label>
        <Form.Check
          type='checkbox'
          label='Contractor'
          onChange={() => {
            setChecked(!checked);
          }}
        />
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials!</p>
        ) : null}
        <Link className="link" to="/register">Click to register!</Link>
        <Button type="submit" className="login">Login!</Button>
      </Form>
    </div>
  );
};

export default LoginPage;