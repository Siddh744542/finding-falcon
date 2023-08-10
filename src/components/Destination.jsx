import React, { useContext } from 'react';
import { DataContext } from '../context/dataProvider';
const Destination = ({ index, selectedPlanetName, setSelectedPlanet, setIsOpen }) => {
    const { planets, setPlanets } = useContext(DataContext);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        const selectedIndex = event.target.options.selectedIndex - 1;
        setSelectedPlanet({ name: selectedValue, distance: planets[selectedIndex].distance });
        setPlanets(planets.filter((planet) => planet.name !== selectedValue));
        setIsOpen(true);
    };

  return (
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
  )
}

export default Destination;