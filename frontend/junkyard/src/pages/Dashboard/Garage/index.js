import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';






function Garage() {
  
  const navigate = useNavigate();

  const [garName, setGarName] = useState();
  const [image, setImage] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [post, setPost] = useState();
  const [country, setCountry] = useState();
  const [description, setDescription] = useState();
  
  return (
    <>
     <Typography variant="h5" gutterBottom>
        Add / Update Garage
      </Typography>
      <br></br><br></br>
<Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="garagename"
            name="garageName"
            label="Garage Name"
            fullWidth
            variant="standard"
            onChange={event => setGarName(event.target.value)}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="imageURL"
            name="imageURL"
            label="Image URL"
            fullWidth
            variant="standard"
            onChange={event => setImage(event.target.value)}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            onChange={event => setAddress1(event.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            onChange={event => setAddress2(event.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City / Suburb"
            fullWidth
            onChange={event => setCity(event.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={event => setState(event.target.value)}
          />


        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="postal"
            name="postal"
            label="Zip / Postal code"
            fullWidth
            onChange={event => setPost(event.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            variant="standard"
            onChange={event => setCountry(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            label="Description"
            fullWidth
            onChange={event => setDescription(event.target.value)}
            variant="standard"
            
          />
          </Grid>
        </Grid>

        <Button variant="contained" sx={{ mt: 10, ml: 63 }} onClick={() => navigate("/dashboard/garages")}>Save Changes</Button>



    </>
  )
}
export default Garage;