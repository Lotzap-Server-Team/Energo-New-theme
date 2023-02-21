import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from '../Cities/RecentOrdersTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { getCities, getPermissions } from '../../../redux/store/reducers/slices/UserSlice'
import { store } from 'src/redux/store';

function RecentOrders() {
  const [conpaniesData, setCompanyData]=useState([])

useEffect(()=>{
  getPermissionList()
},[])
function getPermissionList(){
  if(conpaniesData.length == 0){
    store.dispatch(getCities()).then((res: any) => {
      if (res && res.payload?.cities) {
        setCompanyData(res.payload?.cities);
      } 
    }); 
  }
}

const redata = ()=>{
  store.dispatch(getCities()).then((res: any) => {
    setCompanyData(res.payload?.cities);
}); 
}

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={conpaniesData} onActivestatus={()=> redata()}/>
    </Card>
  );
}

export default RecentOrders;
