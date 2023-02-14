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


//   const isValidData = ():boolean => {
//     const validateFields = ifEmpty( firstName && lastName && phone && address && street && city && country && company_id && permission && postalCode );
//     return validateFields;
//   };

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
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Input Fields" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="outlined-search"
                      label="Search field"
                      type="search"
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Label"
                    />
                    <TextField
                      id="outlined-search"
                      label="Search field"
                      type="search"
                    />
                    <TextField
                      id="outlined-search"
                      label="Search field"
                      type="search"
                    />
                    <TextField
                      id="outlined-search"
                      label="Search field"
                      type="search"
                    />
                    <TextField
                      id="outlined-search"
                      label="Search field"
                      type="search"
                    />
                  </div>
                  <div>
                    <TextField
                      id="outlined-search"
                      label="Search field"
                      type="search"
                    />
                    <TextField
                      id="outlined-search"
                      label="Search field"
                      type="search"
                    />
                    <TextField
                      id="outlined-search"
                      label="Search field"
                      type="search"
                    />
                    <TextField
                      id="outlined-search"
                      label="Search field"
                      type="search"
                    />
                    <div style={{ marginLeft: '10px' }}>
                      <Typography
                        component="h2"
                        variant="h6"
                        sx={{ mt: 1 }}
                        color="primary"
                        gutterBottom
                      >
                        Login Information
                      </Typography>
                      <Box>Create login information for the user.</Box>
                    </div>
                    <div>
                      <TextField
                        id="outlined-search"
                        label="Search field"
                        type="search"
                      />
                      <FormControl style={{ marginLeft: '20px' }}>
                        <FormLabel id="demo-radio-buttons-group-label">
                          {' '}
                          Roles/Permission
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                        
                        </RadioGroup>
                      </FormControl>
                      <TextField
                        id="outlined-search"
                        label="Search field"
                        type="search"
                      />
                      <FormControl style={{ marginLeft: '20px' }}>
                     
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                        
                        </RadioGroup>
                      </FormControl>
                    
                      <div style={{marginLeft:"10px"}}>
                   <p>  Upload profile</p>
                 <input type="file" name='file'/>
                </div>
                    </div>
                  </div>
                  <div>
                  <Toolbar  sx={{ mt: 3 ,pl:"0 !important"}}>
                          <Button 
                          
                          type="submit"
                          variant="contained"
                        >
                        Submit
                          </Button>
                        <Button variant="contained" sx={{ml:2}}>Cancel </Button>
                      </Toolbar> 
                  </div>
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
