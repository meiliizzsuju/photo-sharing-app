import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'; // for post uuid
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwoToneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFull } from 'react-icons/bs';

import { client, urlFor } from '../clients';

const Pin = ({pin : {postedBy, image, _id, destination}}) => {
  const navigate = useNavigate();

  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const imgOptTag = urlFor(image).width(250).url();
  


  return (
    <div className='m-2 '>
      <div
        onMouseEnter={()=> setPostHovered(true)}
        onMouseLeave={()=> setPostHovered(true)}
        onClick={()=> navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
        <img src={imgOptTag} alt="user-post" className='rounded-lg w-full'/>

        {postHovered && (
          <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
            style={{height: '100%'}}
          >
            <div className='flex items-center jusify-between'>
              <div className='flex gap-2'>
                <a href={`${image?.asset?.url}?dl=`}
                  download={_id}
                  onClick={(e)=> e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline />
                </a>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Pin