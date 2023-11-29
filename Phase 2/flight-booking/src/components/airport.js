import { useState } from "react";
import { AirportModel } from "../model/AirportModel";

function Airport() {
    let [airportData,setAirportData]=useState([
        new AirportModel("MAD","Madrid"),
        new AirportModel("BCN","Barcelona"),
        new AirportModel("LHR","London"),
        new AirportModel("CDG","Paris"),
        new AirportModel("FRA","Frakfurt"),
        new AirportModel("IST","Istanbul"),
        new AirportModel("AMS","Amsterdam"),
        new AirportModel("FCO","Rome"),
        new AirportModel("CPH","Copenhagen")
      ])

    return(
        

    <div className="left-section">
        <table className="table table-bordered border-dark">
        <tr>
            <th>IATA Code</th>
            <th>City</th>
        </tr>
        {airportData.map(airport=>
        <tr>
            <td>{airport.IATAcode}</td>
            <td>{airport.city}</td>
        </tr>    
        )}
        
    </table>
    </div>
    )

}


export default Airport;