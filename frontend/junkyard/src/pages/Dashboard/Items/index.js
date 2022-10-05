import { useState, useEffect } from 'react';
import { Container, Grid, Button, Link } from '@mui/material/';

import ItemCard from "../../../components/ItemContainer/index";

const Items = () => {
  const [items, setItems] = useState([]);

  // TO DO: CHANGE API TO CALL ITEM LIST FOR THIS USER ONLY
  const fetchItems = async () => {
    return await fetch("http://localhost:8080/api/items/", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(resp => setItems(resp))
      .catch(error => console.log(error)
      )
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <>
      <Container maxWidth="lg" pb={2}>
        <Link href="/dashboard/new-item" underline="none">
          <Button variant="contained" pb={2}>Create Item</Button>
        </Link>
      </Container>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {items.map(item => (
            <Grid item sm={4} md={4} key={item.id}>
              <Link href={`item/${item.id}`} underline="none">
                <ItemCard key={item.id} item={item} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
export default Items;