import React,{ useContext } from 'react';
import { DataContext } from '../../context/dataProvider';
const Vehicle = ({ isOpen, setIsOpen, selectedPlanet, selectedVehicleName, setSelectedVehicle}) => {
    const { vehicles, setVehicles } = useContext(DataContext);
  
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
    <div className="vehicle-container">
        {isOpen ? (
          <div>
            <fieldset>
              <legend>Select a Vehicle:</legend>
              <form onChange={handleSelection}>
                {vehicles?.map((vehicle, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={vehicle.name}
                      name={selectedPlanet.name}
                      value={selectedVehicleName || vehicle.name}
                      disabled={vehicle.total_no <= 0 || selectedPlanet.distance > vehicle.max_distance}
                    />
                    <label
                      htmlFor={vehicle.name}
                      style={
                        vehicle.total_no <= 0 || selectedPlanet.distance > vehicle.max_distance
                          ? { color: "#C9A390" }
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
            {selectedPlanet.name !== "Select" ? <h4>{selectedVehicleName} is selected.</h4> : null}
          </div>
      )}
    </div>
  )
}

export default Vehicle