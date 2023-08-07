import React, { useState } from "react"; 
import "./destination.css"; 
 
const Destination = ({ updatePlanet, planets, index }) => { 
  const [selected, setSelected] = useState("Select"); 
 
  const handleChange = (event) => { 
    console.log("handle change called with value =", event.target.value); 
    const selectedValue = event.target.value; 
    setSelected(selectedValue); 
    updatePlanet(selectedValue); 
    console.log( 
      selected, 
      " is the value in selected and selected value is ", 
      selectedValue 
    ); 
  }; 
 
  const name = `destination${index}`; 
  return ( 
    <div className="destination-container"> 
      <label htmlFor={name}>Destination {index} </label> 
      <select 
        name={selected} 
        id={name} 
        value={selected} 
        onChange={handleChange} 
      > 
        <option value={selected} disabled={selected !== "Select"}> 
          {selected} 
        </option> 
        {planets.map((planet, index) => ( 
          <option key={index} value={planet.name}> 
            {planet.name} 
          </option> 
        ))} 
      </select> 
    </div> 
  ); 
}; 
 
export default Destination;