import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from '@mui/material';
import Footer from 'src/components/Footer';
import Box from '@mui/material/Box';

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

import { getDocuments, shareDocuments } from 'src/redux/store/reducers/slices/UserSlice';
import { store } from 'src/redux/store';

import * as React from 'react';


export default function companyFoldersView() {
    const params = useParams();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [documents, setDocuments] = useState([]);
    const [folderName, setFolderName] = useState('');
    const [errorMessages, setErrorMessages] = useState("");
    const cards = [1];
    const [companyID,setCompanyId]=useState('')
    const navigate = useNavigate();
    const handleSubmit = (event: any) => {
      event.preventDefault();
      const formData = {
        name: name,
        email: email,
        description: description,
        documents: documents,
      };
      store.dispatch(shareDocuments(formData)).then((res: any) => {
        if (res.payload.status == true) {
          setErrorMessages("");
          //const that = this.context.router.history.push("/dashboard");
        } else {
          setErrorMessages(res.payload?.message);
        }
      });
    };
  console.log("parms id", params)
    const callcompony = ()=>{
      const data = {
        company_id: params.id,
        folder_id: params.folderId,
      };
      store.dispatch(getDocuments(data)).then((res: any) => {
        console.log("res", res);
        if(res.payload.status == true){
          setDocuments(res.payload.folders.media)
          setFolderName(res.payload.folders.title)
          // toast.success(res.payload.message)
        }else{
          toast.error(res.payload.message)
        }
  
      });
  }
    useEffect(() => {
      callcompony()
    },[]);
  
    function back(){
      navigate(`/companies/document/${params.companyId}`)
    }
  
  const imagesData = cards.map((card)=>{
    return(
      <div className="container mt-4" key={card}>
        <div className="alert alert-primary" role="alert">
            No documents found please upload documents!
        </div>
      </div>
  
    )
  })


  return (
    <>
      <Helmet>
        <title>Add Company</title>
      </Helmet>

      <Container maxWidth="lg" sx={{mt:4}}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} >
            <Card>
              <CardHeader title="Document View / Test" />
              <Divider />
              <CardContent>
              <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <Grid container spacing={2} rowSpacing={1}>
                      <Grid item xs={12} sx={{ mb: "20px !important" }}>
                        <div className="row">
                        {documents.length > 0 ? documents?.map((res:any)=>{
                          return(
                            <div className="col-md-3 mb-2" key={res?.id}>
                            <div className="card" >
                              {/* <a href={res.original_url} download> */}
                              <img
                              className="card-img-top mh-100 mw-100"
                              src={res.original_url} 
                              alt="Card image cap" style={{height: '150px'}} />
                              {/* </a> */}
                          
                             <div className="card-body text-center">
                             {/* <Link to={res.original_url} target="_blank" download>  <DownloadForOfflineIcon/></Link>
                             <a href={res.original_url} target="_blank" > <VisibilityIcon  /></a> */}
                             </div>
                          </div>
                            </div>
                          )
                        }):imagesData}
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                  <Toolbar sx={{ ml: 0, pl: "0 !important" }} className="mt-4">
                    <Button
                      variant="contained"
                      component={Link}
                      to="management/show-company-folders/:id"
                      sx={{ ml: 1, mt:2 }}
                      onClick={back}
                    >
                      Back{" "}
                    </Button>
                    
                  </Toolbar>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    
      <Footer />
    </>
  );
}
