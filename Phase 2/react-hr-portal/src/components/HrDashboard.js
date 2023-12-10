import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, fetchEmployee,removeEmployee } from '../slice/emloyeeSlice';

const HRDashboard = ({onLogout}) => {
  const [employees, setEmployees] = useState([]);
  const [storedResult,setStoredResult]=useState(false);
  const [deleteResult,setDeleteResult]=useState(false);
  let allEmployees = useSelector(gs=>gs.employeeKey);
  let dispatch = useDispatch();
  useEffect(()=> {
    localStorage.setItem('userID',false);
    console.log(localStorage)
    const loadEmployees=async()=> {
      //let result = await axios.get("http://localhost:3000/employees")
      //setEmployees(result.data);
      dispatch(fetchEmployee());
      console.log(allEmployees.employeeList);
      setEmployees(allEmployees.employeeList);
    }
    loadEmployees();
    setStoredResult(false);
    setDeleteResult(false);
    console.log("called...useEffect")
  },[storedResult,deleteResult])
  const navigate = useNavigate();
  
  const [leaveRequestStatus,setLeaveRequestsStatus]=useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', department: '', email: '',leaveApplied:false });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showLeaveModal,setLeaveModal]=useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleLeaveShow= ()=> setLeaveModal(true);
  const handleLeaveClose = () =>setLeaveModal(false);
  const [empid,setEmpId]=useState();
  const [requestId,setRequestId]=useState(0);
  const [reason,setReason]=useState("");
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = async () => {
    const id = employees.length + 1;
    //let result = await axios.post("http://localhost:3000/employees",newEmployee);
    let result = await dispatch(addEmployee(newEmployee));
    console.log(result.meta.requestStatus);
    if(result.meta.requestStatus=="fulfilled"){
      //setStoredResult(res=>{res:true});
      setStoredResult(true);
    }
    //setEmployees([...employees, { ...newEmployee, id }]);
    setNewEmployee({ name: '', department: '', email: '',leaveApplied:false});
    handleClose();
  };

// 

  const handleLeaveRequest = (employeeId) => {
    let findEmployee = employees.find(e=>e.id==employeeId);
    console.log(findEmployee.reason);  
    const leaveRequest = {
      id: Math.floor(Math.random() * 1000),
      employeeId,
      date: new Date().toLocaleDateString(),
      status: 'Pending',
      reason:findEmployee.reason
    };
    console.log(employees);
    setEmpId(employeeId);
    setRequestId(leaveRequest.id);
    setReason(findEmployee.reason);
    setLeaveRequests([...leaveRequests, leaveRequest]);
    console.log(`Leave request for employee ID ${employeeId}`);
    setLeaveModal(true);
    setStoredResult(true);
  };


  const removeEmployee = async (id)=> {
    console.log(id);
    let result = await axios.delete("http://localhost:3000/employees/"+id);
    //let result = await dispatch(removeEmployee(id));
    //console.log(result.meta.requestStatus)
    if(result){
      setDeleteResult(true);
    }
    //setEmployees([...employees, { ...newEmployee, id }]);
    setNewEmployee({ name: '', department: '', email: '',leaveApplied:false});
  }
  const handleApproveLeave = async (requestId,empid) => {
    const updatedRequests = leaveRequests.map((request) =>
      request.id === requestId ? { ...request, status: 'Approved' } : request
    );
    setLeaveRequests(updatedRequests);
    setSelectedRequest(null);
    console.log(`Leave request with ID ${requestId} has been approved.`);
    handleLeaveClose();
    setLeaveRequestsStatus(true);
    let employeeInfo = employees.find(e=>e.id==empid);
    if(employeeInfo!=undefined){
      console.log(employeeInfo)
      employeeInfo.leaveApplied=false;
      employeeInfo.status = "Approved";
      setStoredResult(true);
      let result = await axios.put(`http://localhost:3000/employees/${employeeInfo.id}`,employeeInfo);
      if(result){
        //toast.success("Leave Approved !")
      }
    }

  };


  const handleLogoutInfo = ()=> {
    onLogout();  
    //localStorage.removeItem('userID')
      navigate("/");
  } 
  const handleRejectLeave = async (requestId,empid) => {
    const updatedRequests = leaveRequests.map((request) =>
      request.id === requestId ? { ...request, status: 'Rejected' } : request
    );
    setLeaveRequests(updatedRequests);
    setSelectedRequest(null);
    console.log(`Leave request with ID ${requestId} has been rejected.`);
    handleLeaveClose();
    setLeaveRequestsStatus(true);

    let employeeInfo = employees.find(e=>e.id==empid);
    if(employeeInfo!=undefined){
      console.log(employeeInfo)
      employeeInfo.leaveApplied=false;
      employeeInfo.status = "Rejected";
      setStoredResult(true);
      let result = await axios.put(`http://localhost:3000/employees/${employeeInfo.id}`,employeeInfo);
      if(result){
        //toast.success("Leave Rejected!")
      }
    }

  };  

  return (
    <div
      style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?office,workspace')`,
        backgroundSize: 'cover',
        height: '100vh',
        padding: '20px',
      }}
    >

      <Container className="d-flex flex-column h-100">

        
      <Row className="mb-3">
        <Col className="text-end">
        <h1 className="text-center mb-4" style={{"color":"red"}}>HR Dashboard</h1>
        </Col>

        <Col className="text-end">
          <Button variant="link" onClick={handleLogoutInfo}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Button>
        </Col>


      </Row>
        
        
        <Col md={3} className="mb-3">
            <Row className="flex-grow-1 align-items-start">
            <Card>
              <Card.Body>
                <Card.Title>Add New Employee</Card.Title>
                <Button variant="primary" onClick={handleShow}>
                  Add Employee
                </Button>
              </Card.Body>
            </Card>
            </Row>
          </Col>
          <hr style={{"color":"orangered"}}/>
        <Col>

        <Row>
          {employees.map((employee) => (
            <Col key={employee.id} md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{employee.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{employee.department}</Card.Subtitle>
                  <Card.Text>Email: {employee.email}</Card.Text>
                  {
employee.leaveApplied?<div><Button variant="primary" onClick={() => handleLeaveRequest(employee.id)}>
                    Manage Leave 
                  </Button>
                  <Button variant="primary" style={{"margin":"4px"}} onClick={() => removeEmployee(employee.id)}>Remove Employee</Button></div>
                  :<div><Button variant="primary" onClick={() => handleLeaveRequest(employee.id)} disabled={true}>
                    Manage Leave
                  </Button>
                  <Button variant="primary" style={{"margin":"4px"}} onClick={() => removeEmployee(employee.id)}>Remove Employee</Button>
                  </div>
                  }
                  
                </Card.Body>
              </Card>
            </Col>
          ))}

        </Row>


         <Row className="mt-4">
          <Col>
          
            <h3>Leave Requests</h3>
            <ListGroup>
              {leaveRequestStatus && leaveRequests.map((request) => (
                <ListGroup.Item key={request.id}>
                  Employee ID: {request.employeeId} - Status: {request.status}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        </Col>         
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h2>{}</h2>
            <Form.Group controlId="employeeName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={newEmployee.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="employeeDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department"
                name="department"
                value={newEmployee.department}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="employeeEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={newEmployee.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEmployee}>
            Save Employee
          </Button>
        </Modal.Footer>
      </Modal>

       { showLeaveModal &&         
      <Modal show={handleLeaveShow} onHide={handleLeaveClose}>
        <Modal.Header closeButton>
          <Modal.Title>Leave Approval for Employee {empid}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Reason : {reason}</strong>
          <p>Do you want to approve or reject leave for this employee?</p>
          <Button variant="success" onClick={()=>handleApproveLeave(requestId,empid)}>
            Approve
          </Button>
          <Button variant="danger" onClick={()=>handleRejectLeave(requestId,empid)}>
            Reject
          </Button>
        </Modal.Body>

      </Modal>
        }
    </div>
  );
};

export default HRDashboard;
