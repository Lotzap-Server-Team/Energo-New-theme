import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';



function PageHeader() {


  const user = {
    name: 'Admin',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
         Notification  List
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your Notification list
        </Typography>
      </Grid>
     
    </Grid>
  );
}

export default PageHeader;
