import React, { useEffect, useState } from 'react';
import Destination from '../Destination/Destination';
import "./home.css";

const Home = () => {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  useEffect(()=>{
    fetch('https://findfalcone.geektrust.com/planets')
      .then(response => response.json())
      .then(data=> {setPlanets(data)})
      .catch(error => console.error(error));
    fetch('https://findfalcone.geektrust.com/vehicles')
      .then(response => response.json())
      .then(data=> {setVehicles(data)})
      .catch(error => console.error(error));
  },[]);
  
  function updatePlanet(selectedPlanet) {
    const updated = planets.filter(planet => planet.name !== selectedPlanet);
    setPlanets(updated);
  }
  function updateVehicle(selectedVehicle) {
    const index = vehicles.findIndex((vehicle)=> vehicle.name === selectedVehicle.name);
    let updated = [...vehicles];
    updated[index].total_no = updated[index].total_no-1;
    setVehicles(updated);
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
            <Destination updatePlanet={updatePlanet} planets={planets} vehicles={vehicles} updateVehicle={updateVehicle} index="1"/>
            <Destination updatePlanet={updatePlanet} planets={planets} vehicles={vehicles} updateVehicle={updateVehicle} index="2"/>
            <Destination updatePlanet={updatePlanet} planets={planets} vehicles={vehicles} updateVehicle={updateVehicle} index="3"/>
            <Destination updatePlanet={updatePlanet} planets={planets} vehicles={vehicles} updateVehicle={updateVehicle} index="4"/>
          </div>
        </div>
    </div>
  )
}

export default Home;