import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import Axios from 'axios'
import {useState,useEffect} from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";

const Meal = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [foodList,setFoodList]=useState([]);
      const columns = [
    { field: "FoodID",
    headerName: "ID",
    flex: 0.5 ,
    cellClassName: "name-column--cell",
    },
    {
      field: "FoodName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      color: "#000000",
    },
    {
      field: "SugarPerServ",
      headerName: "Sugar(g)",
      flex: 0.5,
      cellClassName: "name-column--cell",
      color: "#000000",
    },
    {	
      field: "SodiumPerServ",
      headerName: "Sodium(mg)",
      flex: 0.5,
      cellClassName: "name-column--cell",
      color: "#000000",
    },
    {
      field: "Calories",
      headerName: "Calories",
      flex: 0.5,
      cellClassName: "name-column--cell",
      color: "#000000",
    },
    {
      field: "ProteinPerServ",
      headerName: "Protein(g)",
      flex: 0.5,
      cellClassName: "name-column--cell",
      color: "#000000",
    },
    {
      field: "FatPerServ",
      headerName: "Fat(g)",
      flex: 0.5,
      cellClassName: "name-column--cell",
      color: "#000000",
    }, 
    {
      field: "SatFatPerServ",
      headerName: "Saturated Fat(g)",
      flex: 0.5,
      cellClassName: "name-column--cell",
      color: "#000000",
    },
    {
      field: "TransFatPerServ",
      headerName: "Trans Fat(g)",
      flex: 0.5,
      cellClassName: "name-column--cell",
      color: "#000000",
    },
    {
      field: "CarbPerServ",
      headerName: "Carbonate(g)",
      flex: 0.5,
      cellClassName: "name-column--cell",
      color: "#000000",
    },
      ]
    useEffect(()=>{
      Axios.get("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/getFoods").then((data)=>{
        console.log(data)
        setFoodList(data.data)
      });
    },[]);
    console.log(foodList);
	return (
	 <Box m="20px">
      <Header
        title="Meal"
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
          getRowId={(row) => row.FoodID}
          rows={foodList}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
   />
      </Box>
    </Box>
	);

}
export default Meal;
