import { useEffect, useState, Fragment } from 'react';

// MUI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

// React router
import { useNavigate, useSearchParams } from 'react-router-dom';

// Toast
import { toast } from 'react-toastify';

// TODO: Remove | Dummy data
const dummyData = [
  {
    id: "123",
    name: "Garage Name 1",
    details: "Garage details",
    hours: "10am - 6pm",
    location: "Address"
  },
  {
    id: "1234",
    name: "Garage Name 2",
    details: "Garage details",
    hours: "10am - 6pm",
    location: "Address"
  },
  {
    id: "1235",
    name: "Garage Name 3",
    details: "Garage details",
    hours: "10am - 6pm",
    location: "Address"
  }
]

// TODO: Remove | Simulate api call
function simulateAPI(data, time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
}

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
        // TODO: API fetch query
        simulateAPI(dummyData, 3000)
          .then((r) => {
            if (mounted) {
              setData(r);
              setQuerySearched(true);
            }
          })
          .catch((e) => {
            toast.error(`Error fetching data: ${e}`);
            setQuerySearched(true)
          })
      } else {
        // TODO: API fetch default garages
        simulateAPI(dummyData, 1000)
          .then((r) => {
            if (mounted) {
              setData(r);
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
                  {item.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {item.hours}
                </Typography>
                <Typography variant="subtitle1">
                  {item.location}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {item.details}
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