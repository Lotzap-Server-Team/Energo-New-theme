import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { getUsers } from 'src/redux/store/reducers/slices/UserSlice';
import { store } from 'src/redux/store';

function RecentOrders() {
  const [conpaniesData, setCompanyData]=useState([])
useEffect(()=>{
  // fetch('https://laravel.cppatidar.com/energo/backend/api/getCompanies',{
  //   method: 'GET',
  //   headers: {
  //      'Content-type': 'application/json; charset=UTF-8',
  //      'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTc0MGViNjQ4MTg5NjQzNTE4ZGM2M2MzNTg0ZWY5MTFlM2NlZDA0OGMwMjU1YWU4MzFlMzgwZDY5N2YzZDE5ODJjOTFjYzNlY2VjMzQwYjciLCJpYXQiOjE2NzYyNzI5NzkuNzg3NjEzLCJuYmYiOjE2NzYyNzI5NzkuNzg3NjE4LCJleHAiOjE3MDc4MDg5NzkuNzMwNDU2LCJzdWIiOiIxMCIsInNjb3BlcyI6W119.GY8OpFXRo2_Rd2wLHz0_pMHn4E1Eb_mw31lXjaXDKIJB9mM5UuMfyUQmUT2dGw8RwFCNYHPmhTFvj5ku2wgqKfDZ050kun6O67VkQhUbeicTy3rz7uVpPdcrCgmVFjHaeHw2sq-ttwwhlV2Qn4NBqTcnuDlPsVox4w0uW-x9345OVqTaIV8rsw8D8Rw7nzX2yZZyyUl61vKg033KA5MIT7E2_v7CwzwSV2awIcl_c0w0E0yTXxQf2IGV6k_T25iAe7Nxy84tlHnSC3pjyvfcaR75hlBQK1UQdcQxbOzCbVjCdTiOciQ34T4vXHzNPXduSwNR-uSJfQWb4qXkondATxXhPVya1r-eJQL1U-q2C-8Dw-2yzUqAUYVNfcJK0n9q9dtjebDqmJyJGVvGwutoe0Aaue-qKWEyghPwn-zteuhzEv2bOqeucsVuF1ytMC8E6d3NZEQGG5yDog4VOTea02-TjjeTQTpe_bCnc9tJCRtcEstzN2sdfOwxu7R7DEoSAoWEnmiLvGKbvxaPmXWXtnin3MbJyzgLqtf8K7oQAI6-pTM3CtDxXMPuLmXTSKvxSPAsGx0wxicUF8dLUQwobsmbC9UQTQxLYbbhF32Td9SmCXAWqFntJZR4IpyzKjqdtxkka3UzUo9pvakV5m6PBOM2VZx5e0mDm_Wxbb2mbxI`,
  //   },
  // })
  // .then((response) => response.json())
  // .then((data) => {
  //    console.log(data.companies,"get api data");
  //    setCompanyData(data.companies)
  // })
  // .catch((err) => {
  //    console.log(err.message);
  // });
  userList()
},[])


const userList = ()=>{
  store.dispatch(getUsers()).then((res: any) => {
    // console.log("my res", res)
    if (res && res.payload.users) {
      setCompanyData(res.payload.users);
    }
    // else{
    //   toast.error(res.payload.message);
    // } 
  }); 
}


  return (
    <Card>
      <RecentOrdersTable cryptoOrders={conpaniesData} />
    </Card>
  );
}

export default RecentOrders;
