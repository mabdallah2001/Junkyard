import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Form from "./form";


const New = () => {
  const [comment, setComment] = useState({})
  const [searchParams, ] = useSearchParams();
  const id = searchParams.get("id");



  return (
    <Form action="create" id={id} comment={comment} />
  )
}

export default New;

