import React from 'react';
import Header from "../Header";
import { Link, useParams } from 'react-router-dom';
import "./result.css";

const Success = () => {
  const { planetName, timeTaken } = useParams();
  return (
    <div className='result-container'>
        <Header />
        <h1>Success! Congratulations on Finding Falcon. King Shan is mighty pleased.</h1>
          <h2>Time Taken : {timeTaken}</h2>
          <h2>Planet Found : {planetName}</h2>
        <Link to="/"> <button> Start Again </button></Link>
    </div>
  )
}

export default Success;