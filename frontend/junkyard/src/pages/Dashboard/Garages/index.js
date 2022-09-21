import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";


function Garages() {
  const navigate = useNavigate();

  return (
    <>
        <br></br>
        <Typography variant="h5" gutterBottom>
          Your Garages
        </Typography>
        <br></br>

        <Grid container>

          

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



    <Grid item xs={3}>

    <Card sx={{ maxWidth: 250}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image="https://www.thespruce.com/thmb/OSikhwOUp996sGOElb_FwcgkwSs=/2576x2576/smart/filters:no_upscale()/upscale-residential-house-has-neat-garage-168531302-588389105f9b58bdb36b0226.jpg"
            alt="garage_pic"
          />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Camperdown
          </Typography>
          

        <Grid container>
          <Grid item ml={11} >


          <Button size="small" onClick={() => navigate("/dashboard/garage")}>Edit</Button>
          <Button size="small">Delete</Button>

          </Grid>
        </Grid>

         
        </CardContent>
      </CardActionArea>
    </Card>

    </Grid>

    <Grid item xs={3}>

    <Card sx={{ maxWidth: 250 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image="http://www.outdoorgaragesandsheds.com.au/wp-content/uploads/2017/04/IMG_0209.jpg"
            alt="default_garage"
          />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Manly
          </Typography>

          <Grid container>
          <Grid item ml={11} >


          <Button size="small" onClick={() => navigate("/dashboard/garage")}>Edit</Button>
          <Button size="small">Delete</Button>

          </Grid>
        </Grid>
         
        </CardContent>
      </CardActionArea>
    </Card>

    </Grid>

    </Grid>
    </>
  )
}
export default Garages;