import { useState } from "react";

// MUI

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Context
import { useAuthController } from "../../../context";

// Firebase
import {
  updateEmail,updateProfile
} from "firebase/auth";
import { auth } from "../../../firebase";

// Toast
import { toast } from 'react-toastify';

//post data
import axios from "axios";

const theme = createTheme();

export default function Register() {

  const [authController, ] = useAuthController();
  const { user } = authController;

  const [Email, setEmail] = useState(user.email);
  const [Name, setName] = useState(user.displayName);
  const [emailInValid,setEmailInValid] = useState(false);
  
  const update = async () => {
    if (auth.currentUser.email !== Email) {
      updateEmail(auth.currentUser, Email).then(() => {
        toast.success("Email update successful");
      }).catch((error) => {
        toast.error(error.message);
      });
    }
  
    updateProfile(auth.currentUser, {
      displayName: Name
    }).then(() => {
      toast.success("Name update successful");
      // ...
    }).catch((error) => {
      toast.error(error.message);
    });
    // console.log(user)
  }
  
  function validEmail(Email){
    let res = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(Email);
    setEmailInValid(!res);
    if(res){
      setEmail(Email);
    }
  }
 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  autoComplete="given-name"
                  name="Name"
                  fullWidth
                  id="Name"
                  label="Name"
                  defaultValue={user.displayName}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  defaultValue={user.email}
                  autoComplete="email"
                  error={emailInValid}
                  helperText={emailInValid ? 'Incorrect Email, please input normal email.' : ''}
                  onChange={(event) => {
                    validEmail(event.target.value);
                  }}
                  
                />
              </Grid>
             
            </Grid>
            <Button
               onClick={update}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}