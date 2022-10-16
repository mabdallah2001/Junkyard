import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import Items from "../Items/index";
import { Grid, Typography } from '@mui/material/';
import {toast} from "react-toastify"

import axios from 'axios';

function Garage() {

  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [garID, setGarID] = useState(parseInt(searchParams.get('id')));

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

  return (
    <Grid container spacing={2} mt={5}>
    
      {data.map((item) => (
        <Grid item>
          <img
           src={item.image_url}
           srcSet={item.image_url}
           alt={item.name}
           loading="lazy"
           style={{maxHeight: '20%'}}
          />
          <Typography fontSize={30}>
            {item.id}. {item.name}
          </Typography>
          <Typography>
            {item.address1}, {item.city} {item.postcode}, {item.country}
          </Typography>
        </Grid>
        ))}

      <Grid container item p={0} m={0} xs={10} direction="column">
        <Items />
      </Grid>
    </>
  )
}
export default Comments;