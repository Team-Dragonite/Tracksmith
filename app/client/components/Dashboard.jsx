import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const Dashboard = () => {
  const [newAppCompany, setNewAppCompany] = useState('');
  const [newAppPosition, setNewAppPosition] = useState('');
  const [newAppDate, setNewAppDate] = useState('');
  // const [newCompany, setNewCompany] = useState('');

  const columns = [
    { field: "id", headerName: "App ID", width: 70 },
    { field: "companyName", headerName: "Company Name", width: 130 },
    { field: "position", headerName: "Position", width: 130 },
    {
      field: "date",
      headerName: "Date Applied",
      type: "number",
      width: 130,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
  ];

  const rows = [
    {
      id: 1,
      companyName: "Amazon",
      position: "SDE1",
      date: "1/1/21",
    },
    {
      id: 2,
      companyName: "Google",
      position: "SDE2",
      date: "1/2/21",
    },
    {
      id: 3,
      companyName: "Meta",
      position: "SDE3",
      date: "1/3/21",
    },
    {
      id: 4,
      companyName: "Microsoft",
      position: "SDE4",
      date: "1/4/21",
    },
    {
      id: 5,
      companyName: "LinkedIn",
      position: "SDE5",
      date: "1/5/21",
    },
    {
      id: 6,
      companyName: "Uber",
      position: "SDE6",
      date: "1/6/21",
    },
    {
      id: 7,
      companyName: "Shopify",
      position: "SDE7",
      date: "1/7/21",
    },
    {
      id: 8,
      companyName: "Netflix",
      position: "SDE8",
      date: "1/8/21",
    },
    {
      id: 9,
      companyName: "CodeSmith",
      position: "SDE9",
      date: "1/9/21",
    },
  ];
  return (
    <>
    <h1>This is the Dashboard</h1>
    <TextField
      id="outlined-basic"
      label="Company"
      variant="outlined"
      onChange={(e) => setNewAppCompany(e.target.value)}
    />
    <TextField
      id="outlined-basic"
      label="Position"
      variant="outlined"
      onChange={(e) => setNewAppPosition(e.target.value)}
    />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker 
          label="Date Applied"
          // value={new Date()}
          onChange={(e) => setNewAppDate(e.target.value)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    {/* <TextField
      id="outlined-basic"
      label="Username"
      variant="outlined"
      onChange={(e) => setUsername(e.target.value)}
    /> */}
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
    </>
  );
};

export default Dashboard;
