import { useEffect, useState, Fragment } from 'react';

// MUI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

// React router
import { useNavigate, useSearchParams } from 'react-router-dom';

// Toast
import { toast } from 'react-toastify';

function Garages() {

  const navigate = useNavigate();
  const [searchParams, ] = useSearchParams();
  const query = searchParams.get("query");

  const [data, setData] = useState([]);
  const [querySearched, setQuerySearched] = useState(false);
  
  useEffect(() => {
    let mounted = true;
    setQuerySearched(false);

    const fetchData = async () => {
      if (searchParams.get("query")) {
        axios.get("http://localhost:8080/api/garage/" )
          .then((r) => {
            if (mounted) {
              setData(r.data);
              setQuerySearched(true);
            }
          })
          .catch((e) => {
            toast.error(`Error fetching data: ${e}`);
            setQuerySearched(true)
          })
      } else {
        // TODO: API fetch default garages
        axios.get("http://localhost:8080/api/garage/")
          .then((r) => {
            if (mounted) {
              setData(r.data);
              setQuerySearched(true);
            }
          })
          .catch((e) => {
            toast.error(`Error fetching data: ${e}`);
            setQuerySearched(true)
          })
      }
    }

    fetchData();

    return(() => mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <Fragment>
      {querySearched ? 
      <Grid container spacing={2}>
      {data.map((item, idx) => (
        <Grid item xs={12} md={12} key={idx}>
          <CardActionArea component="a" onClick={() => navigate(`/garage?id=${item.id}`)}>
            <Card sx={{ display: 'flex' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  {item.id}. {item.name}
                </Typography>
                <Typography variant="subtitle1">
                  {item.address1}{item.address2}, {item.city}, {item.postcode}, {item.country}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </Grid>
    :
    <Box 
      sx={{
        textAlign: 'center'
      }}
    >
      <CircularProgress />
    </Box>  
  }
    </Fragment>
  )
}
export default Garages;