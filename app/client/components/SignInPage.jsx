import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { makeStyles } from "@mui/styles";
import { Routes, Route, Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    color: "orange"
  }
});

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  const handleClick = () => {
    console.log(username, password)
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <div>
        {/* <h1>Welcome to Tracksmith</h1> */}
        <div>
          <h1 style={{'textAlign': 'center'}}>Tracksmith</h1>
        </div>
        <div>
          <TextField className={classes.root} id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <br />
        <div>
          <TextField id="outlined-basic" type="password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <br />
        <div style={{'textAlign': 'center', 'justifyContent': 'space-between'}} >
          <Button variant="contained" onClick={handleClick}>Log In</Button>
          <Link to="/signup"><Button variant="contained" onClick={handleClick}>Sign Up</Button></Link>
        </div>
      </div>
    </Grid>
  )
}

export default SignIn;