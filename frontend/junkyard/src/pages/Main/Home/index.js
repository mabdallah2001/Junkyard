import {useState} from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Stack } from '@mui/system';

import { useNavigate } from "react-router-dom";

import {toast} from 'react-toastify';

function Home() {

  const navigate = useNavigate();
  const [queryType, setQueryType] = useState('garage')

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const query = data.get('query')
    if (!query) {
      toast.error('Invalid query');
      return;
    };
    if (queryType === 'garage') {
      return navigate(`/garages?query="${query}"`);
    }
    if (queryType === 'item') {
      return navigate(`/items?query="${query}"`);
    }
  }

  return (
    <Box
      sx={{
        pt: 32,
        pb: 6,
        height: '80vh'
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Junkyard
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Search garages or items
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField id="query" name="query" label="Search" variant="filled" size='small' fullWidth/>
          <Stack direction={"row"} spacing={2} mt={2}>
            <Select
                value={queryType}
                label="Type"
                onChange={e => setQueryType(e.target.value)}
                sx={{width: '200px'}}
              >
                <MenuItem value={'garage'}>Garage</MenuItem>
                <MenuItem value={'item'}>Item</MenuItem>
              </Select>
              <Button variant="contained" type="submit" fullWidth>Search</Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
export default Home;