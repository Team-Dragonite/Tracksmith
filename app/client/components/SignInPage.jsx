import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import { Link, Navigate } from "react-router-dom";
import store from '../store/store.js';
import storeUsername from "../store/actions.js";

const SignIn = () =>  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState('');
  // const [loginError, setLoginError] = useState('')

  
  const handleClick = () => {
    store.dispatch(storeUsername(username))
    fetch("api/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoginStatus(data.response)
      });
  };

  return (
    <>
      {!loginStatus && (
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Box>
              <Typography variant="h1" component="div" gutterBottom>
                TrackSmith
              </Typography>
            </Box>
            <Box style={{ textAlign: "center", justifyContent: "space-between" }}>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
            <br />
            <Box style={{ textAlign: "center", justifyContent: "space-between" }}>
              <TextField
                id="outlined-basic"
                type="password"
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <br />
            <Box
              style={{ textAlign: "center", justifyContent: "space-between", marginLeft: '20', marginRight: '20'}}
            >
              <Button variant="contained" onClick={handleClick} style={{marginLeft: '20', marginRight: '20'}}>
                Log In
              </Button>
              <Link to="/signup">
                <Button variant="contained" onClick={handleClick} style={{marginLeft: '20', marginRight: '20'}}>
                  Sign Up
                </Button>
              </Link>
            </Box>
            {/* <Alert severity="error">
              <AlertTitle>{loginError}</AlertTitle>
            </Alert> */}
          </Box>
        </Grid>
      )}

      {loginStatus && <Navigate to="/dashboard" />}
    </>
  );
}

export default SignIn;
