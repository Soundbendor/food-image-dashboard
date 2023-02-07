import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataPatients } from "../../data/mockData";
import Header from "../../components/Header";

const FAQ = () => {
  const columns = [
    { field: "id", 
    headerName: "ID", 
    flex: 0.5 , 
    cellClassName: "name-column--cell",
    },
    {
      field: "first_name",
      headerName: "First",
      flex: 1,
      cellClassName: "name-column--cell",
      color: "#000000",
      editable: true,
    },
    {
      field: "last_name",
      headerName: "Last",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "username",
      headerName: "Username",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
    },
    {
      field: "userhash",
      headerName: "Userhash",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="FAQ"
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
          rows={mockDataPatients}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default FAQ;

