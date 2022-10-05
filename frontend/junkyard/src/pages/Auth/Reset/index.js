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
import { auth } from '../../../firebase';
import {
  sendPasswordResetEmail
} from "firebase/auth";

// Toast
import { toast } from 'react-toastify';

const theme = createTheme();

export default function Reset() {

const [email, setEmail] = useState("");
const [emailInValid,setEmailInValid] = useState(false);

  const reset = async () => {
    try {
      await sendPasswordResetEmail(
        auth,
        email
      );
    } catch (error) {
      toast.error(`Error resetting password: ${error.message}`);
    }
  };

  function validEmail(EmailAddress){
    let res = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(EmailAddress);
    setEmailInValid(!res);
    if(res){
      setEmail(EmailAddress);
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
            Type your Email Address for resect link
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailInValid}
              helperText={emailInValid ? 'Incorrect Email, please input normal email.' : ''}
              onChange={(event) => {
                validEmail(event.target.value);
              }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={reset}
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="*" variant="body2">
                  Back
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}