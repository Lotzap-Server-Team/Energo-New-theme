import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from '../Countries/RecentOrdersTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { getCountries, } from '../../../redux/store/reducers/slices/UserSlice'
import { store } from 'src/redux/store';

function RecentOrders() {
  const [conpaniesData, setCompanyData]=useState([])

useEffect(()=>{
  getPermissionList()
},[])
function getPermissionList(){
  if(conpaniesData.length == 0){
    store.dispatch(getCountries()).then((res: any) => {
      if (res && res.payload?.countries) {
      setCompanyData(res.payload?.countries);
      } 
    }); 
  }
}

const redata = ()=>{
  store.dispatch(getCountries()).then((res: any) => {
    setCompanyData(res.payload?.countries);
  })
}
  return (
    <Card>
      <RecentOrdersTable cryptoOrders={conpaniesData} onActiveClick={()=>{ redata() }}   />
    </Card>
  );
}

export default RecentOrders;
