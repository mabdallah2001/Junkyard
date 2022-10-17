import { useState, useEffect } from 'react'; 
import { Button, Container, FormControl, Input, InputLabel } from '@mui/material/';
// import { useNavigate } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";

import { useAuthController, useAppController, setRefresh } from '../../../context';

import { toast } from 'react-toastify';

const Form = ({ action, id, comment }) => {

  const [authController, ] = useAuthController();
  const { user } = authController;
  const [, appDispatch] = useAppController();

  const navigate = useNavigate();
  const [searchParams, ] = useSearchParams();
  id = parseInt(searchParams.get("id"));
  
  const [values, setValues] = useState({
    content:'',
    garage_id: id, // TO BE CHANGED
    uid: user.uid, // TO BE CHANGED 
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(values)

    let url = `http://localhost:8080/api/comments/`
    let method = 'POST'
    let navi = `/garage?id=${id}`

    if (action === 'update') {
      url += `${values.comment_id}`
      navi = `/dashboard/comments`
      method = 'PUT'
    }

    return await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        };
        throw new Error('Unable to create comment');
      })
      .then(() => {
        setRefresh(appDispatch, true);
      })
      .then(() => {
        navigate(navi);
      })
      .catch(error => toast.error(`Failed to create comment: ${error}`))
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
      <Container>
      <h2>{ action === 'create' ? 'New' : 'Edit'} comment</h2>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth={true} margin="none">
            <FormControl variant="standard" fullWidth={true}>
              <InputLabel htmlFor="component-content">Content</InputLabel>
              <Input id="component-content" value={values.content} onChange={handleChange('content')} fullWidth={true} />
            </FormControl>
            <br />
            
          </FormControl>
          <Button variant="contained"  sx={{color:'white', backgroundColor:'#102027', borderRadius:'25px'}}  type="submit">Submit</Button>
        </form>
      </Container>
        
    </>
  )
}

export default Form;