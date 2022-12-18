import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../clients';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';

const PinDetails = ({ user }) => {
  const { pinId } = useParams(); // Id of the current post, URL from "/pin-detail/:pinId" dynamic params in Pins.jsx
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false); // is user currenty adding comment

  // fetch pin detal from database
  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]); // get individual pin first
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]); // then find the related pin to the pin (similar pin, similar title)
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  // adding comment
  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ 
          comment, 
          _key: uuidv4(), 
          postedBy: { 
            _type: 'postedBy', 
            _ref: user._id 
          } 
        }])
        .commit() // every insert needs commit
        .then(() => {
          fetchPinDetails();
          setComment(''); // reset comment field
          setAddingComment(false);
        });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]); // only change when pin id change


  // useEffect must be called before if statement if there was one

  if (!pinDetail) return <Spinner message="Loading pin detail" />


  return (
    <>
      <div className='flex xl:flex-row flex-col m-auto bg-white' style={{ maxWidth: '1500px', borderRadius: '32px' }}>
        <div className='flex justify-center items-center md:items-start flex-initial'>
          <img
            src={(pinDetail?.image && urlFor(pinDetail?.image).width(500).url())}
            className="rounded-t-3xl rounded-b-lg w-full"
            alt="pin"
          />
        </div>
        <div className='w-full p-5 flex-1 xl:min-w-620'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <a href={`${pinDetail.image.asset.url}?dl=`}
              download
              className='bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100'
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetail.destination} target="_blank" rel="noreferrer">
              {pinDetail.destination.indexOf('//') > 0 ? pinDetail.destination.split('//')[1].split('/')[0] : pinDetail.destination}
            </a>
          </div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {pinDetail.title}
            </h1>
            <p className="mt-3">{pinDetail.about}</p>
        </div>
        <Link to={`/user-profile/${pinDetail?.posted?._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
          <img src={pinDetail?.posted.image} className="w-10 h-10 rounded-full" alt="user-profile" referrerPolicy="no-referrer"/>
          <p className="font-bold">{pinDetail?.posted.userName}</p>
        </Link>
        <h2 className="mt-5 text-2xl">Comments</h2>
        <div className="max-h-370 overflow-y-auto">
          {pinDetail?.comments?.map((comment) => (
            <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={comment.comment}>
              <img
                src={comment.postedBy?.image}
                className="w-10 h-10 rounded-full cursor-pointer"
                alt="user-profile"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <p className="font-bold">{comment.postedBy?.userName}</p>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap mt-6 gap-3">
          <Link to={`/user-profile/${user?._id}`}>
            <img src={user?.image} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
          </Link>
          <input
            className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="button"
            className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
            onClick={addComment}
          >
            {addingComment ? 'Doing...' : 'Done'}
          </button>
        </div>
      </div>
      {/* all dynamic block need to be inside a React fragment block */}
      {/* Show Pin in the same cate */}
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  )
}

export default PinDetails