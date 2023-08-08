import React, { useState } from "react"; 
import "./destination.css"; 
const Destination = ({ updatePlanet, planets, vehicles, index }) => { 
  const [selected, setSelected] = useState({name: "Select", distance: 0}); 
  const [selectedVehicle, setSelectedVehicle] = useState({})
 
  const handleChange = (event) => { 
    const selectedValue = event.target.value; 
    const selectedIndex = event.target.options.selectedIndex-1;
    setSelected({name: selectedValue, distance:planets[selectedIndex].distance});
    updatePlanet(selectedValue); 
  }; 
 const handleSelection = (event) => {
  const selected = vehicles.find((vehicle) => vehicle.name === event.target.value);
  setSelectedVehicle(selected);
 }
  const name = `destination${index}`; 
  return ( 
    <div>
        <div className="destination-container"> 
        <label htmlFor={name}>Destination {index} </label> 
        <select 
          name={name} 
          id={name} 
          value={selected.name} 
          onChange={handleChange} 
        > 
          <option value={selected.name} disabled={selected.name !== "Select"}> 
            {selected.name} 
          </option> 
          {planets.map((planet, index) => ( 
            <option key={index} value={planet.name}> 
              {planet.name} 
            </option> 
          ))} 
        </select> 
      </div> 
      { selected.name!=="Select"?
       <div>
       <fieldset>
         <legend>Select a Vehicle:</legend>
         <form onChange={handleSelection}>
           {vehicles.map( (vehicle, index) => {
               return (
                 <div key={index}>
                     <input type="radio" id={vehicle.name} name={selected.name} value={selectedVehicle.name ? selectedVehicle.name : vehicle.name} />
                     <label htmlFor={vehicle.name}>{vehicle.name}({vehicle.total_no})</label><br></br>
                 </div>
               )
           })}
         </form>
       </fieldset>
       </div>: <></>
       }
    </div>
    
  ); 
}; 
 
export default Destination;