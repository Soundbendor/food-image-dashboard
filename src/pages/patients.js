import React from "react";
import DummyData from "../data/MOCK_DATA.json";
import SearchBar from "../components/searchbar/searchbar"
import Table from "../components/table/table";
  
const Patients = () => {
  return (
    <div>
      <h1>
        Patients Page
      </h1>
      <div>
      <SearchBar placeholder="Enter a Patient Name" data={DummyData} />
      </div>
      <Table userdata={DummyData}/>
      
    </div>
  );
};
  
export default Patients;