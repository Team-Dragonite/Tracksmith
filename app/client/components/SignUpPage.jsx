import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUpStatus, setSignUpStatus] = useState(false);

  const handleClick = () => {};

  return (
    <>
      {!signUpStatus && (
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <h1>This is the sign up page</h1>
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box>
            <Button variant="contained" onClick={handleClick}>
              Submit
            </Button>
          </Box>
        </Grid>
      )}
      {signUpStatus && <Navigate to="/dashboard" />}
    </>
  );
};

export default SignUp;
