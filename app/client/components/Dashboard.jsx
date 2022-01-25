import React from 'react';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';

function Dashboard() {
  const [sortModel, setSortModel] = React.useState([
    {
      field: 'firstName',
      sort: 'asc',
    },
  ]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'company',
      headerName: 'Company',
      width: 100,
      editable: true,
    },
    {
      field: 'company_type',
      headerName: 'Company Type',
      width: 100,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 100,
      editable: true,
    },
    {
      field: 'cover_letter',
      headerName: 'Cover Letter',
      width: 100,
      editable: true,
    },
    {
      field: 'resume',
      headerName: 'Resume',
      width: 100,
      editable: true,
    },
    {
      field: 'resume_version',
      headerName: 'Resume Version',
      width: 100,
      editable: true,
    },
    {
      field: 'application_date',
      headerName: 'Application Date',
      width: 100,
      editable: true,
    },
    {
      field: 'hr_interview_date',
      headerName: 'HR Interview Date',
      width: 100,
      editable: true,
    },
    {
      field: 'technical_interview_date',
      headerName: 'Technical Interview Date',
      width: 100,
      editable: true,
    },
    {
      field: 'interviewer',
      headerName: 'Interviewers',
      width: 100,
      editable: true,
    },
  ];

  const rows = [
    { id: 1, company: 'Meta', company_type: 'FAANG', role: "Software Engineer", cover_letter:"Y", resume: "Y", resume_version:"1.0.0", application_date:"12-03-04", hr_interview_date:"02-04-06",technical_interview_date: "02-03-05", interviewer: "Jay Wall"}

  ];

  return (
    <>
      <h1>Dashboard</h1>

      <Grid container spacing={{ xs: 3 }}>
        <Grid item xs={4}>
          <div></div>
        </Grid>
        <Grid item xs={4}>
          <div></div>
        </Grid>
        <Grid item xs={4}>
          <div></div>
        </Grid>
        <Grid item xs={4}>
          <div></div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ height: 400, width: 1200 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[10]}
              checkboxSelection
              sortModel={sortModel}
              onSortModelChange={(model) => setSortModel(model)}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div></div>
        </Grid>
        <Grid item xs={4}>
          <div></div>
        </Grid>
        <Grid item xs={4}>
          <div></div>
        </Grid>
        <Grid item xs={4}>
          <div></div>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
