import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { store } from 'src/redux/store';
import { getCompanies } from 'src/redux/store/reducers/slices/UserSlice';

function RecentOrders() {
  const [conpaniesData, setCompanyData]=useState([])
useEffect(()=>{
  companyList();
},[])

const companyList = ()=>{
  store.dispatch(getCompanies()).then((res: any) => {
    console.log("my res", res)
    if (res && res.payload.companies) {
      setCompanyData(res.payload.companies);
    }
    // else{
    //   toast.error(res.payload.message);
    // } 
  }); 
}




  return (
    <Card>
      <RecentOrdersTable cryptoOrders={conpaniesData} onActivestatus={()=>{ companyList() }}  />
    </Card>
  );
}

export default RecentOrders;
