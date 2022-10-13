import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
 
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    
  </Box>
);

function CommentCard({data}) {
  const navigate = useNavigate();
  const { id, content } = data;
  
  return (
    <Card sx={{ minWidth: 275 }} onClick={() => navigate(`/dashboard/edit-comment/${id}`)}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Comemnt ID:{id}
        </Typography>
        <Typography variant="h5" component="div">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
}

export default CommentCard;
