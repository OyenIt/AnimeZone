import React, { useState, useEffect } from 'react'

import apiConfig from "../../api/apiConfig"
import { useParams } from 'react-router'
import './displayStream.scss'


const LinkDownload = props => {
    const id_item = props.id_item
    const [item, setItem] = useState([])
    useEffect(() => {
      fetch(apiConfig.baseUrl + `Anime/sub/${id_item}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((res) => setItem(res))
        .catch((err) => console.log(err));
    }, [])

  return (
    // <iframe
    // className='background-video'
    // src="https://www.youtube.com/embed/${}"
    // type="video/mp4"
    // autoPlay
    // controls
    // ></iframe>
    <>
    {item.map((items, i) => (
      <h1>Item : {items.stream_link} </h1>
    ))}
    </>
  )
}

export default LinkDownload