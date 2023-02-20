import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { store } from 'src/redux/store';
import { shareDocuments } from 'src/redux/store/reducers/slices/UserSlice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { resolve } from 'path';
import { CardHeader, Checkbox, FormControlLabel } from '@mui/material';

type shareData = {
  shareData: any;
};
function DocumentShare(props: shareData) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [documents, setDocuments] = useState(props.shareData);
  const [folder, setfolders] = useState('');

  const [errorMessages, setErrorMessages] = useState('');
  const params = useParams();
  const navigate = useNavigate();
  var foldersArray: any = [];
  const handleSubmit = (e: any) => {
    documents.forEach((element: any) => {
      foldersArray.push(element.id);
    });
    var companyId = documents[0].company_id;

    e.preventDefault();
    const formData = {
      name: name,
      email: email,
      description: description,
      folder_ids: foldersArray,
      company_id: params.companyId
    };
    store.dispatch(shareDocuments(formData)).then((res: any) => {
      if (res.payload.status == true) {
        setErrorMessages('');
        toast.success(res.payload?.message);
      } else {
        toast.error(res.payload?.message);
        setErrorMessages(res.payload?.message);
      }
    });
  };
  function cancel() {
    navigate(`/companies/document/${documents[0].company_id}`);
  }

  var storedArray = localStorage.getItem('ourarraykey');
  const showFolder = JSON.parse(storedArray);
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
                position: 'relative',
                mt: 2
              }}
            >
              <FormControlLabel
                sx={{
                  position: 'absolute',
                  top: 100,
                  right: 10,
                  zIndex: 99999
                }}
                control={<Checkbox className="documentselect" />}
                label="Selected box"
              />
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

  const folderList = documents?.map((card: any) => {
    return (
      <Grid
        item
        key={card.id}
        xs={12}
        sm={6}
        md={12}
        sx={{ paddingTop: '0px' }}
      >
        <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', pb: 4 }}>
          <CardHeader title="Documents / Share Files" />
          <Divider />

          <Grid item xs={12}>
            <CardContent>{folders} </CardContent>
          </Grid>
          <Grid item xs={12}></Grid>
        </Card>
      </Grid>
    );
  });
  return (
    <>
      <Box component="form" noValidate sx={{ mt: 1, mr: 10 }}>
        <Grid
          container
          spacing={2}
          rowSpacing={1}
          sx={{
            backgroundColor: 'white',
            boxShadow:
              '0px 9px 16px rgb(159 162 191 / 18%), 0px 2px 2px rgb(159 162 191 / 32%)',
            ml: 4,
            mt: 3,
            pb: 5,
            borderRadius: '10px'
          }}
        >
            <Divider />
          <Grid item xs={5}>
            <Grid item xs={6}></Grid>
            <Card
              sx={{ backgroundColor: 'transparent', boxShadow: 'none', pb: 4 }}
            >
              <CardHeader title="Add Company" />

              <Grid item xs={12}>
                <CardContent>{folders} </CardContent>
              </Grid>
              <Grid item xs={12}></Grid>
            </Card>

            <Toolbar sx={{ ml: 3, mt: 7, pl: '0 !important' }}>
              <Button type="submit" variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant="contained" onClick={cancel} sx={{ ml: 1 }}>
                Cancel{' '}
              </Button>
            </Toolbar>
          </Grid>
          <Grid item xs={6} sx={{ mt: 8, ml: 4 }}>
            <TextField
              margin="normal"
              id="Name"
              required
              name="name"
              autoFocus
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              id="description"
              label="Reason for sharing/Requesting"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default DocumentShare;
