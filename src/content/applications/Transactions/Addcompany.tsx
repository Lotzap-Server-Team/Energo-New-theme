import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
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
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { createCompany, createUser, getCompanies, getCompany } from 'src/redux/store/reducers/slices/UserSlice';
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

 function addCompany() {
  const navigate = useNavigate();
  const params = useParams();
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [logo, setLogo] = useState();
  const [isHeadauator, setIsHeadauator] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const [dirtyFields, setDirtyFields] = useState({
    email: false,
    companyName:false,
    website:false,
    phone:false,
    address:false,
    street:false,
    city:false,
    country:false,
    logo:false,
    // isHeadauator:false,
    zipcode:false,
  });
  const isValidData = ():boolean => {
    const validateFields = ifEmpty( companyName && website && phone && address && street && city && country && email && postalCode && isHeadauator );
    return validateFields;
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(isValidData()){
    const formData = {
      title: companyName,
      website: website,
      phone: phone,
      email: email,
      address: address,
      street: street,
      city: city,
      country: country,
      logo: logo,
      isHeadquater: isHeadauator,
      zipcode: postalCode,
    }
  
    store.dispatch(createCompany(formData)).then((res: any) => {
      console.log(res.payload?.message,"[[[[[[[[[[[[[[[[[",res)
      if (res.payload.status == true) {
        alert(res.payload?.message)
        // toast.success(res.payload?.message)
        navigate("/management/transactions");
      } else {
        // toast.error(res.payload?.message)
        alert(res.payload?.message)
      }
    });
  };
}
  const renderErrorMessage = () =>
    errorMessages && (
      <div className="error">{errorMessages}</div>
    );
  
    const ifEmpty= (val: string): boolean => {
  
      return (val !== undefined && val.length > 0);// return true;
  }

  const getError = (msg: string): JSX.Element => {
    return (
      <span className="text-13 d-inline-block ml-1 text_13 text-danger"
      style={{ color: 'red',marginLeft: '18px'}}>
        {msg}
      </span>
    );
  };

  useEffect(()=>{
    console.log(params.id,"555555555555555");
    const companyId = params.id
    const formData = {id:companyId};  
    store.dispatch(getCompany(formData)).then((res: any) => { 
      console.log(res,"1111111111111111111111111");
        //  if(res && res.payload) {
        //     setId(res.payload.company?.id);
        //     setCompanyName(res.payload.company?.title);
        //     setEmail(res.payload.company?.email);
        //     setPhone(res.payload.company?.phone);
        //     setWebsite(res.payload.company?.website);
        //     setAddress1(res.payload.company?.address?.address);
        //     setAddress2(res.payload.company?.address?.street);
        //     setCity(res.payload.company.address?.city);
        //     setCountry(res.payload.company?.address?.country);
        //     setPostalCode(res.payload.company?.address?.zipcode);
        //     setLogo(res.payload.company?.logo);
        //     setchecked(res.payload.company?.is_headquater)
        //     setIsHeadauator(res.payload.company?.is_headquater)
        //     if(res.payload.company.is_headquater == '1'){
        //       (document.getElementById('checkBox')as any).checked = true;
        //     }else{
        //       (document.getElementById('checkBox')as any).checked = false;
        //     }
        //   } 
     }); 
    // }
  })

  return (
    <>
      <Helmet>
        <title>Add Company</title>
      </Helmet>
      <PageTitleWrapper>
        <h1>Add Company</h1>
        <p>Create your company here add start your business.</p>
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
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' }
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                    <Grid container spacing={2} rowSpacing={1} >
                      <Grid item xs={6} sm={6}>
                        <TextField
                          margin="normal"
                          id="company_name"
                          required
                          name="company_name"
                          label="Company Name"
                          fullWidth
                          onChange={(e) => {
                            setCompanyName(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              companyName: !ifEmpty(e.target.value),
                            }));
                          }}
                        />

                          {dirtyFields["companyName"] && getError("Company Name is requried")}

                      </Grid>
                      <Grid item xs={6} sm={6}>
                      <TextField
                          margin="normal"
                          id="website"
                          required
                          name="website"
                          label="Website"
                          fullWidth
                          onChange={(e) => {
                            setWebsite(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              website: !ifEmpty(e.target.value),
                            }));
                          }}
                        />

                          {dirtyFields["website"] && getError("Website is requried")}

                      </Grid>
                      <Grid item xs={6} sm={6}>
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
                      <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="address"
                          label="Address"
                          name="address"
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
                          name="postalCode"
                          onChange={(e) => {
                            setPostalCode(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              zipcode: !ifEmpty(e.target.value),
                            }));
                          }}
                        />

                         {dirtyFields["zipcode"] && getError("Zipcode is requried")}
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
                      <FormControlLabel
                          control={<Checkbox
                            onChange={(e) => {
                              setIsHeadauator(e.target.value);
                            }}
                            name="headquater" value= '1' />}
                          label="Company Headquater Office"
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        />
                      </Grid>
                      </Grid>
                  <div>
                  <Toolbar  sx={{ mt: 3 ,pl:"0 !important"}}>
                          <Button 
                             disabled={!isValidData()}
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

export default addCompany;