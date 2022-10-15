import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Button, Link } from '@mui/material/';


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

          <br></br>
          <Typography variant="p" mt={5}>
            {comment.content}
          </Typography>
        </Grid>
      </Container>

      <br></br>

      <Button variant="contained" pb={2} onClick={() => navigate(`/dashboard/edit-comment/${id}`)}>
        Edit Comment
      </Button>
    </>
  )
}
export default Comment;