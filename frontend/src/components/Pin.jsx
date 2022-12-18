import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'; // for post uuid
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../clients';
import { fetchUser } from '../utils/fetchUser';


const saveButtonStyle = `bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none`;

const Pin = ({pin : {posted, image, _id, destination, save}}) => {
  const navigate = useNavigate();

  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const imgOptTag = urlFor(image).width(250).url();

  const user = fetchUser();

  // check if user has already saved the post
  const alreadySaved = !!(save?.filter((item)=> item?.postedBy?._id === user.sub))?.length; // return array of item that matched ,fillter wrap in ().length to check the number of array, if > 0 == saved
  // // [1].length -> 1 -> !1 > false -> !false = true
  // // [ ].length -> 0 -> !0 > true -> !true = false

  // ?.length = > Optional chaining : If the object is undefined or null, it returns undefined instead of throwing an error.
  
  // save pin
  const savePin = (id) => {
    console.log("inside save pin",id)
    if (!alreadySaved) {
      setSavingPost(true);
      console.log("alreadySaved?.length === 0")

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userID: user?.sub,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.sub,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };


  // delete the pin that was posted by the user
  const deletePin = (id) =>{
    client.delete(id)
    .then(()=> {
      window.location.reload();
    })
  }

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
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <a href={`${image?.asset?.url}?dl=`}
                  download={_id}
                  onClick={(e)=> e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved? (
                <button type='button' className={saveButtonStyle}>
                  {save?.length} Saved
                </button>
              ) : (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type='button' className={saveButtonStyle}
                >
                  { savingPost? 'Saving': 'Save'}
                </button>
              )}
            </div>
            <div className='flex justify-between items-center gap-4 w-full'>
              { destination && (
                <a
                  href={destination}
                  target="_black"
                  rel="noreferrer"
                  className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'

                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.indexOf('//') > 0 ? destination.split('//')[1].split('/')[0] : destination}
                </a>
              )}
              {posted?._id === user.sub && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  type='button' className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none'
                > 
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {posted?._id === user.sub && (
        <Link to={`user-profile/${user?.sub}`}
          className="flex gap-2 mt-2 items-center"
        >
          <img 
            className="w-8 h-8 rounded-full object-cover"
            src={posted?.image}
            alt="user-profile"
            referrerPolicy="no-referrer"
          />
          <p className="font-semibold capitalize">{posted?.userName}</p>
        </Link>
      )}
    </div>
  )
}

export default Pin