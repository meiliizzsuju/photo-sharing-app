import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../clients';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  // fetch posts, when category changes
   useEffect(() => {
    // while looking for post, show loading
    setLoading(true);
    // when search by categoryId
    if(categoryId){
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) =>{
        setPins(data);
        setLoading(false);
      })
    } else {
      // fetch feed
      client.fetch(feedQuery).then((data)=> {
        setPins(data);
        setLoading(false);
      })
    }
   }, [categoryId]);

  if(loading) return <Spinner message="We are loding new ideas to your feed..."/>

  return (
    <div>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
}

export default Feed