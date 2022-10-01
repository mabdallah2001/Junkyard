import { useState, useMemo } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {useAppController, useAuthController, setDarkMode} from "../../../src/context";
import { CssBaseline } from '@mui/material';

function ItemCard({ children }) {
    const [controller, dispatch] = useAppController();
    const { darkMode } = controller;
    

    const theme = useMemo(
        () =>
          createTheme({
            palette: {
              mode: darkMode ? 'dark' : 'light',
            },
          }),
        [darkMode],
      );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ThemeProvider>
    )

}

export default ItemCard;