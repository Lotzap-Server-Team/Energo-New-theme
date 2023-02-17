import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PageHeader() {
  const[addcountry , setAddCountry] = useState(false)


  var permissions:any  = localStorage.getItem('permissions')

  const givepermission = ()=>{
    var allpermission = JSON.parse(permissions)
   if(allpermission.length != 0){
    allpermission.forEach((data :any) => {

      // console.log(data.name , "ghhhhhhhghhghghg")
      if(data.flag=='Countries'){
        if(data.name == 'Add'){
          setAddCountry(true)
        }
     
      }
    });
  }
  }

  useEffect(()=>{
    givepermission()
  })


  const user = {
    name: 'Admin',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Countries List
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your countries list
        </Typography>
      </Grid>
      <Grid item>
        {
          addcountry && 
          <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          component={Link}
          to={'/management/addcountry'}    
        >
          Add Countries
        </Button>
        }
   
      </Grid>
    </Grid>
  );
}

export default PageHeader;
