import { useState, useEffect } from 'react'; 
import { Button, FormControl, Input, InputLabel } from '@mui/material/';

const Form = ({ action, id, item }) => {
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
      .then((res) => {
        console.log(res)
        debugger
        window.location.href = "/dashboard/items"
      })
      .catch(error =>console.log(error)
    )
  }

  useEffect(() => {
    console.log(values)
  }, [values])
  
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
          <FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-name">Name</InputLabel>
              <Input id="component-name" value={values.name} onChange={handleChange('name')} />
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
            <Button type="submit">Submit</Button>
          </FormControl>
        </form>
      </div>
        
    </>
  )
}

export default Form;