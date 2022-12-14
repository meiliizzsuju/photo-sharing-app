import React from 'react';
import Maysonry from 'react-masonry-css';

import Pin from './Pin';

// set up break point for masonry display
const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1
}

const MasonryLayout = ({pins}) => {
  return (
    <Maysonry className='flex animate-slide-fwd' breakpointCols={breakpointObj}>
      {/* if pins is not empty then  */}
      {pins?.map((pin)=> <Pin key={pin._id} pin={pin} className='w-max'/>)}
    </Maysonry>
  )
}

export default MasonryLayout