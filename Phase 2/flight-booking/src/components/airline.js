import { useState } from "react";
import { AirlineModel } from "../model/AirlineModel";

function AirLine() {
    
    let [airlineData,setAirlineData]=useState([
        new AirlineModel("IB","Iberia",10),
        new AirlineModel("BA","British Airways",15),
        new AirlineModel("LH","Lufthansa",7),
        new AirlineModel("FR","Ryanair",20),
        new AirlineModel("VY","Vueling",10),
        new AirlineModel("TK","Turkish Airlines",5),
        new AirlineModel("U2","Easyjet",19.90),
        ])

    return(
    <div className="right-section">
        <table className="table table-bordered border-dark table-striped">
        <tr>
            <th>IATA Code</th>
            <th>Name</th>
            <th>Price</th>
        </tr>
        {airlineData.map(airline=> 
            <tr>
            <td>{airline.IATAcode}</td>
            <td>{airline.name}</td>
            <td>{airline.price}</td>
        </tr>
        )}
        </table>
    </div>


    )

}


export default AirLine;