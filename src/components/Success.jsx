import React from 'react'
import Header from "./Header"
import { Link } from 'react-router-dom'
const Success = () => {
  return (
    <div>
        <Header />
        <h1>Success! Congratulations on Finding Falcon. King Shan is mighty pleased.</h1>
        <Link to="/"> <button> Start Again </button></Link>
    </div>
  )
}

export default Success