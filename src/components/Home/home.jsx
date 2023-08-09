import React, { useEffect, useState } from 'react';
import Destination from '../Destination/Destination';
import Header from "../Header"
import "./home.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState({token:"", planet_names:[], vehicle_names:[]});
  const [timeTaken, setTimeTaken] = useState(0);
  let navigate = useNavigate();
  useEffect(()=>{
    //Get Planet
    fetch('https://findfalcone.geektrust.com/planets')
      .then(response => response.json())
      .then(data=> {setPlanets(data)})
      .catch(error => console.error(error));
    
    // Get Vehicles
    fetch('https://findfalcone.geektrust.com/vehicles')
      .then(response => response.json())
      .then(data=> {setVehicles(data)})
      .catch(error => console.error(error));
    
    // Get Token 
    fetch("https://findfalcone.geektrust.com/token",{
      method: "POST",
      cache: "default",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body:""
    })
    .then(response => response.json())
    .then(data=> {setSelected({...selected, token: data.token})})
    .catch(error => console.error(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function updateSelectedValue(planet, vehicle){
    const updatedSelected = {
      ...selected,
      planet_names: [...selected.planet_names, planet],
      vehicle_names: [...selected.vehicle_names, vehicle],
    };
    setSelected(updatedSelected);
  }

  function handleSubmit(){
    console.log(selected);
    fetch("https://findfalcone.geektrust.com/find",{
      method: "POST",
      cache: "default",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body:JSON.stringify(selected),
    })
    .then(response => response.json())
    .then(data=> {
      if(data.status==="success"){
        navigate("/success");
      } else{
        navigate("/failure");
      }
      console.log(data);})
    .catch(error => console.error(error));
  }

  function addTime(time){
    setTimeTaken(timeTaken+time);
  }

  return (
    <div>
        <Header/>
        <div>
          <p className='subheading'>
            Select Planets you want to search in:
          </p>
          <div className='container'>
            <Destination updateSelectedValue={updateSelectedValue} updatePlanet={updatePlanet} addTime={addTime} planets={planets} vehicles={vehicles} updateVehicle={updateVehicle} index="1"/>
            <Destination updateSelectedValue={updateSelectedValue} updatePlanet={updatePlanet} addTime={addTime} planets={planets} vehicles={vehicles} updateVehicle={updateVehicle} index="2"/>
            <Destination updateSelectedValue={updateSelectedValue} updatePlanet={updatePlanet} addTime={addTime} planets={planets} vehicles={vehicles} updateVehicle={updateVehicle} index="3"/>
            <Destination updateSelectedValue={updateSelectedValue} updatePlanet={updatePlanet} addTime={addTime} planets={planets} vehicles={vehicles} updateVehicle={updateVehicle} index="4"/>
            <h2>Time Taken : {timeTaken}</h2>
          </div>
          <button onClick={handleSubmit}>Find Falcon</button>
        </div>
    </div>
  )
}

export default Home;