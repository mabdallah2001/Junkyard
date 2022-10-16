import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Button, Link,Divider,Box } from '@mui/material/';


const Comment = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const [comment, setComment] = useState({});

  const fetchComments = async () => {
    return await fetch(`http://localhost:8080/api/comments/${id}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(resp => setComment(resp))
      .catch(error => console.log(error)
      )
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Typography variant="h4" mt={4}>
            {comment.id}
          </Typography>
          <Divider light />
          <br></br>
          <Box px={1} mt={1} sx={{overflow:'auto' }}>
            {comment.content}
          </Box>
        </Grid>
      </Container>
      <Divider light />
      <br></br>

      <Button variant="contained" sx={{color:'white', backgroundColor:'#102027', borderRadius:'25px'}} pb={2} onClick={() => navigate(`/dashboard/edit-comment/${id}`)}>
        Edit Comment
      </Button>
    </>
  )
}
export default Comment;