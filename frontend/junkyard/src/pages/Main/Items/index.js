import { useState, useEffect } from "react";
import { Container, Grid } from '@mui/material/';

import ItemCard from "../../../components/ItemContainer/index";

const Items = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    return await fetch("http://localhost:8080/api/items/", { 
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(resp => setItems([...resp, ...resp])) // TO BE REMOVED
      .catch(error =>console.log(error)
    )
  }

  useEffect(() => { 
    fetchItems()
  }, [])

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {items.map(item => (
          <Grid item sm={4} md={4}>
            <ItemCard key={item.id} item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
	)
}
export default Items;