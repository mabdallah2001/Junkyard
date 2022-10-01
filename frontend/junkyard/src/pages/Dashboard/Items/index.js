import React from 'react';
import { useState, useEffect } from 'react'; 

function Items() {
  const [items, setItems] = useState([
    {
      id: 1,
      image_url: '',
      title: "Fancy clothes",
      description: "Lorem ipsum"
    }
  ]);

  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/todos/1')
  //     .then((response) => response.json())
  //     .then((data) => setItems(data))
  //     .catch((error) => console.log(error.message));
  // }, [])

  return (
    <>
      Items listaaa
    </>
  )
}
export default Items;