import React, { useEffect, useState } from 'react';
import Destination from '../Destination/Destination';
import "./home.css";

const Home = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(()=>{
    fetch('https://findfalcone.geektrust.com/planets')
      .then(response => response.json())
      .then(data=> {setPlanets(data)})
      .catch(error => console.error(error));
  },[]);
  
  function updatePlanet({selectedPlanet}) {
    const updated = planets.filter(planet => planet.name !== selectedPlanet);
    setPlanets(updated);
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
            <Destination updatePlanet={updatePlanet} planets={planets} index="1"/>
            <Destination updatePlanet={updatePlanet} planets={planets} index="2"/>
            <Destination updatePlanet={updatePlanet} planets={planets} index="3"/>
            <Destination updatePlanet={updatePlanet} planets={planets} index="4"/>
          </div>
        </div>
    </div>
  )
}

export default Home;