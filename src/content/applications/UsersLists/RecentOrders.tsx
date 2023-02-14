import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';

function RecentOrders() {
  const [conpaniesData, setCompanyData]=useState([])
useEffect(()=>{
  fetch('https://laravel.cppatidar.com/energo/backend/api/getCompanies',{
    method: 'GET',
    headers: {
       'Content-type': 'application/json; charset=UTF-8',
       'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTc0MGViNjQ4MTg5NjQzNTE4ZGM2M2MzNTg0ZWY5MTFlM2NlZDA0OGMwMjU1YWU4MzFlMzgwZDY5N2YzZDE5ODJjOTFjYzNlY2VjMzQwYjciLCJpYXQiOjE2NzYyNzI5NzkuNzg3NjEzLCJuYmYiOjE2NzYyNzI5NzkuNzg3NjE4LCJleHAiOjE3MDc4MDg5NzkuNzMwNDU2LCJzdWIiOiIxMCIsInNjb3BlcyI6W119.GY8OpFXRo2_Rd2wLHz0_pMHn4E1Eb_mw31lXjaXDKIJB9mM5UuMfyUQmUT2dGw8RwFCNYHPmhTFvj5ku2wgqKfDZ050kun6O67VkQhUbeicTy3rz7uVpPdcrCgmVFjHaeHw2sq-ttwwhlV2Qn4NBqTcnuDlPsVox4w0uW-x9345OVqTaIV8rsw8D8Rw7nzX2yZZyyUl61vKg033KA5MIT7E2_v7CwzwSV2awIcl_c0w0E0yTXxQf2IGV6k_T25iAe7Nxy84tlHnSC3pjyvfcaR75hlBQK1UQdcQxbOzCbVjCdTiOciQ34T4vXHzNPXduSwNR-uSJfQWb4qXkondATxXhPVya1r-eJQL1U-q2C-8Dw-2yzUqAUYVNfcJK0n9q9dtjebDqmJyJGVvGwutoe0Aaue-qKWEyghPwn-zteuhzEv2bOqeucsVuF1ytMC8E6d3NZEQGG5yDog4VOTea02-TjjeTQTpe_bCnc9tJCRtcEstzN2sdfOwxu7R7DEoSAoWEnmiLvGKbvxaPmXWXtnin3MbJyzgLqtf8K7oQAI6-pTM3CtDxXMPuLmXTSKvxSPAsGx0wxicUF8dLUQwobsmbC9UQTQxLYbbhF32Td9SmCXAWqFntJZR4IpyzKjqdtxkka3UzUo9pvakV5m6PBOM2VZx5e0mDm_Wxbb2mbxI`,
    },
  })
  .then((response) => response.json())
  .then((data) => {
     console.log(data.companies,"get api data");
     setCompanyData(data.companies)
  })
  .catch((err) => {
     console.log(err.message);
  });
},[])


  const cryptoOrders: CryptoOrder[] = [
    {
      id: '1',
      orderDetails: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'completed',
      orderID: 'VUVX709ET7BY',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 34.4565,
      amount: 56787,
      cryptoCurrency: 'ETH',
      currency: '$'
    },
    {
      id: '2',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: '23M3UOG65G8K',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '3',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 5).getTime(),
      status: 'failed',
      orderID: 'F6JHK65MS818',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '4',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 55).getTime(),
      status: 'completed',
      orderID: 'QJFAI7N84LGM',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '5',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 56).getTime(),
      status: 'pending',
      orderID: 'BO5KFSYGC0YW',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '6',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 33).getTime(),
      status: 'completed',
      orderID: '6RS606CBMKVQ',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '7',
      orderDetails: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'pending',
      orderID: '479KUYHOBMJS',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1212',
      amountCrypto: 2.346546,
      amount: 234234,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '8',
      orderDetails: 'Paypal Withdraw',
      orderDate: subDays(new Date(), 22).getTime(),
      status: 'completed',
      orderID: 'W67CFZNT71KR',
      sourceName: 'Paypal Account',
      sourceDesc: '*** 1111',
      amountCrypto: 3.345456,
      amount: 34544,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '9',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 11).getTime(),
      status: 'completed',
      orderID: '63GJ5DJFKS4H',
      sourceName: 'Bank Account',
      sourceDesc: '*** 2222',
      amountCrypto: 1.4389567945,
      amount: 123843,
      cryptoCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '10',
      orderDetails: 'Wallet Transfer',
      orderDate: subDays(new Date(), 123).getTime(),
      status: 'failed',
      orderID: '17KRZHY8T05M',
      sourceName: 'Wallet Transfer',
      sourceDesc: "John's Cardano Wallet",
      amountCrypto: 765.5695,
      amount: 7567,
      cryptoCurrency: 'ADA',
      currency: '$'
    }
  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={conpaniesData} />
    </Card>
  );
}

export default RecentOrders;
