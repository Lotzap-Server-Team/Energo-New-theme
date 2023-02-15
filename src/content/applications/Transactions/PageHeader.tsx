import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Link } from 'react-router-dom';

function PageHeader() {
  const user = {
    name: 'Admin',
    avatar: '/static/images/avatars/1.jpg'
  };
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
      <Grid item>
        <Button 
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          component={Link} to="/management/addcompany"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add Company
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
