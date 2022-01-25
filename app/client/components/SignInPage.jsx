import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      <div style={{'color': "red"}}>
        <div>
          <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <br />
        <div>
          <TextField id="outlined-basic" type="password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <br />
        <div style={{'textAlign': 'center'}}>
          <Button variant="contained" onClick={handleClick}>Log In</Button>
        </div>
      </div>
    </Grid>
  )
}

export default SignIn;