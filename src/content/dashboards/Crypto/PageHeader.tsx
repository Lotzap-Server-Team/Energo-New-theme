import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {
  const user = {
    name: 'Admin',
    avatar: '/static/images/avatars/12.jpg'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Hello, {user.name}!
        </Typography>
        <Typography variant="subtitle2">
          Welcome to our Dashboard!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
