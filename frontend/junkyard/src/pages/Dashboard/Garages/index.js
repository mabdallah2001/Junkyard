import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useAuthController } from "../../../context";

function Garages() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState()

  const [authController, authDispatch] = useAuthController();
  const { user } = authController;


  useEffect (() => {
    let mounted = true;
    axios.get("http://localhost:8080/api/garage/" )
    .then(function(response){
      if (mounted) {
        setData(response.data);
      }
    })
    .catch((e) => toast.error(`Unable to retrieve garages: ${e}`));

    return (() => mounted = false);
  }, []);

  const handleClickOpen = (garID) => {
    setOpen(true);
    setDeleteID(garID);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteFunc = (garID) => {
    setData((prevState) => prevState.filter((item) => item.id !== garID));
    setOpen(false);
    axios.delete("http://localhost:8080/api/garage/" + garID);
  }

  return (
    <>
      <Typography variant="h5" gutterBottom mb={2}>
        Your Garages
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 250, height:351}} onClick={ () => navigate(`/dashboard/garage`)}>
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
                <img
                 src={item.image_url}
                 srcSet={item.image_url}
                 alt={item.name}
                 loading="lazy"
                 style={{maxWidth: '100%'}}
                 onClick={() => navigate(`/dashboard/item-manager?id=${item.id}`)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Grid container>
                    <Grid item ml={11} >
                      <Button size="small" onClick={() => navigate(`/dashboard/garage?gid=${item.id}`)}>Edit</Button>
                      <Button size="small" onClick={() => handleClickOpen(item.id)}>Delete</Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Garage?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Garage? This is an irreversible operation. Deleting garage will also delete all items that might be inside it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => deleteFunc(deleteID)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default Garages;