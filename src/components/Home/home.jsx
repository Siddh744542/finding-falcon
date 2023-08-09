import React, { useEffect, useContext } from 'react';
import Destination from '../Destination/Destination';
import Header from "../Header"
import "./home.css";
import { useNavigate } from 'react-router-dom';
import {DataContext} from  "../../context/dataProvider";
const Home = () => {
  const navigate = useNavigate();
  const { setPlanets, setVehicles, selected, setSelected, timeTaken, setTimeTaken } = useContext(DataContext);

  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchData('https://findfalcone.geektrust.com/planets', setPlanets);
    fetchData('https://findfalcone.geektrust.com/vehicles', setVehicles);
    
    // Get Token 
    fetch("https://findfalcone.geektrust.com/token", {
      method: "POST",
      cache: "default",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body:"",
    })
      .then((response) => response.json())
      .then((data)=> {
        setSelected({ ...selected, token: data.token })
      })
      .catch(error => console.error(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
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
        navigate(`/success/${data.planet_name}/${timeTaken}`);
      } else{
        navigate(`/failure/${timeTaken}`);
      }
      setTimeTaken(0);
      console.log(data);
    })
    .catch(error => console.error(error));
  }

  return (
    <div>
        <Header/>
        <div>
          <p className='subheading'>
            Select Planets you want to search in:
          </p>
          <div className='container'>
            <div className='sub-container'>
              <Destination index="1"/>
              <Destination index="2"/>
              <Destination index="3"/>
              <Destination index="4"/>
            </div>
            <div>
              <h2>Time Taken : {timeTaken}</h2>
            </div>
          </div>
          <button onClick={handleSubmit}>Find Falcon</button>
        </div>
    </div>
  )
}

export default Home;