import React from 'react';
import {ColorRing} from 'react-loader-spinner';


const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <ColorRing type='Circle' color='#00bfff' height={50} width={50} className="m-5"/>
      <p className='text-lg text-center px2'>{message}</p>
    </div>
  )
}

export default Spinner