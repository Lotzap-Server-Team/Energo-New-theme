import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import FormControl from '@mui/material/FormControl';
import {
  createPermission,
  getPermissionParent
} from 'src/redux/store/reducers/slices/UserSlice';
import { store } from 'src/redux/store';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
function Addpermission() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [parent, setParent] = useState('');
  const [onload, setOnload] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [dirtyFields, setDirtyFields] = useState({
    name: false,
    url: false,
    parent: false
  });
  const Cancel = (): any => {
    navigate('/management/permissions');
  };
  const ifEmpty = (val: string): boolean => {
    return val !== undefined && val.length > 0; // return true;
  };

  const isValidData = () => {
    const validateFields = ifEmpty(name && url && parent);
    return validateFields;
  };

  const selectChange = (event: SelectChangeEvent) => {
    setParent(event.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
      const formData = {
        name: name,
        url: url,
        parent: parent,
        guard_name: 'web' , 
          flag : 'flag'
      };
      console.log(formData , "data")
      store.dispatch(createPermission(formData)).then((res: any) => {
        if (res.payload.status == true) {
          setErrorMessages('');
          navigate('/management/permissions');
          toast.success(res.payload.message)
        } else {
          setErrorMessages(res.payload?.message);
        }
      });
  };

  useEffect(() => {
    if (onload == false) {
      setOnload(true);
      store.dispatch(getPermissionParent()).then((res: any) => {
        if (res && res.payload?.permissionparent) {
          setPermissions(res.payload?.permissionparent);
        }
      });
    }
  });


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
              <CardHeader title="Add Permission" />
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
                      <FormControl fullWidth>
                        <InputLabel id="parent">Category</InputLabel>
                        <Select
                          labelId="parent"
                          required
                          id="parent"
                          value={parent} 
                          label="Parent Category"
                          onChange={(e)=> setParent(e.target.value)}
                        >
                          <MenuItem value="">-Select-</MenuItem>
                          <MenuItem value="">ihdijhd</MenuItem>

                          {permissions.map((opt: any) => (
                            <MenuItem key={opt.id} value={opt.id}>
                              {opt.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Grid item xs={12} sm={6} >
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
                      <Grid item xs={12} sm={6} >
                        <TextField
                          margin="normal"
                          id="url"
                          required
                          name="url"
                          label="Url"
                          fullWidth
                          value={url}
                          onChange={(e) => {
                            setUrl(e.target.value);
                            setDirtyFields((dirty) => ({
                              ...dirty,
                              url: !ifEmpty(e.target.value)
                            }));
                          }}
                        />
                        {dirtyFields['url'] && getError('Url is requried')}
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
