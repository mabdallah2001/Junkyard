import { useEffect, useState, Fragment } from 'react';

// MUI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// React router
import { useNavigate, useSearchParams } from 'react-router-dom';

// Toast
import { toast } from 'react-toastify';

// TODO: Remove | Dummy data
const dummyData = [
  {
    id: "123",
    name: "Item 1",
    image: "https://source.unsplash.com/random",
    description: "Description",
    price: "10.99"
  },
  {
    id: "1234",
    name: "Item 2",
    image: "https://source.unsplash.com/random",
    description: "Description",
    price: "10.99"
  },
  {
    id: "1235",
    name: "Item 3",
    image: "https://source.unsplash.com/random",
    description: "Description",
    price: "10.99"
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

function Items() {

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
        <Grid item key={idx} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardMedia
              component="img"
              height="200"
              image={item.image}
              alt="item image"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                  $ {item.price}
                </Typography>
              </Stack>
              <Typography>
                {item.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate(`/item?id=${item.id}`)} fullWidth>View</Button>
            </CardActions>
          </Card>
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
export default Items;