import React,{useState} from 'react' 
import "./destination.css" 
 
const Destination = ({updatePlanet, planets, index}) => { 
    const [selected , setSelected] = useState("none") 
 
    const handleClick = (event)=>{ 
        setSelected(event.target.value); 
        updatePlanet(event.target.value);
    } 
 
    // const handleChange = (event) =>{ 
    //     console.log("handleChange"); 
    //     const selectedIndex = event.target.options.selectedIndex; 
         
    // } 
    const name = `destinaion${index}`; 
  return ( 
    <div className='destination-container'> 
        <label htmlFor={name}>Destination {index} </label> 
        <select name={selected} id={name}  defaultValue="none" > 
        <option value={selected} disabled>Select</option> 
            { 
            planets.map((planet, index) => ( 
                <option key={index} name={index} value={planet.name} onClick={(event)=>handleClick(event)} >{planet.name}</option> 
            )) 
            } 
        </select> 
    </div> 
  ) 
} 
 
export default Destination