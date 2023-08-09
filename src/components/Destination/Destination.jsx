import React, { useContext, useEffect, useState } from "react"; 
import "./destination.css"; 
import { DataContext } from "../../context/dataProvider";

const Destination = ({ index }) => { 
  const [selectedPlanet, setSelectedPlanet] = useState({ name: "Select", distance: 0 }); 
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const { planets, setPlanets, vehicles, setVehicles, selected, setSelected,timeTaken, setTimeTaken } = useContext(DataContext);

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

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedIndex = event.target.options.selectedIndex - 1;
    setSelectedPlanet({ name: selectedValue, distance: planets[selectedIndex].distance });
    setPlanets(planets.filter((planet) => planet.name !== selectedValue));
    setIsOpen(true);
  };

 const handleSelection = (event) => {
    const selectedVehicleName = event.target.value;
    const index = vehicles.findIndex((vehicle) => vehicle.name === selectedVehicleName);
    const updatedVehicles = [...vehicles];
    updatedVehicles[index].total_no -= 1;
    setVehicles(updatedVehicles);
    setSelectedVehicle(updatedVehicles[index]);
    setIsOpen(false);
  };
 
  return ( 
    <div className="selection-container">
      {/* destination */}
      <div className="destination-container">
        <label htmlFor={`destination${index}`}>Destination {index}</label>
        <select
          name={`destination${index}`}
          id={`destination${index}`}
          value={selectedPlanetName}
          onChange={handleChange}
        >
          <option value={selectedPlanetName} disabled={selectedPlanetName !== "Select"}>
            {selectedPlanetName}
          </option>
          {planets.map((planet, index) => (
            <option key={index} value={planet.name}>
              {planet.name}
            </option>
          ))}
        </select>
      </div> 

      {/* vehicle */}
      <div className="vehicle-container">
        {isOpen ? (
          <div>
            <fieldset>
              <legend>Select a Vehicle:</legend>
              <form onChange={handleSelection}>
                {vehicles.map((vehicle, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={vehicle.name}
                      name={selectedPlanetName}
                      value={selectedVehicleName || vehicle.name}
                      disabled={vehicle.total_no <= 0 || selectedPlanet.distance > vehicle.max_distance}
                    />
                    <label
                      htmlFor={vehicle.name}
                      style={
                        vehicle.total_no <= 0 || selectedPlanet.distance > vehicle.max_distance
                          ? { color: "#EBEBE4" }
                          : {}
                      }
                    >
                      {vehicle.name}({vehicle.total_no})
                    </label>
                    <br />
                  </div>
                ))}
              </form>
            </fieldset>
          </div>
          ) : (
          <div>
            {selectedPlanetName !== "Select" ? <h4>{selectedVehicleName} is selected.</h4> : null}
          </div>
      )}
    </div>
     
    </div>
  );
};
 
export default Destination;