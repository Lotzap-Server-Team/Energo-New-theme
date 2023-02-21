import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { getPermissions, getStates } from '../../../redux/store/reducers/slices/UserSlice'
import { store } from 'src/redux/store';

function RecentOrders() {
  const [conpaniesData, setCompanyData]=useState([])

useEffect(()=>{
  getPermissionList()
},[])
function getPermissionList(){
  if(conpaniesData.length == 0){
    store.dispatch(getStates()).then((res: any) => {
      if (res && res.payload?.states) {
        setCompanyData(res.payload?.states);
      } 
    }); 
  }
}
const resenddata = ()=>{
  store.dispatch(getStates()).then((res: any) => {
    setCompanyData(res.payload?.states);
}); 
}
  return (
    <Card>
      <RecentOrdersTable cryptoOrders={conpaniesData} onActivestatus={()=>{ resenddata() }} />
    </Card>
  );
}

export default RecentOrders;
