import { useState, useEffect } from 'react';
import { Container, Grid, Button, Link } from '@mui/material/';

import { useNavigate } from 'react-router-dom';

import CommentCard from '../../../components/CommentContainer/CommentContainer';
import { useAuthController } from "../../../context";

const Comments = () => {

  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [authController] = useAuthController();
  const { user } = authController;
  console.log(user.uid);

  // TO DO: CHANGE API TO CALL COMMENT LIST FOR THIS USER ONLY
  const fetchComments = async () => {
    return await fetch("http://localhost:8080/api/comments/user/useruidhere123", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(resp => setComments(resp))
      .then(this.$router.go(0))
      .catch(error => console.log(error)
      )
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <>
      <Container maxWidth="lg" pb={2}>
      </Container>
      <br></br>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {comments.map((item, idx) => (
            <Grid item sm={4} md={4} key={idx}>
              <CommentCard data={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
export default Comments;