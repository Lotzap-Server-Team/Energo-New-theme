import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';
import Hero from './Hero';
import './Login.css'
import { toast } from 'react-toastify';
import { store } from 'src/redux/store';
import { login } from 'src/redux/store/reducers/slices/UserSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router';


function Overview() {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState('');

  function IsLoggedIn(){
    let access_token = localStorage.getItem("access_token");
    return (access_token != '' && access_token != null ) ? true : false;
  }

  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const formData = {
      email:email,
      password:password
    }  
    console.log(formData,"4")
    store.dispatch(login(formData)).then((res: any) => {
      console.log(res.payload.user.role_id,"res.payload.user.role_id");
      if (res.payload.status == true) {
        let access_token = res.payload.access_token;
        if(access_token !="" && access_token !=""){
          localStorage.setItem("access_token", access_token); 
          localStorage.setItem("role_id", res.payload.user.role_id);
          localStorage.setItem("user_id", res.payload.user.id); 
          toast.success(res.payload.message);
          navigate("dashboards");
          window.location.reload();
        }
      }else {
       toast.error(res.payload.message);
      }
    });    
  };

  const renderErrorMessage = () =>
  errorMessages && (
    <div className="error">{errorMessages}</div>
  );

  return (
    <>
     <div className="login-box">
        <h2>Welcome back</h2>
        <p>Enter your details</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <i className="fa-solid fa-user" />
            <input type="email" id="email" name='email' placeholder="email" required       onChange={(e) => {
                  setEmail(e.target.value);
                }}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <i className="fa-solid fa-lock" />
            <input type="password" id="password" name='password' placeholder="Your password" required 
               onChange={(e) => {
                 setPassword(e.target.value);
               }}/>
          </div>
        </form>
        <div>
          <button onClick={handleSubmit} className="btn">Log In</button>
        </div>
        <div>
          <a href="#" className="forgot">
            Forgot Your Password?
          </a>
        </div>
      </div>
    </>
  );
}

export default Overview;
