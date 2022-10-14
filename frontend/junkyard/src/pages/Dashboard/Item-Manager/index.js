import { useState, useEffect } from 'react';
import { Container, Grid, Typography, Input, FormControl, Button } from '@mui/material/';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const ItemManager = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [items, setItems] = useState({});
  const [values, setValues] = useState({
    name: '',
    quantity: '',
    image_url: '',
    description: '',
    price: '',
    garage_id: 1, // TO BE CHANGED
    uid: user.id,
  })

  const fetchItems = async () => {
    return await fetch("http://localhost:8080/api/items/", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(resp => setItems(resp))
      .catch(error => console.log(error)
      )
  }

  useEffect(() => {
    fetchItems()
  }, []);

  useEffect(() => {
    console.log(values)
  }, [values]);

  const handleChange = (item, prop) => (event) => {
    setValues({
      ...item,
      price: item.price.toString(),
      [prop]: event.target.value
    })
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.action.hover,
      fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(values);

    fetch(`http://localhost:8080/api/items/${values.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then((response) => response.json())
      .then(() => toast.success("Success!"))
      .catch(error =>console.log(error)
    )
  }

  const deleteItem = (id) => {
    fetch(`http://localhost:8080/api/items/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then(() => {
        fetchItems()
        toast.success("Successfully delete an item!")
      })
      .catch(error => console.log(error)
    )
  }

  

  return(
    <>
      <Typography variant='h4'>
        Item Manager
      </Typography>
      
      <TableContainer component={Paper} mt={2}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Item Name</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 && items.map((item) => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">
                  <form onSubmit={handleSubmit}>
                    <FormControl variant="standard">
                      <Input
                        id="standard-basic"
                        onChange={handleChange(item, 'quantity')}
                        variant="standard"
                        defaultValue={item.quantity}
                        type="number"
                      />
                    </FormControl>
                  </form>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default ItemManager;