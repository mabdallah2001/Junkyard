import Items from "../Items/index";
import { Grid } from '@mui/material/';

function Garage() {
  return (
    <Grid container spacing={2} mt={5}>
      <Grid container item p={0} m={0} xs={2} direction="column">
        Garage details & comments
      </Grid>
      <Grid container item p={0} m={0} xs={10} direction="column">
        <Items />
      </Grid>
    </Grid>
  )
}
export default Garage;