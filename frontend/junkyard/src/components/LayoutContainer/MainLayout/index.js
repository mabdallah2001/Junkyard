// React
import {useMemo, forwardRef, useState, createContext} from 'react';

// MUI Components
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// MUI Icons
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Menu items
import { mainListItems } from './menuItems';

// React Router
import { Link as RouterLink } from 'react-router-dom';

// Context
const ColorModeContext = createContext({ toggleColorMode: () => {} });

function PageLayout({children}) {

    // Theme state
    const localMode = localStorage.getItem('mode') || "light";
    const [mode, setMode] = useState(localMode);
    const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
    );
  
    // Create theme
    const theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode,
          },
        }),
      [mode],
    );
    
    // Theme toggles
    function toggleMode() {
      if (mode === 'light') {
        localStorage.setItem('mode', 'dark');
      } else {
        localStorage.setItem('mode', 'light');
      }
      colorMode.toggleColorMode();
    }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Junkyard
            </Typography>
            {mainListItems}
            <Button 
              variant="outlined"
              component={useMemo(
                () =>
                  forwardRef(function Link(itemProps, ref) {
                    return <RouterLink to={'/auth/login'} ref={ref} {...itemProps} role={undefined} />;
                  }),
                [],
              )}
              sx={{ my: 1, mx: 1.5 }}
            >
              Login
            </Button>
            <Divider orientation="vertical" flexItem/>
            <IconButton sx={{ ml: '24px' }} onClick={toggleMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default PageLayout;