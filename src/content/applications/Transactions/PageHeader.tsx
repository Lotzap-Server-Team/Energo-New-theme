import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Link } from 'react-router-dom';
import capitalizeFirstLetter from 'src/redux/store/reducers/slices/UserSlice';
import React, { useEffect } from 'react';

function PageHeader() {
  const user = {
    name: 'Admin',
    avatar: '/static/images/avatars/1.jpg'
  };
  const [companyadd, setCompanyAdd]= React.useState(false)
  var permission:any =localStorage.getItem('permissions');
  function addPermission(){
    console.log(JSON.parse(permission),"roles permission");
      var allPermission:any =  JSON.parse(permission);
      if(allPermission.length != 0){
        allPermission.forEach((per:any) => {
          console.log(per,"ppppppppppp");
          if(capitalizeFirstLetter(per.flag) == "Companies"){
            console.log(per.flag,"77777777");
            if(per.name == "Add"){
              setCompanyAdd(true)
            }
          }
        });
      }
  }
  useEffect(()=>{
    addPermission()
  },[])
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Companies List
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your companies list
        </Typography>
      </Grid>
     {companyadd && <Grid item>
        <Button 
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          type="submit"
          component={Link} to="/management/addcompany"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add Company
        </Button>
      </Grid>}
    </Grid>
  );
}

export default PageHeader;
