import { useState, useEffect } from 'react';
import { Container, Grid, Button, Link } from '@mui/material/';

import { useSearchParams, useNavigate } from "react-router-dom";

import CommentCard from '../../../components/CommentContainer/CommentView';
import New from '../../Dashboard/New-Comment/new';

import { useAuthController, useAppController, setRefresh } from '../../../context';

const Comments = () => {

  const [authController,] = useAuthController();
  const { user } = authController;

  const [appController, appDispatch] = useAppController();
  const { refresh } = appController;

  const navigate = useNavigate();
  const [searchParams, ] = useSearchParams();
  const id = searchParams.get("id");
  const [comments, setComments] = useState([]);

  // TO DO: CHANGE API TO CALL COMMENT LIST FOR THIS USER ONLY
  const fetchComments = async () => {
    return await fetch(`http://localhost:8080/api/comments/garage/${id}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(resp => setComments(resp))
      .catch(error => console.log(error)
      )
  }

  useEffect(() => {
    fetchComments();
    if (refresh) {
      setRefresh(appDispatch, false);
    }
  }, [refresh])

  return (
    <>
      {user && <New/>}
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