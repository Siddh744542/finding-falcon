import Home from "./components/Home/home";
import Success from "./components/Success";
import Failure from "./components/Failure";
import {BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Home/>}/>
          <Route path="/success/" element={ <Success/>} />
          <Route path="/failure" element={ <Failure/>} />   
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
