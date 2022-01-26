import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {TextField,Button,Box} from "@mui/material";
import { Link } from "react-router-dom";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useSelector } from 'react-redux';
import store from '../store/store.js'


const Dashboard = () => {
  const [newAppCompany, setNewAppCompany] = useState('');
  const [newAppPosition, setNewAppPosition] = useState('');
  const [newAppDate, setNewAppDate] = useState('');
  const [allApplications, setAllApplications] = useState([])
  // const [newCompany, setNewCompany] = useState('');
  const findUsername = useSelector((state) => state.username);
  
  useEffect(() => {
    fetch('api/getApplications', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: findUsername})
    }).then((response) => response.json()).then(data => console.log(data))
    //will be used to fetch (sending usernane to API)
    // and receive all application data
  }, [findUsername])

  const handleClick = () => {
    fetch('')
  }

  const columns = [
    // { field: "id", headerName: "App ID", width: 70 },
    { field: "companyName", headerName: "Company", width: 120, editable: true }, // company
    // { field: "companyType", headerName: "Industry", width: 120, editable: true },
    { field: "position", headerName: "Position", width: 100, editable: true }, // job_title
    { field: "date", headerName: "Date Applied", type: "date", width: 120, editable: true }, // application_date
    { field: "coverLetter", headerName: "Cover Letter", width: 120, editable: true },  // cover_letter
    { field: "resumeSubmitted", headerName: "Resume Version", width: 140, editable: true }, // resume_submitted
    // { field: "interviewStatus", headerName: "Interview Status", width: 140, editable: true },
    { field: "HRScreen", headerName: "HR Screening", type: 'date', width: 140, editable: true }, // hr_date
    { field: "technicalInterview", headerName: "Technical Interview", type: 'date', width: 160, editable: true }, // t1_date
    { field: "onSite", headerName: "On-Site", type: 'date', width: 100, editable: true }, // onsite
    { field: "status", headerName: "Status", width: 80, editable: true }, // application_status
    { field: "notes", headerName: "Notes", width: 120, editable: true },  // notes
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
  ];
  return (
    <>
    <h1>This is the Dashboard</h1>

    <Link to="/">
<Button variant="contained">
  Back
</Button>
</Link>

<Link to="/conversion">
<Button variant="contained">
  Conversion Rates
</Button>
</Link>
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
