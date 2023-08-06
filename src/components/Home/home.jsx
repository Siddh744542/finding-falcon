import React, { useEffect, useState } from 'react';
import "./home.css";

const Home = () => {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanets, setSelectedPlanets] = useState([]);

  useEffect(()=>{
    fetch('https://findfalcone.geektrust.com/planets')
      .then(response => response.json())
      .then(data=> {setPlanets(data)})
      .catch(error => console.error(error));
  },[]);
  
  useEffect(() => {
    if (planets.length > 0) {
      setSelectedPlanets([planets[0]]);
    }
  }, [planets]);

  const updatePlanet = () => {
    const result = planets?.filter((planet) => {
      return !selectedPlanets?.includes(planet);
    });
    return result || [];
  };

  const handleChange = (event) =>{
    console.log("humko tumse ho gya hai pyar kya kare bolo to jiye bolo to mar jayeye");
    console.log(event.target.value);
  }
  return (
    <div>
        <h1 className='heading'>
          Finding Falcon!
        </h1>
        <div>
          <p className='subheading'>
            Select Planets you want to search in:
          </p>
          <div className='container'>
            <div className='destination-container'>
            <label htmlFor="destination1">Destination 1 </label>
              <select name='destination1' id='destination1' onChange={(e)=>{handleChange(e)}} defaultValue="none">
              <option value="none" disabled>Select</option>
                  {
                    updatePlanet().map((planet, index) => (
                      <option key={index} value={planet.name}>{planet.name}</option>
                    ))
                  }
              </select>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default Home;