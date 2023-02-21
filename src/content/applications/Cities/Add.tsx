import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTheme} from '@mui/material/styles';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  SelectChangeEvent,
  InputLabel,
  Select
} from '@mui/material';
import Footer from 'src/components/Footer';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import FormControl from '@mui/material/FormControl';
import {  getCountries , getCountryStates , createCity } from 'src/redux/store/reducers/slices/UserSlice';
import { store } from 'src/redux/store';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
function Addpermission() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [stateId,setStateId] = useState([]);
  const [errorMessages, setErrorMessages] = useState('');
  const [countries, setCountries] = useState([]);
  const [dirtyFields, setDirtyFields] = useState({
    name: false,
  
  });
  const Cancel = (): any => {
    navigate('/management/cities');
  };
  const ifEmpty = (val: string): boolean => {
    return val !== undefined && val.length > 0; // return true;
  };

  const isValidData = () => {
    const validateFields = ifEmpty(name && state && country);
    return validateFields;
  };



  function getCountrieData(){
    if(countries.length == 0){
      store.dispatch(getCountries()).then((res: any) => {
        console.log(res , "resss")
          setCountries(res.payload.countries);
          
      });
    }
  }
function getCountryStatesByCountry(e:any){
    const formDate={
        country_id:e
    }
      store.dispatch(getCountryStates(formDate)).then((res: any) => {
        setStateId(res.payload.states);
      });
  }


  const handleSubmit = (e:any) => {
    e.preventDefault();
    // if(isValidData()){
    const formData = {
      country_id:country,
      name:name,
      state_id:state,
    }
    store.dispatch(createCity(formData)).then((res: any) => {
      if (res.payload.status == true) {
        toast.success(res.payload.message)
        navigate("management/cities");
      } else {
        toast.error(res.payload?.message);
      }
    });          
  // };
  }
  useEffect(() => {
    getCountrieData();
  });
  const selectCuntry = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
    getCountryStatesByCountry(event.target.value);
  };


  const getError = (msg: string): JSX.Element => {
    return (
      <span
        className="text-13 d-inline-block ml-1 text_13 text-danger"
        style={{ color: 'red' }}
      >
        {msg}
      </span>
    );
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Add City" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': {  width: '55ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={2} rowSpacing={1}>
                    <Grid item xs={6} sm={6} >
                      <FormControl fullWidth sx={{ my: 1 }} >
                        <InputLabel id="parent">Countries</InputLabel>
                        <Select
                          labelId="parent"
                          required
                          id="parent"
                          value={country} 
                          label="Parent Category"
                          onChange={selectCuntry}
                        >
                          <MenuItem value="">-Select-</MenuItem>

                          {countries.map((opt: any) => (
                            <MenuItem key={opt.id} value={opt.id}>
                              {opt.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth  sx={{ my: 1 }} >
                        <InputLabel id="parent">State</InputLabel>
                        <Select
                          labelId="parent"
                          required
                          id="parent"
                          value={state} 
                          label="Parent Category"
                          onChange={(e)=> setState(e.target.value)}
                        >
                          <MenuItem value="">-Select-</MenuItem>

                          {stateId.map((opt: any) => (
                            <MenuItem key={opt.id} value={opt.id}>
                              {opt.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                        <TextField
                          margin="normal"
                          id="title"
                          required
                          name="title"
                          label="Title"
                          fullWidth
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              parent: !ifEmpty(e.target.value)
                            }));
                          }}
                        />
                        {dirtyFields['parent'] && getError('Title is requried')}
                      </Grid>
                     
                    </Grid>
                  </Grid>

                  <div>
                    <Toolbar sx={{ mt: 3, pl: '0 !important' }}>
                      <Button type="submit" variant="contained" onClick={handleSubmit} >
                        Submit
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ ml: 2 }}
                        onClick={Cancel}
                      >
                        Cancel
                      </Button>
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

export default Addpermission;
