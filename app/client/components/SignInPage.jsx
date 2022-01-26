import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Link, Navigate } from "react-router-dom";

const SignIn = () =>  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState('');
  const [loginError, setLoginError] = useState('')


  const handleClick = () => {
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
              <h1 style={{ textAlign: "center" }}>Tracksmith</h1>
            </Box>
            <Box>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
            <br />
            <Box>
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
              style={{ textAlign: "center", justifyContent: "space-between" }}
            >
              <Button variant="contained" onClick={handleClick}>
                Log In
              </Button>
              <Link to="/signup">
                <Button variant="contained" onClick={handleClick}>
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
