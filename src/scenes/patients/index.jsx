import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataPatients } from "../../data/mockData";
import Header from "../../components/Header";
import React,{useState,useEffect} from 'react'
import Axios from 'axios'

const Patients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      field: "City",
      headerName: "City",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
    },
	      {
      field: "State",
      headerName: "State",
      headerAlign: "left",
      align: "left",
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
      <Typography
        color={colors.headingColor.main}
        variant="h2"
        fontWeight="600"
      >
        Patients
      </Typography>
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
