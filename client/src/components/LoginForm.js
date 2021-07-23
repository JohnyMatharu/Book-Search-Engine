//Needs alteration
//Replace the loginUser() functionality imported from the API file with the LOGIN_USER mutation functionality.
//Use hooks to use Query or mutation data as shown in mod 12.3.5, use object structure to use data

// see SignupForm.js for comments
//Check this out
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';


import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
//Replace the loginUser() functionality imported from the API file with the LOGIN_USER mutation functionality.
//import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

    const [loginUser, {error}] = useMutation(LOGIN_USER); 
   

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    try {
//this format needs revision

      const { data } = await loginUser({
        variables: { ...userFormData }
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }




    

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

//this part needs to be checked for renderring objects created by mutation

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
