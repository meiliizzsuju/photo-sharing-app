import React from 'react';
import GoogleLogin from 'react-google-login';
import {userNavigate} from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc' // Google Logo
import shareVdo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'

const Login = () => {
  const responseGoogle = (response) =>{
    console.log(response)
  }
  
  return (
    <div className='flex justify-start item-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVdo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 left-0 bottom-0 right-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} 
              alt="Logo" 
              width="130px"
            />
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin 
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps)=>(
                <button
                  type='button'
                  className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className='mr-4'/> Sing in with Google
                </button>
              )}
              plugin_name="photo-app"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login