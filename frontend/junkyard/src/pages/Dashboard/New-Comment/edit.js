import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Form from "./form";

const API_URL = 'http://localhost:8080'

const Edit = () => {
  const { id } = useParams()
  const [comment, setComment] = useState({})

  const fetchComment = async () => {
    return await fetch(`${API_URL}/api/comments/${id}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(res => setComment(res))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchComment()
  }, [])


  return (
    <Form action="update" id={id} comment={comment} />
  )
}

export default Edit;