import React, { useState } from "react";
import {Button,Grid, TextField, Box} from "@mui/material";
import { Link, Navigate } from "react-router-dom";

const SignIn = () =>  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);


  const handleClick = () => {
    fetch("api/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "Content-Type": "application/json" },
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
              <Link to="/visualization">
                <Button variant="contained">
                  See Visualization
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      )}

      {loginStatus && <Navigate to="/dashboard" />}
    </>
  );
}

export default SignIn;
