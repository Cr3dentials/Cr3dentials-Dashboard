import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import '../../index.css';


const CreateInvoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    payer_address: 'test payer',
    payee_address: 'test payee',
    amount: '5000',
    fee: '5',
    creation_date: '2/2/2024',
    due_date: '2/12/2024',
    status: '1',
    approvals: '1',
    email: 'testemail1@gmail.com',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [labelVisibility, setLabelVisibility] = useState({
    creation_date: false,
    due_date: false,
  });

  const handleChange = (e) => {
    let value = e.target.value;

    setInvoiceData((prevData) => ({
      ...prevData,
      [e.target.name]: value,
    }));
  };

  const handleFocus = (fieldName) => {
    setLabelVisibility((prevVisibility) => ({
      ...prevVisibility,
      [fieldName]: true,
    }));
  };

  const handleBlur = (fieldName) => {
    if (!invoiceData[fieldName]) {
      setLabelVisibility((prevVisibility) => ({
        ...prevVisibility,
        [fieldName]: false,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://t5epo0n12j.execute-api.us-east-1.amazonaws.com/Stage/invoices',
        { body: invoiceData },
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );
      console.log('Response:', response.data);
      setSubmissionStatus('success');
      setInvoiceData({
        payer_address: '',
        payee_address: '',
        amount: '',
        fee: '',
        creation_date: '',
        due_date: '',
        status: '',
        approvals: '',
        email: '',
      });
      setLabelVisibility({
        creation_date: false,
        due_date: false,
      });
    } catch (error) {
      console.error('Error creating invoice:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="outer-container">
      <div className='pageHeading'>Create Invoice</div>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <TextField
          label="Payer Address"
          name="payer_address"
          value={invoiceData.payer_address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Payee Address"
          name="payee_address"
          value={invoiceData.payee_address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="number"
          label="Amount"
          name="amount"
          value={invoiceData.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="number"
          label="Fee"
          name="fee"
          value={invoiceData.fee}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="date"
          label={labelVisibility.creation_date ? 'Creation Date' : ''}
              name="creation_date"
              value={invoiceData.creation_date}
              onChange={handleChange}
              onFocus={() => handleFocus('creation_date')}
              onBlur={() => handleBlur('creation_date')}
              fullWidth
          margin="normal"
          required
        />
        <TextField
          type="date"
          label={labelVisibility.due_date ? 'Due Date' : ''}
          name="due_date"
          value={invoiceData.due_date}
          onChange={handleChange}
          onFocus={() => handleFocus('due_date')}
          onBlur={() => handleBlur('due_date')}
          fullWidth
          margin="normal"
          required
        />
        <TextField
  select
  label="Status"
  name="status"
  value={invoiceData.status}
  onChange={handleChange}
  fullWidth
  margin="normal"
  required
>
  <MenuItem value="1">Paid</MenuItem>
  <MenuItem value="0">Unpaid</MenuItem>
</TextField>

<TextField
  select
  label="Approvals"
  name="approvals"
  value={invoiceData.approvals}
  onChange={handleChange}
  fullWidth
  margin="normal"
  required
>
  <MenuItem value="1">Approved</MenuItem>
  <MenuItem value="0">Not Approved</MenuItem>
</TextField>

        <TextField
          type="email"
          label="Email"
          name="email"
          value={invoiceData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Invoice
        </Button>
      </form>

      {submissionStatus === 'success' && (
        <p style={{ color: 'green' }}>Invoice created successfully!</p>
      )}

      {submissionStatus === 'error' && (
        <p style={{ color: 'red' }}>Error creating invoice. Please try again.</p>
      )}
    </div>
  );
};

export default CreateInvoice;