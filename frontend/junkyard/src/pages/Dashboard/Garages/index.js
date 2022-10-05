import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"

const dummyData = [
  {
    id: 1,
    name: "Garage Name 1",
    image: "https://source.unsplash.com/random"
  },
  {
    id: 2,
    name: "Garage Name 2",
    image: "https://source.unsplash.com/random"
  },
  {
    id: 3,
    name: "Garage Name 3",
    image: "https://source.unsplash.com/random"
  }
]

function Garages() {
  const navigate = useNavigate();

  const [data, setData] = useState(dummyData);

  return (
    <>
      <Typography variant="h5" gutterBottom mb={2}>
        Your Garages
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 250, height:351}} onClick={ () => navigate("/dashboard/garage")}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                image="https://findicons.com/files/icons/1014/ivista/256/plus.png"
                alt="garage_pic"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Add Garage
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        {data.map((item, idx) => (
          <Grid item key={idx} xs={3}>
            <Card sx={{ maxWidth: 250}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image= {item.image}
                  alt="image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.name}
                  </Typography>
                <Grid container>
                  <Grid item ml={11} >
                    <Button size="small" onClick={() => navigate(`/dashboard/garage?gid=${item.id}`)}>Edit</Button>
                    <Button size="small">Delete</Button>
                  </Grid>
                </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
export default Garages;