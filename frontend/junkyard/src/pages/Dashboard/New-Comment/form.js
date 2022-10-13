import { useState, useEffect } from 'react'; 
import { Button, FormControl, Input, InputLabel } from '@mui/material/';
// import { useNavigate } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";

const Form = ({ action, id, comment }) => {
  const navigate = useNavigate();
  const [searchParams, ] = useSearchParams();
  id = parseInt(searchParams.get("id"));
  
  const [values, setValues] = useState({
    content:'',
    garage_id: id, // TO BE CHANGED
    uid: 'useruidhere123', // TO BE CHANGED 
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(values)

    let url = `http://localhost:8080/api/comments/`
    let method = 'POST'

    if (action === 'update') {
      url += `${values.comment_id}`
      method = 'PUT'
    }

    return await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then((response) => response.json())
      .then(() => navigate(`/dashboard/comments`))
      .catch(error =>console.log(error)
    )
  }
  
  useEffect(() => {
    if(comment === null) return
    if (Object.keys(comment).length === 0) return
    
    setValues({
      ...comment,
      'content': comment.content,
    })
  }, [comment])
  

  return(
    <>
      <h2>{ action === 'create' ? 'New' : 'Edit'} comment</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth={true} margin="none">
            <FormControl variant="standard" fullWidth={true}>
              <InputLabel htmlFor="component-content">Content</InputLabel>
              <Input id="component-content" value={values.content} onChange={handleChange('content')} fullWidth={true} />
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