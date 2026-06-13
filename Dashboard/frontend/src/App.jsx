import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import logo from './assets/logo.png';

export default function App() {

  const [selectedRescueType, setSelectedRescueType] = useState(null);

  const rescueTypes = {
    'Water': {
      "preferred_breeds": ['Labrador Retriever Mix', 'Chesapeake Bay Retriever', 'Newfoundland'],
      "preferred_sex": "Intact Female",
      "training_age": [26, 156]
    },
    'Mountain or Wilderness': {
      "preferred_breeds": ['German Shepard', 'Alaskan Malamute', 'Old English Sheepdog', 'Siberian Husky', 'Rottweiler'],
      "preferred_sex": "Intact Male",
      "training_age": [26, 156]
    },
    'Disaster or Individual Tracking': {
      "preferred_breeds": ['Doberman Pinscher', 'German Shepard', 'Golden Retriever', 'Bloodhound', 'Rottweiler'],
      "preferred_sex": "Intact Male",
      "training_age": [20, 300]
    }
  };

  return (
    <div>
      <Header imageSrc={ logo } title={ "Grazioso Salvare Dashboard" } />
      <div className="table-filters">
      <strong><p>Select Rescue Type:</p></strong>
      <div className="table-radio-btns">
        {Object.keys(rescueTypes).map((option) => (
          <div key={option}>
            <input 
              type="radio"    
              id={option} 
              name="rescueType" 
              value={option} 
              onChange={() => setSelectedRescueType(option)} 
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
        <div>
          <input 
            type="radio" 
            id="reset" 
            name="rescueType" 
            value="reset" 
            onChange={() => setSelectedRescueType(null)}  
          />
          <label htmlFor="reset">Reset</label>
        </div>
      </div>
      </div>
      <hr /> 
      <Dashboard rescueTypes={rescueTypes} selectedRescueType={selectedRescueType} />
    </div>
  );
};