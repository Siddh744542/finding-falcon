import React, { useContext, useEffect, useState } from "react"; 
import "./selection.css"; 
import { DataContext } from "../../context/dataProvider";
import Destination from "../Destination";
import Vehicle from "../Vehicle";

const Selection = ({ index }) => { 
  const [selectedPlanet, setSelectedPlanet] = useState({ name: "Select", distance: 0 }); 
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const { selected, setSelected, timeTaken, setTimeTaken } = useContext(DataContext);

  const { name: selectedPlanetName } = selectedPlanet;
  const { name: selectedVehicleName } = selectedVehicle;

  useEffect(() => {
    if (selectedPlanetName && selectedVehicleName) {
      const updatedSelected = {
        ...selected,
        planet_names: [...selected.planet_names, selectedPlanetName],
        vehicle_names: [...selected.vehicle_names, selectedVehicleName],
      };
      setSelected(updatedSelected);

      const newTime = selectedPlanet.distance / selectedVehicle.speed;
      setTimeTaken(timeTaken + newTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVehicleName]);

 
  return ( 
    <div className="selection-container">
      <Destination 
        index={index} 
        selectedPlanetName={selectedPlanetName} 
        setSelectedPlanet={setSelectedPlanet} 
        setIsOpen={setIsOpen}
      />

      <Vehicle 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        selectedPlanet={selectedPlanet} 
        selectedVehicleName={selectedVehicleName} 
        setSelectedVehicle={setSelectedVehicle} 
      />
    </div>
  );
};
 
export default Selection;