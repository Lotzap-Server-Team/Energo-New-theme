import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {createTheme, Theme, ThemeProvider,useTheme  } from '@mui/material/styles';
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
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import Switch from '@mui/material/Switch';
import { createUser, getCompanies } from 'src/redux/store/reducers/slices/UserSlice';
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

function addUsers() {
  const [currency, setCurrency] = useState('EUR');
  const theme = useTheme();
  const navigate = useNavigate();
  const [company_id,setCompanyId] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');
  const [street,setStreet] = useState('');
  const [city,setCity] = useState('');
  const [country,setCountry] = useState('');
  const [password,setPassword] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [profilePicture,setProfilePicture] = useState('files');
  const [permission, setPermission] = useState('');
  const [globalUser, setGlobalUser] = useState('');
  const [onload,setOnload] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');
  const [companies, setCompanies] = useState([]);
   const [file, setFile] = useState();
  const [dirtyFields, setDirtyFields] = useState({
    first_name:false,
    companyname:false,
    last_name:false,
    email:false,
    address:false,
    street:false,
    city:false,
    country:false,
    password:false,
    permission:false,
    postalCode:false,
    phone:false,

  });
  const getBase64 = (file:any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e:any) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      var image = e.target.files[0]
      getBase64(image)
    }
  };

  const ifEmpty= (val: string): boolean => {

    return (val !== undefined && val.length > 0);// return true;
}
  const isValidData = ():boolean => {
    const validateFields = ifEmpty( firstName && lastName && phone && address && street && city && country && company_id && permission && postalCode );
    return validateFields;
  };

  const selectChange = (event: SelectChangeEvent) => {
    setCompanyId(event.target.value);
  };
  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPermission((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // if(isValidData()){
      const formData = {
        company_id:company_id,
        first_name: firstName,
        last_name:lastName,
        global_user:globalUser,
        phone:phone,
        email:email,
        address:address,
        street:street,
        city:city,
        country:country,
        password:password,
        permission: permission,
        zipcode:postalCode,
        profile_picture:file,   
      } 
      console.log("my all form data", formData)
      store.dispatch(createUser(formData)).then((res: any) => {
        
        if (res.payload.status == true) {
          toast.success(res.payload?.message)
          navigate("/users");
        } else {
          toast.error(res.payload?.message)
        }


      });                               
    // }     

  };
  const renderErrorMessage = () =>
  errorMessages && (
    <div className="error">{errorMessages}</div>
  );

 

const getError = (msg: string): JSX.Element => {
  return (
    <span className="text-13 d-inline-block ml-1 text_13 text-danger">
      {msg}
    </span>
  );
};
  useEffect(() => {

    // isValidData();
    if(onload==false){
      setOnload(true);
       store.dispatch(getCompanies()).then((res: any) => { 
          if (res && res.payload.companies) {
            setCompanies(res.payload.companies);
          } 
       }); 
      }
   });

  return (
    <>
      <Helmet>
        <title>Forms - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Forms"
          subHeading="Components that are used to build interactive placeholders used for data collection from users."
          docs="https://material-ui.com/components/text-fields/"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} >
            <Card>
              <CardHeader title="Add Company" />
              <Divider />
              <CardContent>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <Grid container spacing={2} rowSpacing={1} >
                      <Grid item xs={6} sm={6} mt={2}>
                      <FormControl fullWidth >
                      <InputLabel id="company_name_label">Company Name</InputLabel>
                      <Select
                        labelId="company_name_label"
                        required
                        id="company_name"
                        autoFocus
                        value={company_id}
                        label="Company Name"
                        onChange={selectChange}
                        onBlur={(e) =>{
                          setDirtyFields((dirty) => ({
                              ...dirty,
                              company_id: false,
                              }));
                        }}
                      >
                       <MenuItem value="">-Select-</MenuItem>
                          {companies.map((opt:any) => (  
                            <MenuItem key={opt.id} value={opt.id}>
                            {opt.title}
                            </MenuItem>
                          ))} 
                       </Select>
                    </FormControl>
                      </Grid>
                      <Grid item xs={2} sm={6} mt={2}>
                      <FormControlLabel
                            control={<Checkbox  
                            onChange={(e) => {
                              setGlobalUser(e.target.value);
                            
                            }} 
                            name="global_user" value={globalUser} />}
                            label="Global User"
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}  
                        />
                        
                      </Grid>
                      <Grid item xs={6} sm={6}>
                          <TextField
                            margin="normal"
                            id="first_name"
                            required
                            name="first_name"
                            
                            label="First Name"
                            fullWidth
                            onChange={(e) => {
                              setFirstName(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                first_name: !ifEmpty(e.target.value),
                              }));
                            }}
                          />

                             {dirtyFields["first_name"] && getError("FirstName is requried")}

                      </Grid>
                      <Grid item xs={6} sm={6}>
                          <TextField
                            margin="normal"
                            id="last_name"
                            required
                            name="last_name"
                            
                            label="Last Name"
                            fullWidth
                            onChange={(e) => {
                              setLastName(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                last_name: !ifEmpty(e.target.value),
                              }));
                            }}
                          />

                             {dirtyFields["last_name"] && getError("LastName is requried")}

                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            onChange={(e) => {
                             setPhone(e.target.value);
                             setDirtyFields((dirty) => ({
                              ...dirty,
                              phone: !ifEmpty(e.target.value),
                            }));
                          }}
                        />

                           {dirtyFields["phone"] && getError("Phone is requried")}

                      </Grid>
                      <Grid item xs={6} sm={6}> 
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="address"
                              label="Address"
                              name="address1"
                              onChange={(e) => {
                                setAddress(e.target.value);
                                setDirtyFields((dirty) => ({
                                  ...dirty,
                                  address: !ifEmpty(e.target.value),
                                }));
                              }}
                            />

                               {dirtyFields["address"] && getError("Address is requried")}

                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="street 1"
                              label="Street"
                              name="address2"
                              onChange={(e) => {
                                setStreet(e.target.value);
                                setDirtyFields((dirty) => ({
                                  ...dirty,
                                  street: !ifEmpty(e.target.value),
                                }));
                              }}
                            />

                               {dirtyFields["street"] && getError("Street is requried")}

                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="city"
                              label="City"
                              name="city"
                              onChange={(e) => {
                                setCity(e.target.value);
                                setDirtyFields((dirty) => ({
                                  ...dirty,
                                  city: !ifEmpty(e.target.value),
                                }));
                              }}
                            />

                               {dirtyFields["city"] && getError("City is requried")}

                      </Grid>
                      <Grid item xs={6} sm={6}>
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="zipcode"
                            label="Zipcode"
                            name="postalcode"
                            onChange={(e) => {
                              setPostalCode(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                postalCode: !ifEmpty(e.target.value),
                              }));
                            }}
                          />

                             {dirtyFields["postalCode"] && getError("PostalCode is requried")}

                      </Grid>
                      <Grid item xs={6} sm={6}>
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="country"
                            label="Country"
                            name="country"
                            onChange={(e) => {
                              setCountry(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                country: !ifEmpty(e.target.value),
                              }));
                            }}
                          />

                             {dirtyFields["country"] && getError("Country is requried")}

                        </Grid>
                        <Grid item xs={6} sm={6}>
                       </Grid>
                    </Grid>
                    <Typography component="h2" variant="h6" sx={{ mt: 1}} color="primary" gutterBottom>
                        Login Information
                    </Typography>
                    <Box>
                      Create login information for the user.
                    </Box>
                    <Grid container spacing={2} rowSpacing={1} >
                      <Grid item xs={6} >
                      <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email" 
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setDirtyFields((dirty) => ({
                                ...dirty,
                                email: !ifEmpty(e.target.value),
                              }));
                            }}
                          />
                             {dirtyFields["email"] && getError("Email is requried")}
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }} 
                      />
                      </Grid>
                     
                      <Grid item xs={6} >
                          <Typography component="h6" color="primary" variant="h6" sx={{ mt: 2 }}  gutterBottom>
                            Roles/Permission
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={permission}
                                    onChange={radioChange}
                                  >
                                    <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                                    <FormControlLabel value="author" control={<Radio />} label="Author" />
                                  </RadioGroup>
                                </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        {/* <Button variant="contained" component="label" sx={{ mb: 3 }}> */}
                     
                        <p>  Upload profile</p>
                          {/* <input type="file"  name='logo' hidden accept="image/*" multiple  /> */}
                          <input type="file"   name='file' onChange={handleFileChange}
                        />
                    {/* </Button> */}
                      </Grid>
                     </Grid>
                    
                   
                      <Toolbar  sx={{ ml: 0 ,pl:"0 !important", mt:2}}>
                          <Button 
                           disabled={!isValidData()}
                          type="submit"
                          variant="contained"
                        >
                        Submit
                          </Button>
                        <Button  variant="contained" component={Link} to="/users" sx={{ ml: 1 }} >Cancel </Button>
                      </Toolbar> 
                      </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default addUsers;
