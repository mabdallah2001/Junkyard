import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import Items from "../Items/index";
import {toast} from "react-toastify"
import { Container, Grid, Button, Link, Typography } from '@mui/material/';
import CommentCard from '../../../components/CommentContainer/CommentView';
import New from '../../Dashboard/New-Comment/new';

import { useAuthController, useAppController, setRefresh } from '../../../context';
import axios from 'axios';

function Garage() {

  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [garID, setGarID] = useState(parseInt(searchParams.get('id')));
  const [authController,] = useAuthController();
  const { user } = authController;

  const [appController, appDispatch] = useAppController();
  const { refresh } = appController;

  const navigate = useNavigate();
  const id = searchParams.get("id");
  const [comments, setComments] = useState([]);

  useEffect (() => {
    let mounted = true;
    axios.get("http://localhost:8080/api/garage/" + garID)
    .then(function(response){
      if (mounted) {
        setData([response.data]);
      }
    })
    .catch((e) => toast.error(`Unable to retrieve garages: ${e}`));


    return (() => mounted = false);
  }, []);

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
   <Grid textAlign={"center"}>
    <Grid>
   
      {data.map((item) => (
        <Grid item>
          <Typography fontSize={30} fontWeight={"bold"}>
            {item.id}. {item.name}
          </Typography>
          <Typography >
            {item.address1}, {item.city} {item.postcode}, {item.country}
          </Typography>
          <img
           src={item.image_url}
           srcSet={item.image_url}
           alt={item.name}
           loading="lazy"
           style={{maxHeight: 500, marginTop: 30}}
          
          />
          
        </Grid>
        ))}

      <Grid container item p={0} m={0} xs={10} direction="column" mb={8}>
        <Typography fontSize={27} fontWeight={"bold"} mt={10} ml={20} mb={8} >
          Garage Items
        </Typography>
        <Items />
      </Grid>
      {user && <New/>}
          <Container maxWidth="lg" p={0} mt={5}>
            <Grid container spacing={3}>
              {comments.map((item, idx) => (
                <Grid item sm={4} md={4} key={idx}>
                  <CommentCard data={item} />
                </Grid>
              ))}
            </Grid>
          </Container>
    </Grid>
    </Grid>
    
  )
}
export default Garage;