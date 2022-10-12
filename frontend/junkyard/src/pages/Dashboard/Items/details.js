import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Grid, Typography, Button } from '@mui/material/';


const Item = () => {
  const { id } = useParams()
  const location = useLocation()
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
        <Grid container spacing={3} style={{display: 'flex'}}>
          <Typography variant="h4" mt={4}>
            {item.name}
          </Typography>
          {item.quantity < 1 && 
            <div
              style={{
                display: "inline-block",
                height: "32px",
                fontSize: "13px",
                fontWeight: "500",
                color: "rgba(0,0,0,0.6)",
                lineHeight: "32px",
                padding: "0 12px",
                borderRadius: "16px",
                backgroundColor: "#e4e4e4",
                marginBottom: "5px",
                marginLeft: "10px",
                alignSelf: "self-end"
              }}
            >
              Sold out
            </div>
          }
        </Grid>
        <Grid container spacing={3} m={0}>
        </Grid>
        <Grid container spacing={3}>
          <Typography variant="h6" mt={4}>
            {`$ ${item.price}`}
          </Typography>
        </Grid>
      </Container>

      <Grid container spacing={2} mt={5}>
        <Grid container item p={0} m={0} xs={6} direction="column">
          <Container m={0} style={{padding: '0', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <img
              src={item.image_url}
              srcSet={item.image_url}
              alt={item.name}
              loading="lazy"
              style={{maxWidth: '100%'}}
            />
          </Container>
        </Grid>
        <Grid container item xs={6} direction="column" >
          <Typography variant="p" mt={4}>
            {item.description}
          </Typography>
        </Grid>
      </Grid>

      {location.pathname.includes("dashboard") && 
        <Grid container spacing={2} mt={5}>
          <Button variant="contained" pb={2} mt={2} onClick={() => navigate(`/dashboard/edit-item/${id}`)}>
            Edit Item
          </Button>
        </Grid>
      }
    </>
  )
}
export default Item;