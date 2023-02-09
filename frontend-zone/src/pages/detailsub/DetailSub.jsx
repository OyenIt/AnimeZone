import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './DetailSub.scss';
import ListSeries from './ListSeries';
import apiConfig from '../../api/apiConfig';

const DetailSub = () => {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    useEffect(() => {
        fetch(apiConfig.baseUrl+`film/details/${id}`,{
          method:'GET', 
          headers : {
            'Content-Type':'application/json',
          }
          
        }).then((res) => {
          if (res.ok) return res.json()
        }).then((res) => setItem(res)).catch((err) => console.log(err));
    }, [])

  return (
    <>
    {item.map((items,ky) =>
        <>
        <div className="mb-3 movie-content container">
           <ListSeries />
        </div>
        </>
    )}
    
    </>
  )
}

export default DetailSub