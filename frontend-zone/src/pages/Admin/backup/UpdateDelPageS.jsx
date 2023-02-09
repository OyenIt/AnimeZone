import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './UpdateDelPageS.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';

import DatePicker from "react-datepicker";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getYear";
import "react-datepicker/dist/react-datepicker.css";

import bg from '../../assets/footer-bg.jpg';

const UpdateDelPageS = () => {
  
  const [series,setseries] = useState("")
  const [title,settitle] = useState("")
  const [link_360,setlink_360] = useState("")
  const [link_480,setlink_480] = useState("")
  const [link_720,setlink_720] = useState("")
  const [link_1080,setlink_1080] = useState("")
  const [link1_360,setlink1_360] = useState("")
  const [link1_480,setlink1_480] = useState("")
  const [link1_720,setlink1_720] = useState("")
  const [link1_1080,setlink1_1080] = useState("")
  const [stream_link,setstream_link] = useState("")
  const [upload_at, setupload_at] = useState(new Date())
  const [slug,setslug] = useState("")
  const [items, setItems] = useState([])
  const [id_item, setidItem] = useState(0)
  const range = (start, end) => {
      return new Array(end - start).fill().map((d, i) => i + start);
      };
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
  ];
  
  const { secret} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if(secret !== undefined){
      if (secret !== "koderahasia") {
        navigate('/')
      }else{
        fetch(apiConfig.baseUrl+"api/enjeSubItem/",{
          method:'GET',
          headers : {
            'Content-Type':'application/json',
          }
          
        }).then((res) => {
          if (res.ok) return res.json()
        }).then((res) => setItems(res)).catch((err) => console.log(err));
      }
    }else{
      navigate('/')
    }
    
  }, [])
  const [rowIndexClicked, setRowIndexClicked] = useState(null);
  const handlerRowClicked = (rowIndex,id) => (event) => {
    if (rowIndexClicked !== rowIndex) {
      // handle if user clicks again the same row
      setRowIndexClicked(rowIndex);
      setidItem(id)
    } else {
      setRowIndexClicked(null); // set clicked row to null if same row is selected
    }
  };
  const showUpdate  = () =>{
    items.map((val, key) =>{
      if(val.id === id_item)
      {
        setseries(val.series)
        settitle(val.title)
        setupload_at(val.upload_at)
        setlink_360(val.link_360[0])
        setlink1_360(val.link_360[1])
        setlink_480(val.link_480[0])
        setlink1_480(val.link_480[1])
        setlink_720(val.link_720[0])
        setlink1_720(val.link_720[1])
        setlink_1080(val.link_1080[0])
        setlink1_1080(val.link_1080[1])
        setstream_link(val.stream_link)
      }
   })
  };
  return (
    <>
    <div className="banner" style={{backgroundImage: `url(${bg})`}}></div>
    <div className="mb-3 movie-content container">
        <div className="movie-content__poster">
          <table>
            <tr>
              <th>Title</th>
              <th>Series</th>
              
            </tr>
            {items.map((val, key) => {
              return (
                <tr
                key={key}
                id={key}
                className={rowIndexClicked === key ? "clicked-class" : ""}
                onClick={handlerRowClicked(key,val.id)}
              >
                  <td>{val.title}</td>
                  <td>{val.series}</td>
                </tr>
              )
            })}
          </table>
          
          
        </div>
    </div>
    </>
  )
}

export default UpdateDelPageS;