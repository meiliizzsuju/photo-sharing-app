import React, { useState, useRef, useEffect } from 'react';
import { Link,Route, Routes } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai';

import { Sidebar,UserProfile } from '../components';
import { userQuery } from '../utils/data';
import { client } from '../clients';
import Pins from './Pins';

import logo from '../assets/logo.png'
import { fetchUser } from '../utils/fetchUser';

const Home = () => {
  const [toggleSidebar, settoggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  // localStorage.getItem('user') comes in string, need to convert to json
  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query)
      .then((data)=>{
        setUser(data[0]); // first data
      })
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0,0)
  }, []);

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user}  />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full grid grid-cols-3 items-center shadow-md'>
          <HiMenu fontSize={40} className="cursor-pointer"
            onClick={()=> settoggleSidebar(true)}
          />
          <Link to="/" className='justify-self-center'>
            <img src={logo} alt="logo" className='w-28 ' />
          </Link>
          {/* get User from localstorage */}
          <Link to={`user-profile/${user?._id}`} className="justify-self-end"> 
            <img src={user?.image} referrerPolicy="no-referrer" alt="userImage" className='w-12' />
          </Link>
        </div>
        {toggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justified-end items-center p-2'>
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={()=> settoggleSidebar(false)}/>
            </div>
            <Sidebar user={user && user} closeToggle={settoggleSidebar} />
          </div>
        )}
      </div>
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile/>}/>
          <Route path="/*" element={<Pins user={user&&user}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Home