// React
import {useMemo, forwardRef} from 'react';

// MUI Components
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// MUI Icons
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Menu items
import { mainListItems } from './menuItems';

// React Router
import { Link as RouterLink } from 'react-router-dom';

// Context
import {useAppController, useAuthController, setDarkMode} from "../../../context";

function PageLayout({children}) {
  const [authController,] = useAuthController();
  const {user} = authController;
  const [controller, dispatch] = useAppController();
  const {darkMode} = controller;

  // Create theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

  // Theme toggles
  function toggleMode() {
    setDarkMode(dispatch, !darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{
          flexWrap: 'wrap',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Junkyard
          </Typography>
          {mainListItems}
          <Button
            variant="outlined"
            component={useMemo(
              () =>
                forwardRef(function Link(itemProps, ref) {
                  return <RouterLink to={user ? '/dashboard/home' : '/auth/login'} ref={ref} {...itemProps} role={undefined} />;
                }),
              [user],
            )}
            sx={{ my: 1, mx: 1.5 }}
          >
            {user ? "Dashboard" : "Login"}
          </Button>
          <Divider orientation="vertical" flexItem/>
          <IconButton sx={{ ml: '24px' }} onClick={toggleMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default PageLayout;