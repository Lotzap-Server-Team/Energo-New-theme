import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { getPermissions } from '../../../redux/store/reducers/slices/UserSlice'
import { store } from 'src/redux/store';

function RecentOrders() {
  const [conpaniesData, setCompanyData]=useState([])
useEffect(()=>{

  getPermissionList()
},[])
function getPermissionList(){
  if(conpaniesData.length == 0){
    store.dispatch(getPermissions()).then((res: any) => {
      if (res && res.payload?.permissions) {
        setCompanyData(res.payload?.permissions);
      } 
    }); 
  }
}


 
 

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={conpaniesData} />
    </Card>
  );
}

export default RecentOrders;
