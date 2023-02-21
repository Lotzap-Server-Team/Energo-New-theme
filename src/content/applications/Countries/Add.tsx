import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useTheme} from '@mui/material/styles';
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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import FormControl from '@mui/material/FormControl';
import {
  createCountry,
} from 'src/redux/store/reducers/slices/UserSlice';
import { store } from 'src/redux/store';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

type data = {
  mydata : any;
}


function Addcountry(props:data) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  var number:any = 'my Props data ';
  function viewdata(){
    props.mydata(number)
  }
  useEffect(()=>{
 viewdata() 
console.log(props.mydata,'govind')
  },[])


  const [errorMessages, setErrorMessages] = useState('');

  const [dirtyFields, setDirtyFields] = useState({
    name: false,

  });
  const Cancel = (): any => {
    navigate('/management/countries');
  };
  const ifEmpty = (val: string): boolean => {
    return val !== undefined && val.length > 0; // return true;
  };

  const isValidData = () => {
    const validateFields = ifEmpty(name);
    return validateFields;
  };



  const onsubmithandler = (e: any) => {
    e.preventDefault();
    const formData = {
      title: name,
    };
    store.dispatch(createCountry(formData)).then((res: any) => {
      if (res.payload.status == true) {
        setErrorMessages("");
        toast.success(res.payload?.message);
        navigate('/management/countries');
      } else {
        setErrorMessages(res.payload?.message);
        toast.error(res.payload?.message);
      }
    });
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
              <CardHeader title="Add Countries" />
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
                      
                      <Grid item xs={12} sm={6} sx={{ my: 1 }}>
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
                      <Button type="submit" variant="contained" onClick={onsubmithandler} >
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

export default Addcountry;
