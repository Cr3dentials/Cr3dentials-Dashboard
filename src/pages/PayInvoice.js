import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import './index.css'

const PayInvoice = () => {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    currency: '',
    externalId: '',
    payer: {
      partyIdType: '',
      partyId: '',
    },
    payerMessage: '',
    payeeNote: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://6qzt5ln7unptw7z3gpgmwxayhq0ykjkb.lambda-url.us-east-1.on.aws/',
        paymentData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Payment successful:', response.data);
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };

  return (
    <div className='outer-container'>
      <h2 className='my-5 mx-auto text-xl text-center'>Pay Invoice</h2>
      <form onSubmit={handleSubmit} style={{ width: '75%', margin: 'auto' }}>
        <TextField
          label="Amount"
          name="amount"
          value={paymentData.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <InputLabel htmlFor="currency">Currency</InputLabel>
        <Select
          label="Currency"
          name="currency"
          value={paymentData.currency}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="GBP">GBP</MenuItem>
          <MenuItem value="CED">CED</MenuItem>
        </Select>
        <TextField
          label="External ID"
          name="externalId"
          value={paymentData.externalId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Party ID Type"
          name="partyIdType"
          value={paymentData.payer.partyIdType}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Party ID"
          name="partyId"
          value={paymentData.payer.partyId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Payer Message"
          name="payerMessage"
          value={paymentData.payerMessage}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Payee Note"
          name="payeeNote"
          value={paymentData.payeeNote}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Pay Now
        </Button>
      </form>
    </div>
  );
};

export default PayInvoice;
