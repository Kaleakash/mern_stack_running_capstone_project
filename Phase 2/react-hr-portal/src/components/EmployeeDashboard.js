import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal,Form } from 'react-bootstrap';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
const EmployeeDashboard = () => {
  let navigate = useNavigate();
  const [leaveReason, setLeaveReason] = useState('');
  const [employeeDetails,setEmployeeDetails] = useState({
    // id: 1,
    // name: 'John Doe',
    // department: 'HR',
    // email: 'john@example.com',
    // Add more details as needed
  });
  const [showModal, setShowModal] = useState(false);
  const [showLeaveModel,setLeaveModel]=useState(false);
  
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowLeaveModal = () => {
    setLeaveModel(true);
  };

  const handleCloseLeaveModal = () => {
    setLeaveModel(false);
  };



  useEffect(()=> {
    const loadEmployeeInfo=async ()=> {
        let obj = sessionStorage.getItem("userInfo");
        if(obj!=null){
          let employeeInfo = await axios.get("http://localhost:3000/employees");
          let result = employeeInfo.data.find(e=>e.email==obj);
          console.log(result)
          setEmployeeDetails(result);
        }
    }
    loadEmployeeInfo();
  },[employeeDetails]);

  const handleApplyLeave = async () => {
    // Logic to submit leave application
    console.log('Leave applied with reason:', leaveReason);
    // Add logic to send leave request to HR system or API
    console.log(employeeDetails)
    let updateEmployee = {...employeeDetails};
    updateEmployee.reason = leaveReason;
    updateEmployee.leaveApplied=true;
    updateEmployee.status="Pending";
    let result = await axios.put(`http://localhost:3000/employees/${updateEmployee.id}`,updateEmployee);
    if(result){
      setLeaveReason("");
      setEmployeeDetails(result);
      toast.success("Leave Applied Successfully!")
    }

  };
  const handleLogout = ()=> {
    navigate("/");
} 


  return (
    <div style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?office,workspace')`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}> 
    <Container className="d-flex flex-column h-100">
    
    <Col>
    <Row className="mb-3">
        <Col className="text-end">
          <Button variant="link" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Button>
        </Col>
      </Row>

      <h1 className="text-center mb-4" style={{"color":"red"}}>Employee Dashboard</h1>
      
      <Row className="flex-grow-1 align-items-start">
        <Col md={4} >
          <Card>
            <Card.Body>
              <Card.Title>Welcome User </Card.Title>
              <Card.Text>
                <strong>{employeeDetails.name}</strong> 
              </Card.Text>
              <Button variant="primary" onClick={handleShowModal}>
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>


        <Col md={4} >
          <Card>
            <Card.Body>
              {/* <Card.Title>Welcome User </Card.Title> */}
              <Card.Text>
                <strong>{employeeDetails.name} View your leave details!</strong> 
              </Card.Text>
              <Button variant="primary" onClick={handleShowLeaveModal}>
                View Leave Status
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Apply for Leave</Card.Title>
              <Form>
                <Form.Group controlId="leaveReason">
                  <Form.Label>Reason for Leave</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleApplyLeave}>
                  Apply Leave
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      </Col>


      <Row>
      
      <Col>
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <strong>Frst Name:</strong> {employeeDetails.name}<br />
                <strong>Last Name:</strong> {employeeDetails.lName}<br/>
                <strong>Gender:</strong> {employeeDetails.gender}<br/>
                <strong>Phone Number:</strong> {employeeDetails.phoneNumber}<br/>
                <strong>Department:</strong> {employeeDetails.department}<br/>
                <strong>Email:</strong> {employeeDetails.email}<br/>
                <strong>Address:</strong> {employeeDetails.address}<br />
        </Modal.Body>
        <Button variant="primary" onClick={handleCloseModal}>
                Close
       </Button>
      </Modal>
        </Col>

        <Col>
        <Modal show={showLeaveModel} onHide={handleCloseLeaveModal}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
          <div>
            <p>Reason : {employeeDetails.reason}</p>
            <strong>Leave : {employeeDetails.status}</strong>
          </div>
         }
        </Modal.Body>
        <Button variant="primary" onClick={handleCloseLeaveModal}>
                Close
       </Button>
      </Modal>
        </Col>

        
      </Row>
      <ToastContainer />
    </Container>
    </div>
  );
  
};

export default EmployeeDashboard;
