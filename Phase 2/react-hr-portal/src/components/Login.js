import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
	
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('employee');
  const [validated, setValidated] = useState(false);
  let navigate  = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      // Perform login authentication based on username, password, and userType
      console.log('Logging in...', { username, password, userType });
      if(username=="hr@gmail.com" && password=="hr@123" && userType=="hr"){
        toast.success("successfully done!",{
         
          onClose: () => {
            navigate("/HrDashboard");
         }

        })
          
      }else {
       // toast.failure("Invalid UserName or password")
       //
       let allEmployee = await axios.get("http://localhost:3000/employees");
       let validUser = await allEmployee.data.find(e=>e.email==username && e.password==password && userType=="employee");
       if(validUser==undefined){
        toast.error("InValid emailid or password!")
       }else {
          sessionStorage.setItem("userInfo",username);
          navigate("/EmployeeDashboard");
       } 
      }
    }
  };

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

      <Container
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '400px',
        }}
      >
        <h1 className="text-center mb-4">Login</h1>
        
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Control
              required
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="sm"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your username.
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

          <Form.Group>
            <Form.Check
              inline
              label="Employee"
              type="radio"
              id="employee"
              value="employee"
              checked={userType === 'employee'}
              onChange={() => setUserType('employee')}
              size="sm"
            />
            <Form.Check
              inline
              label="Hr"
              type="radio"
              id="admin"
              value="hr"
              checked={userType === 'hr'}
              onChange={() => setUserType('hr')}
              size="sm"
            />
            
          </Form.Group>

          <Button variant="primary" type="submit" block>
            Login
          </Button>
        </Form>
        <Link to="SignUp">SignUp</Link>
        <ToastContainer />
      </Container>

    </div>
  );
};

export default Login;
