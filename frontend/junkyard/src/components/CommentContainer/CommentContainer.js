import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

import { useAppController, setRefresh } from '../../context';
 
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    
  </Box>
);


function CommentCard({data}) {
  const [, appDispatch] = useAppController();

  const navigate = useNavigate();
  const { id, content } = data;

  const handleDelete = async(e) => {
    e.preventDefault()

    let url = `http://localhost:8080/api/comments/${id}`
    let method = 'DELETE'
    let navi = `/dashboard/comments`


    return await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then(() => setRefresh(appDispatch, true))
      .then(() => navigate(navi))
      .catch(error =>console.log(error)
    )
  }
  
  return (
    <Card  sx={{ minWidth: 275 ,marginbottom: 20,
      alignitems: "center",
      flexdirection: "column",
      backgroundColor:'lightgray',
      borderradius: 35 }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Comemnt ID:{id}
        </Typography>
        <Divider light />
        <Box px={1} mt={1} sx={{overflow:'auto' }} color="text.primary">
          {content}
        </Box>
      </CardContent>
      <Divider light />
      <CardActions>
        <Button variant="outlined" sx={{color:'white', backgroundColor:'#102027', borderRadius:'25px'}}  size="small" onClick={() => navigate(`/dashboard/edit-comment/${id}`)}>Edit</Button>
        <Button variant="outlined" sx={{color:'white', backgroundColor:'#102027', borderRadius:'25px'}}  size="small" onClick={handleDelete}>Delete</Button>
      </CardActions>
    </Card>
  );
}

export default CommentCard;
