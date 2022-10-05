import { useState, useEffect } from 'react'; 
import { Button, FormControl, Input, InputLabel } from '@mui/material/';
import { useNavigate } from "react-router-dom";

const Form = ({ action, id, item }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    quantity: '',
    image_url: '',
    description: '',
    price: '',
    garage_id: 1, // TO BE CHANGED
    uid: 'useruidhere123', // TO BE CHANGED 
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(values)

    let url = "http://localhost:8080/api/items/"
    let method = 'POST'

    if (action === 'update') {
      url += `${id}`
      method = 'PUT'
    }

    return await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then((response) => response.json())
      .then(() => navigate("/dashboard/items"))
      .catch(error =>console.log(error)
    )
  }
  
  useEffect(() => {
    if(item === null) return
    if (Object.keys(item).length === 0) return
    
    setValues({
      ...item,
      'price': item.price.toString(),
      'quantity': item.quantity.toString()
    })
  }, [item])
  

  return(
    <>
      <h2>{ action === 'create' ? 'New' : 'Edit'} item</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth={true} margin="none">
            <FormControl variant="standard" fullWidth={true}>
              <InputLabel htmlFor="component-name">Name</InputLabel>
              <Input id="component-name" value={values.name} onChange={handleChange('name')} fullWidth={true} />
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="component-quantity">Quantity</InputLabel>
              <Input id="component-quantity" value={values.quantity} onChange={handleChange('quantity')} />
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="component-img">Image URL</InputLabel>
              <Input id="component-img" value={values.image_url} onChange={handleChange('image_url')} />
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="component-description">Description</InputLabel>
              <Input id="component-description" value={values.description} onChange={handleChange('description')} />
            </FormControl>
            <br />
            <FormControl variant="standard">
              <InputLabel htmlFor="component-price">Price</InputLabel>
              <Input id="component-price" value={values.price ? values.price.toString() : ""} onChange={handleChange('price')} />
            </FormControl>
            <br />
          </FormControl>
          <Button variant="contained" type="submit">Submit</Button>
        </form>
      </div>
        
    </>
  )
}

export default Form;