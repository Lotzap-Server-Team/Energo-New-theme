import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Select,
  SelectChangeEvent,
  Typography,
  Checkbox,
  Toolbar,
  Button,
  IconButton,
  TextField
} from '@mui/material';
import Footer from 'src/components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Company.css';
import { createCompanyFolder, getCompanyFolder } from 'src/redux/store/reducers/slices/UserSlice';
import { useEffect, useState } from 'react';
import { store } from 'src/redux/store';

const label = { inputProps: { 'aria-label': 'Switch demo' } };


//////////////////////

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
////////////////////


function companyFolders() {
  const navigate = useNavigate();
  const params = useParams();
  const [showFolder, setShowFolder] = useState([]);
  const [title,setTitle] = useState('');
  const [folder, setCompanyFolder] = useState([]);

  function getCpmpanyFolder() {
    const formData = {
      company_id: params.id
    };
    store.dispatch(getCompanyFolder(formData)).then((res: any) => {
      setShowFolder(res.payload.folders);
      console.log(res.payload.folders);
    });
  }

  useEffect(() => {
    getCpmpanyFolder();
  }, []);
//////////////////////
const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
/////////////////////////
const handleAdd = (e:any) => {
     
  e.preventDefault();
  const formData = {
    company_id:params.id,
    title:title,
  }
 
  store.dispatch(createCompanyFolder(formData)).then((res: any) => {
    setCompanyFolder(res.response)
    if (res.payload.status == true) {
      toast.success(res.payload.message);
      handleClose()
      getCpmpanyFolder();
        // navigate(`/companies/document/${params.companyId}`)
    } else {
      toast.error(res.payload.message)
    }
  });           
};



  const folders = showFolder?.map((card: any, i) => {
    return (
      <>
        <div>
          <div className="folder" id={i + 'card'}>
            <CardContent sx={{ paddingTop: '6px', pb: '6px !important', marginTop: '35px'}}>
                  <Typography style={{ cursor: 'pointer' }}>
                    {card.title}
                  </Typography>
                  <Typography sx={{ fontSize: '13px' }}>
                    Uploaded {new Date(card.created_at).toLocaleDateString()}
                  </Typography>
            </CardContent>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <Helmet>
        <title>Add Folder</title>
      </Helmet>
      <PageTitleWrapper>
        <div className='title-card'>
        <Button onClick={handleClickOpen}
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          // component={Link} to="/management/addcompany"
          // startIcon={<AddTwoToneIcon fontSize="small" />}

        >
          Add Folders
        </Button>
        </div>
   
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
              <CardHeader title="Add Company" />
              <Divider />
              <CardContent>{folders}</CardContent>
            </Card>
            <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Create Your Folder"}</DialogTitle>
        <DialogContent>
        <DialogContent dividers>
          <TextField margin="normal" 
          required 
          fullWidth 
          id="title" 
          label="Title" 
          name="title"     
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}/> 
        </DialogContent>
        {/* <DialogActions>
          <Button  variant="contained"  onClick={handleAdd}>
            Save
          </Button>
        </DialogActions> */}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}>Create</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
          </Grid>
        </Grid>
   
      </Container>
    <Footer />
    </>
  );
}

export default companyFolders;

