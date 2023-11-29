import FlightSearch from './components/flight-search';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import FlightSearchResult from './components/flight-search-result';
import AirLine from './components/airline';
import Airport from './components/airport';

function App() {
  return (
    <div className='container'>
      <Link to="flight-search"></Link>
<div class="row">
      <div class="col-2 left-section">
          <AirLine></AirLine>
      </div>
      
      <div class="col-8 main-section">
      <Routes>
        <Route path='/' element={<FlightSearch/>}></Route>
        <Route path="/flight-search-result" element={<FlightSearchResult/>}></Route>
      </Routes>
      </div>

      <div class="col-2 right-section">
          <Airport></Airport>
      </div>

</div>  
    


    
    </div>
  );
}

export default App;
