import { useEffect, useState } from "react";
import '../App.css';
import data from '../jsondata/flights.json';
import { useNavigate } from "react-router-dom";

function FlightSearch() {
let [info,setInfo]=useState("")
let [msg,setMessage]=useState("");
let [flight,setFlight]=useState({});  
let [flights,setFlights]=useState([]);
let navigate = useNavigate();
useEffect(()=> {
    setFlights(data.flights);
    let j=0;
    setInterval(()=> {
        let result = "Airline :"+data.flights[j].airline+" "+"From :"+data.flights[j].origin+" "+" To :"+data.flights[j].destination+" Date :"+data.flights[j].flightDate;
        setInfo(result);
        j++;
        if(j==89){
          j=0;
        }
    },5000);
},[])

const searchFlight = (event)=> {
    event.preventDefault();
    console.log(flight);

  let searchedFlights = flights.filter(ff=>ff.origin==flight.fromCity && ff.destination==ff.destination && ff.flightDate==flight.departingDate)

    sessionStorage.setItem("flight-data",JSON.stringify(searchedFlights));
    sessionStorage.setItem("customer-info",JSON.stringify(flight));
    navigate("flight-search-result");
}
return(
        <div>
            <h2 style={{"marginLeft":"300px"}}>Flight Search</h2>
            <div id="booking" className="section">
    <div id="flightstatus" style={{"color":"orchid"}}>{info}</div>
   
    <div className="section-center">
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-md-offset-1">
                    <div className="booking-form">
                        <form>
                            <div className="form-group">
                                <div className="form-checkbox">
                                 
                                    <label for="one-way">
                                        <input type="radio" id="one-way" name="flighttype" value="oneway"/>
                                    </label>
                                    <span id="one-way-id">One way</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Flying from</span>
                                        
                                        <input className="form-control" type="text" 
                                        placeholder="City or airport" 
                                        name="fromCity"
                                        onChange={(e)=>setFlight(obj=> {
                                            return {...obj,fromCity:e.target.value}
                                        })}
                                        />
                                        
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Flyning to</span>
                                        <input className="form-control" type="text" placeholder="City or airport" 
                                        name="toCity" 
                                        onChange={(e)=>setFlight(obj=> {
                                            return {...obj,toCity:e.target.value}
                                        })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Departing</span>
                                        <input className="form-control" type="date" required 
                                        name="departingDate" 
                                        onChange={(e)=>setFlight(obj=> {
                                            return {...obj,departingDate:e.target.value}
                                        })}
                                        id="datepicker"/>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <span className="form-label">Adults (18+)</span>
                                        <select className="form-control" name="adults"
                                        onChange={(e)=>setFlight(obj=> {
                                            return {...obj,adults:e.target.value}
                                        })}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                        <span className="select-arrow"></span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <span className="form-label">Children (0-17)</span>
                                        <select className="form-control" name="children"
                                        onChange={(e)=>setFlight(obj=> {
                                            return {...obj,children:e.target.value}
                                        })}
                                        >
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                        <span className="select-arrow"></span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <span className="form-label">Travel class</span>
                                        <select className="form-control" name="travelClass"
                                         onChange={(e)=>setFlight(obj=> {
                                            return {...obj,travelClass:e.target.value}
                                        })}
                                        >
                                            <option value="economy class">Economy class</option>
                                            <option value="business class">Business class</option>
                                            <option value="first class">First class</option>
                                        </select>
                                        <span className="select-arrow"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-btn">
                                <button className="submit-btn" onClick={searchFlight}>Show flights</button>
                            </div>
                        </form>
                        <span style={{"color":"red"}}>{msg}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
    )

}


export default FlightSearch;