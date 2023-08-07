import React,{useState} from 'react' 
import "./destination.css" 
 
const Destination = ({updatePlanet, planets, index}) => { 
    const [selected , setSelected] = useState("none");
 
    const handleChange = (event) => {
        console.log("handle click called");
        const selectedValue = event.target.value;
        setSelected(selectedValue);
        updatePlanet(selectedValue);
    }
 
    const name = `destinaion${index}`; 
  return ( 
    <div className='destination-container'> 
        <label htmlFor={name}>Destination {index} </label> 
        <select name={selected} id={name}  defaultValue="none" > 
        <option value="none" disabled>Select</option> 
            { 
            planets.map((planet, index) => ( 
                <option key={index} name={index} value={planet.name} onChange={handleChange} >{planet.name}</option> 
            )) 
            } 
        </select> 
    </div> 
  ) 
} 
 
export default Destination