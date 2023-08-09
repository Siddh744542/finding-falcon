import Home from "./components/Home/home";
import Success from "./components/Result/Success";
import Failure from "./components/Result/Failure";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./context/dataProvider";
function App() {
  return (
    <DataProvider>
      <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Home/>}/>
          <Route path="/success/:planetName/:timeTaken" element={ <Success/>} />
          <Route path="/failure/:timeTaken" element={ <Failure/>} />   
        </Routes>
      </div>
    </BrowserRouter>
    </DataProvider>
 
  );
}

export default App;
