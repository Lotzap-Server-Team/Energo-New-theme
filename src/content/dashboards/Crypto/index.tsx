import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';
import { useEffect, useState } from 'react';
import { store } from 'src/redux/store';
import { getRolehasPermissions } from 'src/redux/store/reducers/slices/UserSlice';

function DashboardCrypto() {
const [onload , setOnload] = useState(false)


  useEffect(() => {
    console.log('remove permision');
    localStorage.removeItem('permissions');
    if(onload==false){
      setOnload(true);
      var role_id:any = localStorage.getItem('role_id')
      const roles = {
        role_id:role_id,
      } 
      store.dispatch(getRolehasPermissions(roles)).then((res: any) => {
        localStorage.setItem("permissions", JSON.stringify(res.payload.data));
        console.log("add permission");
      }); 
    }
  },[]);


  return (
    <>
      <Helmet>
        <title>Energo Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          {/* <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
