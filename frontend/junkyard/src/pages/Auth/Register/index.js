import { useState } from "react";

// MUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Firebase
import { auth } from "../../../firebase";
import {
  createUserWithEmailAndPassword,updateProfile
} from "firebase/auth";

// Toast
import { toast } from 'react-toastify';

const theme = createTheme();

export default function Register() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [emailInValid,setEmailInValid] = useState(false);
  const [passwordInValid, setPasswordInValid] = useState(true);

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      ).then(
        ()=>{
          return updateProfile(auth.currentUser,{
            displayName :registerName,
          })
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  function validEmail(registerEmail){
    let res = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(registerEmail);
    setEmailInValid(!res);
    if(res){
      setRegisterEmail(registerEmail);
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  onChange={(event) => {
                    setRegisterName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailInValid}
                  helperText={emailInValid ? 'Incorrect Email, please input normal email.' : ''}
                  onChange={(event) => {
                    validEmail(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passwordInValid}
                  helperText={passwordInValid ? 'Password must be 6 or more characters.' : ''}
                  onChange={(event) => {
                    if(event.target.value.length >= 6){
                      setPasswordInValid(false);
                  }else{
                      setPasswordInValid(true);
                  }
                    setRegisterPassword(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              onClick={register}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}