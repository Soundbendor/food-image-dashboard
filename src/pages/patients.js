import React from "react";
import DummyData from "../data/MOCK_DATA.json";
import SearchBar from "../components/searchbar/searchbar";
  
const Patients = () => {
  return (
    <div>
      <h1>
        Patients Page
        <SearchBar placeholder="Enter a Patient Name..." data={DummyData} />
      </h1>
    </div>
  );
};
  
export default Patients;