import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const Dashboard = () => {
  const [newAppCompany, setNewAppCompany] = useState('');
  const [newAppPosition, setNewAppPosition] = useState('');
  const [newAppDate, setNewAppDate] = useState('');
  // const [newCompany, setNewCompany] = useState('');

  useEffect(() => {
    console.log('useffect in dashboard')
    //will be used to fetch (sending usernane to API)
    // and receive all application data
  }, [])

  const handleClick = () => {
    console.log('hello button')
  }

  const columns = [
    { field: "id", headerName: "App ID", width: 70 },
    { field: "companyName", headerName: "Company", width: 120, editable: true },
    { field: "companyType", headerName: "Industry", width: 120, editable: true },
    { field: "position", headerName: "Position", width: 100, editable: true },
    { field: "date", headerName: "Date Applied", type: "date", width: 120, editable: true },
    { field: "coverLetter", headerName: "Cover Letter", width: 120, editable: true },
    { field: "resumeSubmitted", headerName: "Resume Version", width: 140, editable: true },
    { field: "interviewStatus", headerName: "Interview Status", width: 140, editable: true },
    { field: "onSite", headerName: "On-Site?", width: 85, editable: true },
    { field: "offer", headerName: "Offer?", width: 80, editable: true },
    { field: "notes", headerName: "Notes", width: 120, editable: true },
    { field: "updateButton", headerName: "Update", sortable: false, width: 100, renderCell: (params) => {
      const onClick = () => {
        const api = params.api;
        const thisRow = {};
        api.getAllColumns().filter((c) => c.field !== "__check__" && !!c).forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
        return alert(JSON.stringify(thisRow));
      }
      return <Button onClick={onClick}>Update</Button>
    }},
    { field: "deleteButton", headerName: "Delete", sortable: false, width: 100, renderCell: (params) => {
      const onClick = () => {
        const api = params.api;
        const thisRow = {};
        console.log(api.getAllColumns())
        api.getAllColumns().forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
        return alert(JSON.stringify(thisRow));
      }
      return <Button onClick={onClick}>Delete</Button>
    }}
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
    {
      id: 10
    }
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
        value={newAppDate}
        onChange={(e) => setNewAppDate(e)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    <Box>
      <Button variant="contained" onClick={handleClick}>Add Application</Button>
    </Box>
    {/* <TextField
      id="outlined-basic"
      label="Username"
      variant="outlined"
      onChange={(e) => setUsername(e.target.value)}
    /> */}
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        editMode="row"
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
    </>
  );
};

export default Dashboard;
