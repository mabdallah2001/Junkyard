import * as React from 'react';

//MUI 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

//Navigate
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
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Comment ID: {id}
        </Typography>
        <Divider light />
        <Box px={1} mt={1} sx={{overflow:'auto' }}>
          {content}
        </Box>
      </CardContent>
    </Card>
  );
}

export default CommentCard;
