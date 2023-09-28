import Header from "../Header/Header"
import React from 'react'
import { Link, useParams } from "react-router-dom";
import "./result.css";
const Failure = () => {
  const { timeTaken } = useParams();
  return (
    <div className="result-container">
        <Header />
        <h1>Failure! You have Failed King Shan.</h1>
        <h3>Time Taken : {timeTaken}</h3>
        <Link to="/"> <button className="button"> Start Again </button></Link>
    </div>
  )
}

export default Failure