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
import { Divider } from '@mui/material';

// React router
import { useNavigate, useSearchParams } from 'react-router-dom';

// Toast
import { toast } from 'react-toastify';

// Context
import { useAppController, setRefresh } from '../../../context';

function Comments() {

  const [appController, appDispatch] = useAppController();
  const { refresh } = appController;

  const navigate = useNavigate();
  const [searchParams, ] = useSearchParams();
  const query = searchParams.get("query");

  const [data, setData] = useState([]);
  const [querySearched, setQuerySearched] = useState(false);
  const [content, setcontent] = useState([]);
  
  useEffect(() => {
    let mounted = true;
    if (refresh) {
      setRefresh(appDispatch, false);
    }
    
    const fetchData = async () => {
    // TODO: API fetch query
    await fetch("http://localhost:8080/api/comments/", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(response => {
        if (mounted) {
          // console.log(response)
          setData(response)
        }
      })
      .catch((e) => {
        toast.error(`Error fetching data: ${e}`);
      })
    }

    fetchData().then(() => {setQuerySearched(true)});

    return(() => mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, refresh])

  return (
    <Fragment>
      {querySearched ? 
      <Grid container spacing={2}>
      {data.map((comment, idx) => (
        <Grid comment key={idx} xs={12} sm={6} md={4}>
          {console.log(comment)}
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  {comment.id}
                </Typography>
              </Stack>
              <Divider light />
              <Box px={1} mt={1} sx={{overflow:'auto' }}>
                {comment.content}
              </Box>
              <Divider light />
            </CardContent>
            <CardActions>
              <Button variant="outlined" size="small" onClick={() => navigate(`/comment?id=${comment.id}`)} fullWidth>View</Button>
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
export default Comments;