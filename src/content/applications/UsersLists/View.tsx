import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';
import {
  createTheme,
  Theme,
  ThemeProvider,
  useTheme
} from '@mui/material/styles';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Select,
  SelectChangeEvent
} from '@mui/material';
import Footer from 'src/components/Footer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import Switch from '@mui/material/Switch';
import {
  createUser,
  getCompanies,
  getUser,
  updateUser
} from 'src/redux/store/reducers/slices/UserSlice';
import { store } from 'src/redux/store';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const currencies = [
  {
    value: 'USD',
    label: '$'
  },
  {
    value: 'EUR',
    label: '€'
  },
  {
    value: 'BTC',
    label: '฿'
  },
  {
    value: 'JPY',
    label: '¥'
  }
];

function viewUsers() {
  const mdTheme = createTheme();
  const theme = useTheme();
  const params = useParams();
  const [id, setId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [permission, setPermission] = useState('');
  const [globalUser, setGlobalUser] = useState('');
  const [onload, setOnload] = useState(false);

  useEffect(() => {
    if (onload == false) {
      const userId = window.location.href.split('/')[5];
      const formData = { id: userId };
      store.dispatch(getUser(formData)).then((res: any) => {
        setOnload(true);
        if (res && res.payload) {
          setId(res.payload.user?.id);
          setCompanyName(res.payload.user?.company?.title);
          setEmail(res.payload.user?.email);
          setPhone(res.payload.user?.phone);
          setAddress(res.payload.user?.address?.address);
          setStreet(res.payload.user?.address?.street);
          setFirstName(res.payload.user?.first_name);
          setLastName(res.payload.user?.last_name);
          setCity(res.payload.user?.address?.city);
          setCountry(res.payload.user?.address?.country);
          setPostalCode(res.payload.user?.address?.zipcode);
          setPermission(res.payload.user?.permission);
          if (res.payload.user?.globalUser === 0) {
            setGlobalUser('No');
          } else {
            setGlobalUser('Yes');
          }
        }
      });
    }
  });
  return (
    <>
      <Helmet>
        <title>Forms - Components</title>
      </Helmet>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          mt={3}
        >
          <Grid item xs={12}>
            <Box component="main">
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper
                      sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                    >
                      <Typography
                        component="h2"
                        variant="h6"
                        color=""
                        gutterBottom
                      >
                        View User
                      </Typography>
                      <Divider />
                      <Box sx={{ mt: 1 }}>
                        <Grid container spacing={2} rowSpacing={1}>
                          <Grid item xs={6} sm={6}>
                            <Box>
                              {' '}
                              Comapny Name :{' '}
                              <Box component="span">{companyName}</Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Box>
                              {' '}
                              Global User :{' '}
                              <Box component="span">{globalUser}</Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Box>
                              {' '}
                              First Name :{' '}
                              <Box component="span">{firstName}</Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Box>
                              {' '}
                              Last Name : <Box component="span">{lastName}</Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Box>
                              {' '}
                              Phone : <Box component="span">{phone}</Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Box>
                              {' '}
                              Address : <Box component="span">{address}</Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Box>
                              {' '}
                              Street : <Box component="span">{street}</Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Box>
                              {' '}
                              City : <Box component="span">{city}</Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Box>
                              {' '}
                              ZipCode : <Box component="span">{postalCode}</Box>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Box>
                              {' '}
                              Country : <Box component="span">{country}</Box>
                            </Box>
                          </Grid>
                        </Grid>
                        <Typography
                          component="h2"
                          variant="h6"
                          sx={{ mt: 1 }}
                    
                          gutterBottom
                        >
                          Login Information
                        </Typography>
                        <Grid container spacing={2} rowSpacing={1}>
                          <Grid item xs={6}>
                            <div>
                              {' '}
                              Email : <span>{email}</span>
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              component="h6"
                              color=""
                              variant="h6"
                              sx={{ mt: 2 }}
                              gutterBottom
                            >
                              Roles/Permission
                            </Typography>
                            {permission}
                          </Grid>
                        </Grid>
                        <Divider  sx={{mt:3}}/>
                        <Toolbar sx={{ ml: 0, pl: '0 !important' }}>
                          <Button
                            variant="contained"
                            component={Link}
                            to="/management/profile"
                            sx={{ ml: 1, mt:3 }}
                          >
                            Cancel{' '}
                          </Button>
                        </Toolbar>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
                <Footer />
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default viewUsers;
