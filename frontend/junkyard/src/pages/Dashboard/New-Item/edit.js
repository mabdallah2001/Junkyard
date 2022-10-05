import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Form from "./form";

const API_URL = 'http://localhost:8080'

const Edit = () => {
  const { id } = useParams()
  const [item, setItem] = useState({})

  const fetchItem = async () => {
    return await fetch(`${API_URL}/api/items/${id}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(res => setItem(res))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchItem()
  }, [])


  return (
    <Form action="update" id={id} item={item} />
  )
}

export default Edit;