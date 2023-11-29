import { useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function FlightSearchResult() {
let pnrNumber = Math.random().toString(36).slice(2);
let [flight_data,setFlight_Data]=useState([]);
let [customer_info,setCutomerInfo]=useState("");
let [flight,setFlight]=useState();
let [flag1,setFlag]=useState(0);
let [customerInfoForm,setCutomerInfoForm]=useState({});
let [bookingFlag,setBookingFlag]=useState(false);
let [bookingResult,setBookingResult]=useState("");

let date = new Date();
let bookingDate  = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()+" [ "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"]";

let [customer,setCustomer]=useState({});





let adultsData =["FirstPerson","SecondPerson","ThirdPerson"]
let childrenData=["FirstChild","SecondChild"]

let airportData=new Map();
let flightClass=new Map();

flightClass.set("economy class",10);
flightClass.set("business class",25);
flightClass.set("first class",40);

airportData.set("MAD","Madrid");
airportData.set("BCN","Barcelona");
airportData.set("LHR","London");
airportData.set("CDG","Paris");
airportData.set("FRA","Frakfurt");
airportData.set("IST","Istanbul");
airportData.set("AMS","Amsterdam");
airportData.set("FCO","Rome");
airportData.set("CPH","Copenhagen");


let flight_data_local_var = sessionStorage.getItem("flight-data");
let customer_info_local_var = sessionStorage.getItem("customer-info");
console.log(flight_data_local_var);
console.log(customer_info_local_var);

if(flight_data_local_var!=null){
    flight_data=JSON.parse(flight_data_local_var);
}
if(customer_info_local_var!=null){
    customer_info=JSON.parse(customer_info_local_var);
}

let bookTicket = (event,flight)=> {
    
    console.log(flight);
    setFlight(flight);
    setFlag(1);
    console.log(customer_info);
    console.log(customer_info.adults);

}
const handleCustomerInfo = (event)=> {
    let name = event.target.name;
    let value = event.target.value;
    console.log(name+" "+value);
    setCustomer(cust=> {
        return {...cust,[name]:value}
    });
}
const viewTicket = (event)=> {
    setFlag(3);
    setBookingFlag(true);
}

const confirmBooking = (event)=> {
    event.preventDefault();
    alert("confirmed booking");
    console.log(customer);
    
    setFlag(2);

}

const downloadTicket= (event)=> {

    let DATA=  document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 90;
      let fileHeight = 300;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(pnrNumber);
    });
}
    return(
        <div class="container">
             <div class="row">
             <div>
                {
                flag1==0
                    ?
                    <div>
                        {
                            flight_data.length==0?<h2>No Flights Avaiable</h2>  :<div></div>
                        }
                        {
                            flight_data.length > 0?
                            <div>
                            
                            <div class="col-12" style={{"text-align": "center"}}>
                                <h2>Searched Flight Details</h2>
                            </div>

                            <div id="searchedFlight">
                                {
                                
                                flight_data.map(flight=> 
                               <div>
                        Airline 
                        <span style={{"color":"tomato"}}>{flight.airline}</span> 
                        Date of Journey <span style={{"color":"tomato"}}>{flight.flightDate} </span>
                        Base Price <span style={{"color":"tomato"}}>{flight.price}</span>
                        <input type="button" value="book ticket" class="btn btn-link" 
                        onClick={(event)=>bookTicket(event,flight)} style={{"text-decoration": "none"}}/>
                            </div>
                            
                            )
                            
                            }
                            </div>

                             </div>   
                            :
                            
                            <div></div>
                        }
        <Link to="/" style={{"text-decoration": "none","text-align": "25pt"}}>Search Once again</Link>
                    </div>
                    :
                    <div></div>
                }
        
  
                
                <div className="section-center">
                    {flag1==1?
                    <div class="row" className="booking-form">
                    <h2>Fill Customer Details</h2>
                    <div className="col-md-12 col-md-offset-1">
                    <div>
                    <form onSubmit={confirmBooking}>
                   {new Array(eval(customer_info.adults)).fill().map((e,i)=>
                   
                   <div className="col-md-5">
                     
                    <div className="form-group">
                    <span className="form-label">{adultsData[i]}</span>
                    <input type="text" name={adultsData[i]} placeholder="Adult" 
                    className="form-control"
                    onChange={handleCustomerInfo}
                    />
                    </div>
                   </div>
                   )}

                {new Array(eval(customer_info.children)).fill().map((e,i)=>
                   
                   <div className="col-md-5">
                    <div className="form-group">
                    
                    <span className="form-label">{childrenData[i]}</span>
                    <input type="text" name={childrenData[i]} placeholder="Children"
                    className="form-control"
                    onChange={handleCustomerInfo}
                    />
                    
                    </div>
                   </div>
                   )}  

                <div className="col-md-6">
                    <div className="form-group">
                      <input type="submit" value="submit" className="btn btn-outline-primary"/>
                      <input type="reset" value="reset" className="btn btn-outline-info"/>
                </div>
                </div>    

                    </form>
                  </div>
                  </div>      

                    </div>
                    
                    :
                    
                    <div></div>
                    
                    }
                </div>
             
            </div>   

        </div>  

                <div className="section-center">
                    {flag1==2?
                        <div style={{"color":"tomato","font-size": "30pt",
                        "text-align": "center"}}>
                            Your Ticket booked successfully
                        <br/>
                        <input type="button" value="view ticket" className="btn btn-link" 
                        onClick={viewTicket} style={{"text-decoration": "none","font-size": "25pt"}}/> 
                      </div>
                    :
                        <div>

                        </div>
                    }


                </div>


                <div className="section-center">
                    <div className="container">
                        <div>
                            {
                                bookingFlag?
           <div>

            <div className="row">
            <div className="col-md-4 text-right">
                <button class="btn btn-success btn-block" onClick={downloadTicket}>Download Ticket</button>
             </div>
             <div className="col-md-4 text-left offset-4">
             <Link to="/" style={{"text-decoration": "none","text-align": "25pt"}}>Book Another Ticket</Link>
             </div>
                
                <div className="col-md-12 col-md-offset-1"  id="htmlData">
                    <div className="booking-form">
                    <div>
                    <h2 style={{"text-align": "center"}}>Plane Ticket Purchase</h2>
                    <hr color="orange"/>
                    <h5>PNR Number : {pnrNumber.toUpperCase()}</h5>
                    <h4>Booking Date</h4>
                     <span style={{"color":"orange"}}>{bookingDate}</span>
                    <h4>Guest Name</h4>
                    {/* {customer.map(e=>e)} */}
                    {
                    
                    Object.entries(customer).map(([key, value])=>
                    <table cellPadding={5}>
                        <tr style={{"color":"orange"}}>
                            <td>{key} : </td>
                            <td><b>{value}</b></td>
                        </tr>
                    </table>
                    )
                    }
                    <hr/>
                    <h2>Flight Details</h2>
                    <h4>Route</h4>
                    <span>
                      <table className="table">
                          <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Airline</th>
                            <th>Departure Date</th>
                            <th>Travel Class</th>
                          </tr>
                          <tr>
                            <td>{airportData.get(customer_info.fromCity)}</td>
                            <td>{airportData.get(customer_info.toCity)}</td>
                            <td>{flight.airline}</td>
                            <td>{customer_info.departingDate}</td>
                            <td>{customer_info.travelClass}</td>
                          </tr>
                      </table>
                    </span>
                    <hr/>
                    <h4>Fare Breakdown</h4>
                    <div>
                        <table className="table">
                            <tr>
                                <th>Base Fare</th>
                                <th>${flight.price}</th>
                            </tr>
                            <tr>
                                <th>Passenger Service Charge</th>
                                <th>$10</th>
                            </tr>
                            <tr>
                                <th>Surcharge</th>
                                <th>$80</th>
                            </tr>
                            <tr>
                                <th>Fuel/Insurance</th>
                                <th>$30</th>
                            </tr>
                            <tr>
                                <th>Ticket Service Charge </th>
                                <th>$5</th>
                            </tr>
                            <tr>
                                <th colSpan="2">----------------------------------------------------------------------------------</th>
                            </tr>
                            <tr>
                                <th>Final Amount</th>
                                <th>${(eval(flight.price) + 10 + 80 + 30 + 5) + (flightClass.get(customer_info.travelClass)/100*eval(flight.price))} </th>
                            </tr>
                            <tr>
                                <th colSpan="2">----------------------------------------------------------------------------------</th>
                            </tr>
                        </table>
                    </div>  
                    <h2>Important information</h2> 
  <p>Passengers are required to bring this itinerary/receipts along with an Official ID with proto issued by the government or know corporation upon entering the terminal</p>
  
  <p>The airline may contact the card holder or the passenger for verification of their payment, and in case the airline suspects or has a reason to believe that the ticket(s) purchased were made fraudulently, the airline may cancel the reservation made by the passenger. </p>
  <p>Passenger are recommended to check in two hours before the scheduled departure time to prevent cancellation of passenger reservation. The airline shall not be liable to loss or damages due to passenger’s failure to comply with the provisions above if without fault by the airline.</p> 
                 <h2>Plane Ticket Purchase</h2>
                 <h2>Privacy policy </h2>
                 <p>https://www.myairline.com/privacyplicy</p>
                 <h2>Terms and Conditions</h2>
                 <p>https://www.myairline.com/mytermandconditions</p>
                 <h2>Restricted items or Gods</h2>
                 <p>We reserve the right to confiscate any item or gods brough by the passenger which we belive might bring harm or threat to our guest, including the following</p>
                 <ol>
                  <li>Pointed or sharp objects</li>
                  <li>Firearms and Ammunition</li>
                  <li>Exposives and flammable substances</li>
                  <li>Toys represents dangerous objects such as toy guns and knives</li>
                  <li>Aerosols</li>
                  <li>Any other items which may be considered security hazards by law</li>
                 </ol>     
                 <hr/>
                 <span>THANK YOU FOR MAKING US YOUR AIRLINE OF CHOICE! HAVE A SAFE FLIGHT</span>
                </div>
                </div>
                </div>
                </div>
                </div>
                                :
                                <div>


                                </div>    

                            }
                        </div>
                    </div>
                </div>        



        </div>    
    )

}


export default FlightSearchResult;