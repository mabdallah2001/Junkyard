import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Button, Link } from '@mui/material/';


const Item = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const [item, setItem] = useState({});

  const fetchItems = async () => {
    return await fetch(`http://localhost:8080/api/items/${id}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(resp => setItem(resp))
      .catch(error => console.log(error)
      )
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Typography variant="h4" mt={4}>
            {item.name}
          </Typography>

          <br></br>
          <Typography variant="p" mt={5}>
            {item.description}
          </Typography>
        </Grid>
      </Container>

      <br></br>

      <Button variant="contained" pb={2} onClick={() => navigate(`/dashboard/edit-item/${id}`)}>
        Edit Item
      </Button>
    </>
  )
}
export default Item;