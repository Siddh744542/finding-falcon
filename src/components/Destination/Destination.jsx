import React from 'react'
import "./destination.css"

const Destination = ({updatePlanet, addSelectedPlanets, index}) => {
    
    const planets = updatePlanet();

    const handleChange = (event) =>{
        const selectedIndex = event.target.options.selectedIndex;
        addSelectedPlanets(selectedIndex-1);
    }
    const name = `destinaion${index}`;
  return (
    <div className='destination-container'>
        <label htmlFor={name}>Destination {index} </label>
        <select name={name} id={name} onChange={(e)=>{handleChange(e)}} defaultValue="none">
        <option value="none" disabled>Select</option>
            {
            planets.map((planet, index) => (
                <option key={index} name={index} value={planet.name}>{planet.name}</option>
            ))
            }
        </select>
    </div>
  )
}

export default Destination