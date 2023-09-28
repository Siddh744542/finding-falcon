import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({children})=>{
    const [planets, setPlanets] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selected, setSelected] = useState({token:"", planet_names:[], vehicle_names:[]});
    const [timeTaken, setTimeTaken] = useState(0);
    const [isError, setIsError]= useState(false);
    return(
        <DataContext.Provider value={{
             planets,
             setPlanets,
             vehicles,
             setVehicles,
             selected,
             setSelected,
             timeTaken,
             setTimeTaken,
             isError,
             setIsError
        }}> 
        {children}
        </DataContext.Provider>
    )
}

export default DataProvider;