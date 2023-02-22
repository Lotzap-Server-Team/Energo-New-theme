import { Typography, Button, Grid } from '@mui/material';
import { Link,useNavigate } from "react-router-dom";
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
import capitalizeFirstLetter from 'src/redux/store/reducers/slices/UserSlice';
import {

  Card,
  Box,

  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

function PageHeader() {
  const user = {
    name: 'Admin',
    avatar: '/static/images/avatars/1.jpg'
  };
  const [usersAdd,setUsersAdd] = useState(false);
  var permission:any =localStorage.getItem('permissions');
  function addPermission(){
    console.log(JSON.parse(permission),"roles permission");
      var allPermission:any =  JSON.parse(permission);
      if(allPermission.length != 0){
        allPermission.forEach((per:any) => {
          console.log(per,"ppppppppppp");
          if(capitalizeFirstLetter(per.flag) == "Users"){
            if(per.name == "Add"){
              setUsersAdd(true)
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
          Users List
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your companies list
        </Typography>
      </Grid>
      {usersAdd &&
       <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 }, hover:"none" }}
          variant="contained"
          type="submit"
          component={Link} to="/management/adduser"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add User
        </Button>
      </Grid>
      }

    </Grid>
  );
}

export default PageHeader;
