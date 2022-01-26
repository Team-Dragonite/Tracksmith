import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link, Navigate } from "react-router-dom";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);


  const handleClick = () => {
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => setLoginStatus(data.response));
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
         
              <h1 style={{ textAlign: "center" }}>Tracksmith</h1>

          
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
          
   
        
              <TextField
                id="outlined-basic"
                type="password"
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
        
      
              <Button variant="contained" onClick={handleClick}>
                Log In
              </Button>
              <Link to="/signup">
                <Button variant="contained" onClick={handleClick}>
                  Sign Up
                </Button>
              </Link>
        
        </Grid>
      )}

      {loginStatus && <Navigate to="/dashboard" />}
    </>
  );
}

export default SignIn;
