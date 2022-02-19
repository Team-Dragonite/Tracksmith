import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {TextField,Button,Box} from "@mui/material";
import { Link } from "react-router-dom";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import store from '../store/store.js'
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Dashboard = () => {
  const [newAppCompany, setNewAppCompany] = useState('');
  const [newAppPosition, setNewAppPosition] = useState('');
  const [newAppDate, setNewAppDate] = useState('');
  const [allApplications, setAllApplications] = useState([])
  const findUsername = useSelector((state) => state.username);
  
  const rows = [];
  
  useEffect(() => {
    getApplications();
  }, [findUsername])

  const handleClick = () => {
    fetch('/api/postApplication', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        application_user: findUsername,
        companyName: newAppCompany,
        position: newAppPosition,
        date: newAppDate
      })
    }).then(() => getApplications())
      
  }

  const getApplications = () => {
    fetch('api/getApplications', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: findUsername})
    }).then((response) => response.json()).then(data => {
      const conversions = {hrScreen: 0, technicalInterview: 0, onSite: 0, totals: 0}
        for(let i = 0; i < data.length;i++) {
          const currentApplication = {
            id: data[i].application_id,
            companyName: data[i].company,
            position: data[i].job_title,
            date: data[i].application_date,
            coverLetter: data[i].cover_letter,
            resumeSubmitted: data[i].resume_submitted,
            HRScreen: data[i].hr_date,
            technicalInterview: data[i].t1_date,
            onSite: data[i].onsite,
            status: data[i].application_status,
            notes: data[i].notes
          };
          if(currentApplication.HRScreen){
            conversions.hrScreen++
          }
          if(currentApplication.technicalInterview){
            conversions.technicalInterveiw++;
          }
          if(currentApplication.onSite){
            conversions.onSite++;
          }
        rows.push(currentApplication);
      }
      conversions.totals = rows.length;
      store.dispatch({type: 'SET_CONVERSION', payload: conversions})
      setAllApplications(rows)})
  }

  const columns = [
    { field: "id", headerName: "App ID", width: 0 },
    { field: "companyName", headerName: "Company", width: 120, editable: true }, // company
    { field: "position", headerName: "Position", width: 100, editable: true }, // job_title
    { field: "date", headerName: "Date Applied", type: "date", width: 120, editable: true }, // application_date
    { field: "coverLetter", headerName: "Cover Letter", width: 120, editable: true },  // cover_letter
    { field: "resumeSubmitted", headerName: "Resume Version", width: 140, editable: true }, // resume_submitted
    { field: "HRScreen", headerName: "HR Screening", type: 'date', width: 140, editable: true }, // hr_date
    { field: "technicalInterview", headerName: "Technical Interview", type: 'date', width: 160, editable: true }, // t1_date
    { field: "onSite", headerName: "On-Site", type: 'date', width: 100, editable: true }, // onsite
    { field: "status", headerName: "Status", width: 80, editable: true }, // application_status
    { field: "notes", headerName: "Notes", width: 120, editable: true },  // notes
    { field: "updateButton", headerName: "Update", sortable: false, width: 100, renderCell: (params) => {
      const onClick = () => {
        const api = params.api;
        const thisRow = {};
        api.getAllColumns().forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
        fetch(`/api/putApplication/${thisRow.id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(thisRow)
        }).then(() => getApplications())
      }
      return <Button onClick={onClick}>Update</Button>
    }},
    { field: "deleteButton", headerName: "Delete", sortable: false, width: 100, renderCell: (params) => {
      const onClick = () => {
        const api = params.api;
        const thisRow = {};
        api.getAllColumns().forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
        fetch(`/api/deleteApplication/${thisRow.id}`, {
          method: 'DELETE'
        }).then(() => getApplications())
      }
      return <Button onClick={onClick}>Delete</Button>
    }}
  ];

  return (
    <>
    <Typography variant="h1" component="div" gutterBottom>
      TrackSmith Application Dashboard    
    </Typography>

    <TextField
      id="outlined-basic"
      label="Company"
      variant="outlined"
      value={newAppCompany}
      onChange={(e) => setNewAppCompany(e.target.value)}
    />
    <TextField
      id="outlined-basic"
      label="Position"
      variant="outlined"
      value={newAppPosition}
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
      <Button variant="contained" onClick={handleClick} style={{marginLeft: '50', marginRight: '50'}}>Add Application</Button>
      <Link to="/conversion">
        <Button variant="contained" style={{marginLeft: '50', marginRight: '50'}}>
          Conversion Rates
        </Button>
      </Link>
      <Link to="/">
        <Button variant="contained" style={{marginLeft: '500', marginRight: '500'}}>
          Sign Out
        </Button>
      </Link>
      
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        editMode="row"
        rows={allApplications}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
    </>
  );
};

export default Dashboard;
