
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HRDashboard from './components/HrDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';

function App() {
  return (
    <div className="App">
      



      <div>
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/SignUp' element={<SignUp/>}></Route>
            <Route path='/HrDashboard' element={<HRDashboard/>}></Route>
            <Route path='/SignUp' element={<SignUp/>}></Route>
            <Route path='/EmployeeDashboard' element={<EmployeeDashboard/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
