import React, { useEffect, useContext } from 'react';
import Selection from '../Selection/Selection';
import Header from "../Header/Header"
import "./home.css";
import { useNavigate } from 'react-router-dom';
import {DataContext} from  "../../context/dataProvider";
const Home = () => {
  const navigate = useNavigate();
  const { setPlanets, setVehicles, selected, setSelected, timeTaken, setTimeTaken, isError, setIsError } = useContext(DataContext);

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
    if(selected.planet_names.length!==4){
      setIsError(true);
    } else {
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
  }

  return (
    <div>
        <Header/>
        <div>
          <p className='subheading'>
            Select Planets you want to search in:
          </p>
          {
            isError && (
              <div className='warning'>
                Please select 4 planets and 4 vehicles to find the Falcon
              </div>
            )
          }
          <div className='container'>
            <div className='sub-container'>
              <Selection index="1"/>
              <Selection index="2"/>
              <Selection index="3"/>
              <Selection index="4"/>
            </div>
            <div className='time-taken'>
              <h2>Time Taken : {timeTaken}</h2>
            </div>
          </div>
          <div className='button-box'>
            <button className='button' onClick={handleSubmit}>Find Falcon</button>
          </div>
        </div>
    </div>
  )
}

export default Home;