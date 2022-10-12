import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';

function Account() {
  const navigate = useNavigate();

  return(
    <>
      <Button variant="contained" onClick={() => navigate("/dashboard/tier")}>Upgrade</Button>
    </>
  )
}
export default Account;