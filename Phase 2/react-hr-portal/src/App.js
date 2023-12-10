
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HRDashboard from './components/HrDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import About from './components/About';
import { Card, Carousel, Jumbotron, Navbar, Nav } from 'react-bootstrap';
import ContactUs from './components/ContactUs';
import HrPolicyPage from './components/HrPolicyPage';
import EmployeePolicyPage from './components/EmployeePolicy';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=> {
    localStorage.removeItem("userID");
    console.log("called...")
  },[])


  const handleLogin = () => {
    // Perform login logic and set isLoggedIn to true upon successful login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic and set isLoggedIn to false
    setIsLoggedIn(false);
  };

  console.log(localStorage)
  return (
    <div className="App">
      
      <section className="navbar-section">
      { !isLoggedIn && (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <img src={require('./images/hr.jpg')} width="50px" height="50px"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Login</Nav.Link>
              <Nav.Link href="hrpolicy">HR Policy</Nav.Link>
              <Nav.Link href="employee-policy">Employee Policy</Nav.Link>
              <Nav.Link href="about">About</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        )}

      </section>



      <div>
        <Routes>
            <Route path="/" element={isLoggedIn ? <HRDashboard onLogout={handleLogout}/> : <Login onLogin={handleLogin}/>} />
            <Route path='about' element={<About/>}></Route>
            <Route path='contact' element={<ContactUs/>}></Route>
            <Route path='hrpolicy' element={<HrPolicyPage/>}></Route>
            <Route path='employee-policy' element={<EmployeePolicyPage/>}></Route>
            <Route path='SignUp' element={<SignUp/>}></Route>
            <Route path='HrDashboard' element={<HRDashboard onLogout={handleLogout}/>}></Route>
            <Route path='SignUp' element={<SignUp/>}></Route>
            <Route path='EmployeeDashboard' element={<EmployeeDashboard onLogout={handleLogout}/>}></Route>
            

        </Routes>
      </div>
    </div>
  );
}

export default App;
