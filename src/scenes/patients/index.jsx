import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataPatients } from "../../data/mockData";
import Header from "../../components/Header";
import React,{useState,useEffect} from 'react'
import Axios from 'axios'

const Patients = () => {
  const columns = [
    { field: "UserID", 
    headerName: "ID", 
    flex: 0.5 , 
    cellClassName: "name-column--cell",
    },
    {
      field: "FName",
      headerName: "First",
      flex: 1,
      cellClassName: "name-column--cell",
      color: "#000000",
    },
    {
        field: "LName",
        headerName: "Last",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
      field: "UserName",
      headerName: "Username",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
    },
    {
      field: "UserHash",
      headerName: "Userhash",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];
  
  const [userList,setUserList]=useState([]);
  
  useEffect(()=>{
    Axios.get("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/getUsers").then((data)=>{
      console.log(data)
      setUserList(data.data)
    });
  },[]);
  
  console.log(userList);


  return (
    <Box m="20px">
      <Header
        title="Patients"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: "#000000",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#ced4da",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
          "& .MuiCheckbox-root": {
            color: "#000000",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "#000000",
          },
        }}
      >
        <DataGrid
	  getRowId={(row) => row.UserID}
          rows={userList}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Patients;
