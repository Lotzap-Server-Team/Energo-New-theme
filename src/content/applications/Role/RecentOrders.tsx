import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from '../Role/RecentOrdersTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { getCountries, getRoles, } from '../../../redux/store/reducers/slices/UserSlice'
import { store } from 'src/redux/store';

function RecentOrders() {
  const [conpaniesData, setCompanyData]=useState([])
useEffect(()=>{
  getPermissionList()
},[])
function getPermissionList(){
  if(conpaniesData.length == 0){
    store.dispatch(getRoles()).then((res: any) => {
      console.log(res , "roles myresponse")

      if (res && res.payload?.roles) {
        setCompanyData(res.payload?.roles);
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
