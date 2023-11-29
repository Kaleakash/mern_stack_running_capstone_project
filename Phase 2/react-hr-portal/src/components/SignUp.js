import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [userType, setUserType] = useState('employee');
  const [validated, setValidated] = useState(false);
  const [validUser,setValidUser]=useState(false);
  const [searchEmployeeInfo,setSearchEmployeeInfo]=useState({});
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
  
    let updateEmployee ={"name":firstName,"lName":lastName,"gender":gender,"password":password,"phoneNumber":phoneNumber,"address":address,"department":searchEmployeeInfo.department,"email":searchEmployeeInfo.email,"leaveApplied":false};
    let result =  await axios.put(`http://localhost:3000/employees/${eval(searchEmployeeInfo.id)}`,updateEmployee)
          if(result){
            toast.success("Account created successfully");
            setValidUser(false);
            setEmail("");
            setFirstName("");
            setLastName("");
            setGender("");
            setPhoneNumber("");
            setAddress("");
            setPassword("");
          }
      

    }
  };

  const checkEmail = async (event) => {
    //
    event.preventDefault();
    event.stopPropagation();

    let validEmployees = await axios.get("http://localhost:3000/employees");
    let result = validEmployees.data.find(e=>e.email==email);
    if(result==undefined){
        setEmail("");

        toast.error("InValid emailId!")
    }else {
      setValidUser(true);
      setSearchEmployeeInfo(result);
    }
  }
  return (
    <div
      style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?office,workspace')`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ToastContainer />
      <Container
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '600px',
        }}
      >
        <h1 className="text-center mb-4">Sign Up</h1>
        {
          !validUser   
          && 
          <Form noValidate validated={validated} onSubmit={checkEmail}>
          
          <Row>

          <Col>
            <Form.Group controlId="email">
            <Form.Control
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="sm"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

            </Col>


          </Row>

          <Button variant="primary" type="submit" block>
            Please enter your valid email Id
          </Button>


          </Form>
        }


        {
          
          validUser &&

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          
          <Row>

          <Col>
            <Form.Group controlId="email">
            <Form.Control
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="sm"  readOnly
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

            </Col>


          </Row>

        
        
          <Row>
          
            <Col>

              <Form.Group controlId="firstName">
                <Form.Control
                  required
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  size="sm"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your first name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lastName">
                <Form.Control
                  required
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  size="sm"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your last name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="gender">
            <Form.Control
              as="select"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              size="sm"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select your gender.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="sm"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="phoneNumber">
            <Form.Control
              required
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              size="sm"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your phone number.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Control
              required
              as="textarea"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              size="sm"
              style={{ minHeight: '100px' }}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your address.
            </Form.Control.Feedback>
          </Form.Group>


          <Button variant="primary" type="submit" block>
            Sign Up
          </Button>
        
        

        </Form>}  
        <Link to="/">Login</Link> 
      </Container>
    </div>
  );
};

export default SignUp;
