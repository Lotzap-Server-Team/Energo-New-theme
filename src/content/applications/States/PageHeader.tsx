import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PageHeader() {


  const[addstate , setAddState] = useState(false)
  var permissions:any  = localStorage.getItem('permissions')

  const givepermission = ()=>{
    var allpermission = JSON.parse(permissions)
   if(allpermission.length != 0){
    allpermission.forEach((data :any) => {
      // console.log(data.flag , "ghhhhhhhghhghghg")
      if(data.flag=='States'){
        if(data.name == 'Add'){
          setAddState(true)
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
          States List
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your states list
        </Typography>
      </Grid>
      <Grid item>
        {
          addstate &&  
          <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          component={Link}
          to={'/management/addstate'}    
        >
          Add States
        </Button>
        }
      
      </Grid>
    </Grid>
  );
}

export default PageHeader;
