import Header from "./Header"
import React from 'react'
import { Link } from "react-router-dom"
const Failure = () => {
  return (
    <div>
        <Header />
        <h1>Failure! You have Failed King Shan.</h1>
        <Link to="/"> <button> Start Again </button></Link>
    </div>
  )
}

export default Failure