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
import {
  createCompanyFolder,
  getCompanyFolder,
  uploadeImage
} from 'src/redux/store/reducers/slices/UserSlice';
import { createContext, useEffect, useRef, useState } from 'react';
import { store } from 'src/redux/store';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
import CloseIcon from '@mui/icons-material/Close';
//////////////////////
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { toast } from 'react-toastify';
import FormControlLabel from '@mui/material/FormControlLabel';


type data={
datatable:Function ;
}


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
////////////////////

const mdTheme = createTheme();
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function companyFolders(props:data) {
  const navigate = useNavigate();
  const fileInput = useRef<any | null>(null);
  const params = useParams();
  const [documents, setFile] = React.useState<any | null>(null);
  const [showFolder, setShowFolder] = useState([]);
  const [title, setTitle] = useState('');
  const [folder, setCompanyFolder] = useState([]);
  const [folderId, setFolderId] = useState('');
  const [openFolder, setFolder] = React.useState(false);
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = React.useState(false);
  
  // console.log('my id', params.id);
  var foldersData: any = [];
  var newArray:any =[]  
  function getCpmpanyFolder() {
    
    const formData = {
      company_id: params.id
    };
    console.log('params id', params.id)
    store.dispatch(getCompanyFolder(formData)).then((res: any) => {
      setShowFolder(res.payload.folders);
    });
  }
  function sendMessage(){
  // (foldersData)
  // localStorage.setItem('data',foldersData);
navigate("/management/DocumentShare/"+params.id)
localStorage.setItem("ourarraykey",JSON.stringify(foldersData));

// console.log("my props", (foldersData))
  }


  function viewDocument(id:any){
    navigate(`/companies/document/view/${id}/${params.companyId}`)
  }
  function addFolder(event:any,i:any,e:any) {
    var ID = event.id
    var cardID = (document.getElementById(i+'card')as any);
    if (!newArray.includes(ID)){
      newArray.push(event.id);
      foldersData.push(event);
        cardID.classList.add("Active");
       
    }else{
     
      newArray = newArray.filter((id:any) => id != ID);
      foldersData = foldersData.filter((id:any) => id.id != ID);
      cardID.classList.remove("Active");
    }
    
    if(newArray.length > '0'){
      setDisabled(true)
    }else{
      setDisabled(false)
    }
    }
  function UploadDocument(e: any) {
    e.preventDefault();
    var imageUrl: any;
    var folderIds = JSON.stringify(folderId);
    var company_ids = JSON.stringify(company_ids);
    const formData: any = {
      company_id: params.id,
      folder_id: folderId,
      documents: documents
    };
    store.dispatch(uploadeImage(formData)).then((res: any) => {
      setCompanyFolder(res.response);
      if (res.payload.status == true) {
        toast.success(res.message);
        navigate(`/companies/document/${params.companyId}`);
        handleCloseFolder();
      } else {
        toast.error(res.message);
      }
    });
  }
  useEffect(() => {
    getCpmpanyFolder();
  }, []);
 
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseFolder = () => {
    setFolder(false);
    setFile(null);
  };
  const handleAdd = (e: any) => {
    e.preventDefault();
    const formData = {
      company_id: params.id,
      title: title
    };
    store.dispatch(createCompanyFolder(formData)).then((res: any) => {
      setCompanyFolder(res.response);
      if (res.payload.status == true) {
        toast.success(res.payload.message);
        handleClose();
        getCpmpanyFolder();
        // navigate(`management/companyfolders/${companyId}`)
      } else {
        toast.error(res.payload.message);
      }
    });
  };
  const getBase64 = (file: FileList | null) => {
    if (file) {
      const fileRef: any = file[0] || '';
      const fileType: any = fileRef || '';

      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (e: any) => {
        setFile(`data:${fileType};base64,${btoa(e.target.result)}`);
      };
    }
  };
  function handleClickOpenFolder(id: any) {
    setFolderId(id);
    setFolder(true);
  }
  const showFolders = (id: any) => {
    navigate(`/management/companyfolders/${id}/${id}`);
  };
  const onLocation = (id:any) =>{
    navigate(`/management/show-company-folders/${params.id}`);
  }
  const folders = showFolder?.map((card: any, i: any) => {
    return (
      <>
        <div>
          <div className="folder" id={i + 'card'}>
            <CardContent
              sx={{
                paddingTop: '6px',
                pb: '6px !important',
                marginTop: '0px',
                position:'relative',
                mt:2
              }}
            >
               <FormControlLabel
                sx={{position:'absolute', top:100, right:10, zIndex:99999}}
            control={
              <Checkbox className='documentselect'  onClick={(e)=>{addFolder(card,i,e.target);}} />}
              label="Selected box"
              />
              <Typography
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  showFolders(card.id);
                }}
              >
                {card.title}
              </Typography>
              <Typography sx={{ fontSize: '13px' }}>
                Uploaded {new Date(card.created_at).toLocaleDateString()}
              </Typography>

              <ControlPointIcon
                sx={{
                  width: '25%',
                  height: '30%',
                  color: '#000',
                  ml: '20px',
                  position: 'relative',
                  bottom: 55,
                  left: 75
                }}
                onClick={() => {
                  handleClickOpenFolder(card.id);
                }}
                style={{ cursor: 'pointer' }}
              />

              <BootstrapDialog
                onClose={handleCloseFolder}
                aria-labelledby="customized-dialog-title"
                open={openFolder}
                sx={{ height: 600 }}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  Upload Documents
                  <IconButton
                    aria-label="close"
                    onClick={handleCloseFolder}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500]
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <div className="card px-4">
                  <form
                    onSubmit={UploadDocument}
                    className="form-group mt-2"
                    encType="multipart/form-data"
                  >
                    <label>Upload file:</label>
                    <input
                      type="file"
                      ref={fileInput}
                      onChange={(e) => {
                        getBase64(e.target.files);
                      }}
                      className="form-control"
                      multiple
                    />
                    {documents && (
                      <img
                        src={documents}
                        alt="img"
                        style={{ height: '150px', width: '100%' }}
                        className="mt-2 mb-2"
                      />
                    )}

                    <br />
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </BootstrapDialog>
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
        <div className="title-card">
          <Button
            onClick={handleClickOpen}
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
          <Grid item xs={12} sx={{backgroundColor:"white", boxShadow:"0px 9px 16px rgb(159 162 191 / 18%), 0px 2px 2px rgb(159 162 191 / 32%)", ml:4, mt:3, borderRadius:"10px"}}>
            <Card sx={{backgroundColor:"transparent", boxShadow:"none", pb:4}}>
              <CardHeader title="Add Company" />
              <Divider />

              <Grid item xs={12}>
                <CardContent>{folders} </CardContent>
         
              </Grid>
              <Grid item xs={12}>
           
              </Grid>
            </Card>
            <Divider />
            <Toolbar  sx={{ ml: 0 ,pl:"0 !important", mb:4, mt:3}}>
                    <Button variant="contained"  
                    onClick={()=>{sendMessage()}} 
                    disabled={disabled == false}>Share </Button>
                    <Button variant="contained" onClick={onLocation}  sx={{ ml: 1 }} disabled={disabled == false}>Request </Button>
                    <Button variant="contained" component={Link} to="/management/transactions" sx={{ ml: 1 }} >Cancel </Button>
                  </Toolbar>   
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{'Create Your Folder'}</DialogTitle>
              <DialogContent>
                <DialogContent dividers>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
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
