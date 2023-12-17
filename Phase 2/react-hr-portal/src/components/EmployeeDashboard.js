import axios from 'axios';
import '../App.css';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav,Container, Row, Col, Card, Button, Modal,Form } from 'react-bootstrap';
import "react-toastify/dist/ReactToastify.css";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
const EmployeeDashboard = ({onLogout}) => {
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
  const [showLeaveModelPolicy,setLeaveModelPolicy]=useState(false);
  const [leaveButton,setLeaveButton]=useState(true);
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

  const handleShowLeaveModalPolicy1 = () => {
    setLeaveModelPolicy(true);
  };

  const handleCloseLeaveModalPolicy1 = () => {
    setLeaveModelPolicy(false);
  };

  useEffect(()=> {
    const loadEmployeeInfo=async ()=> {
        let obj = sessionStorage.getItem("userInfo");
        if(obj!=null){
          let employeeInfo = await axios.get("http://localhost:3000/employees");
          let result = employeeInfo.data.find(e=>e.email==obj);

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
    onLogout();
    navigate("/");

} 

const handleShowLeaveModalPolicy= (event)=> {

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
      <Row className="flex-grow-1 align-items-start">
        <Col md={3} >
          <div>
          <Card className="card-container">
            <Card.Body className="expandable-card">
              <Card.Title>Welcome User {employeeDetails.name}</Card.Title>
              <Button variant="primary" onClick={handleShowModal}>
                View Details
              </Button>
            </Card.Body>
          </Card>
          </div>
        </Col>


        <Col md={3} >
          <Card>
            <Card.Body>
              <Card.Title>{employeeDetails.name} View your leave details!</Card.Title>
              <Card.Text>
                <strong></strong> 
              </Card.Text>
              <Button variant="primary" onClick={handleShowLeaveModal}>
                View Leave Status
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} >
          <Card>
            <Card.Body>
              <Card.Title>{employeeDetails.name} View your leave details!</Card.Title>
              <Card.Text>
                <strong></strong> 
              </Card.Text>
              <Button variant="primary" onClick={handleShowLeaveModalPolicy1}>
                View Leave Status
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Apply for Leave</Card.Title>
              <Form>
                <Form.Group controlId="leaveReason">
                  <Form.Control
                    as="textarea"
                    rows={1}
                    value={leaveReason}
                    onChange={(e) => {setLeaveReason(e.target.value); setLeaveButton(false)}}
                    placeholder='Reason for leave'
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleApplyLeave} disabled={leaveButton}>
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
        <Modal show={showLeaveModelPolicy} onHide={handleCloseLeaveModalPolicy1}>
        <Modal.Header closeButton>
          <Modal.Title>Leave Policy Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        1. Leave cannot be claimed as a matter of right.<br />
        2. The calendar year for leave is from January to December.<br/>
        3. Leaves will be credited to employees account in the beginning of calendar year <br/>
        4. Employees will be eligible for Earned Leave only after completion of probationary period. <br/>
        5. It is mandatory for an employee to utilize 18 leaves during an year. <br/>
        6. A Maximum of 9 earned leave can be carried forward to next year.<br/>
        7. Leave without approval will be considered as leave without pay.<br />
        8. Leave for the purpose of LTA should be earned leave. It cannot be casual<br/>
        </Modal.Body>
        <Button variant="primary" onClick={handleCloseLeaveModalPolicy1}>
                Close
       </Button>
      </Modal>
        </Col>


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
