import { useNavigate, useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { useEffect, useState } from 'react';

function App() {
  const content = useRoutes(router);

  const navigate = useNavigate();
  const [login, setIsLogin] = useState(false);
  const [onload,setOnload] = useState(false);
  const [documenets,setDocuments] = useState([]);
  

  function IsLoggedIn(){
    let access_token = localStorage.getItem("access_token");
    return (access_token != '' && access_token != null ) ? true : false;
  }

  function shareDataF(data:any){
    setDocuments(data)
  }

  useEffect(() => { 
    var token =  localStorage.getItem('access_token')
     if(onload==false && login== false){
        setIsLogin(IsLoggedIn());
        setOnload(true);
        if(token ==null){
         navigate("/");
        }
        else{
          navigate('/dashboards')
        }
     } 
  }); 
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
