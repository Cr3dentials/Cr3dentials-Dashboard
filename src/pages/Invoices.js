import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

const InvoicesPerPage = 10;

const Invoice = ({ onSignOut }) => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [open, setOpen] = useState(false);
  const [labelVisibility, setLabelVisibility] = useState({
    creation_date: Boolean(invoices[0]?.creation_date),
    due_date: Boolean(invoices[0]?.due_date),
  });
  const [editedInvoice, setEditedInvoice] = useState({
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
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://t5epo0n12j.execute-api.us-east-1.amazonaws.com/Stage/invoices');
        setInvoices(response.data.invoices);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFocus = (fieldName) => {
    setLabelVisibility((prevVisibility) => ({
      ...prevVisibility,
      [fieldName]: true,
    }));
  };

  const handleBlur = (fieldName) => {
    if (!editedInvoice[fieldName]) {
      setLabelVisibility((prevVisibility) => ({
        ...prevVisibility,
        [fieldName]: false,
      }));
    }
  };

  const handleDeleteClick = async (invoiceId) => {
    try {
      setLoading(true);
      await axios.delete(`https://t5epo0n12j.execute-api.us-east-1.amazonaws.com/Stage/invoices/${invoiceId}`);
      setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.data.invoice_id !== invoiceId));
      setSelectedInvoice(null);
    } catch (error) {
      console.error('Error deleting invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (invoice) => {
    setSelectedInvoice(invoice);
    setEditedInvoice(invoice);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInvoice((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.put(
        `https://t5epo0n12j.execute-api.us-east-1.amazonaws.com/Stage/invoices/${selectedInvoice?.invoice_id ?? ''}`,
        { body: editedInvoice },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data);
      setOpen(false);
    } catch (error) {
      console.error('Error updating invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * InvoicesPerPage;
  const endIndex = startIndex + InvoicesPerPage;
  const displayedInvoices = invoices.slice(startIndex, endIndex);

  return (
    <div className="outer-container">
      <div className='pageHeading'>Invoice</div>
      <div className="Invoicecontainer">
        <Link to="/create-invoice"><Button variant="contained">Create Invoice</Button></Link>
        <Link to="/pay-invoice"><Button variant="outlined" color='success'>Pay Invoice</Button></Link>
      </div>
      <div className="transaction-list">
        <h2>Transaction List</h2>
        {loading ? (
          <CircularProgress style={{ margin: '20px auto', display: 'block' }} />
        ) : (
          <ul>
            {displayedInvoices.map((invoice, index) => (
              <li key={index} className={`status-${invoice.status}`} id="transactionList">
                <div className="transaction-header">
                  <span className="transaction-name">{invoice.payer_address}</span>
                  <span className="transaction-name">{invoice.payee_address}</span>
                  <span className="transaction-amount">${invoice.amount}</span>
                </div>
                <div className="transaction-details">
                  <span className="transaction-date">{invoice.creation_date}</span>
                  <span className="transaction-status">Status: {invoice.status}</span>
                  <span className="transaction-fee">Fee: ${invoice.fee}</span>
                </div>
                <div className="transaction-actions">
                  <Button variant="contained" onClick={() => handleEditClick(invoice)}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteClick(invoice.invoice_id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Pagination
          count={Math.ceil(invoices.length / InvoicesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', border: 'none' }}
        />
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            maxHeight: '80vh',
            overflowY: 'auto',
            bgcolor: 'white',
            p: 3,
            borderRadius: '8px',
            boxShadow: 24,
          }}
        >
          <h2 className='transaction-header transaction-name'>Edit Invoice</h2>
          <form onSubmit={handleEditSubmit}>
          <TextField
              label="Payer Address"
              name="payer_address"
              value={editedInvoice.payer_address}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
      label="Payee Address"
      name="payee_address"
      value={editedInvoice.payee_address}
      onChange={handleInputChange}
      fullWidth
      margin="normal"
      required
    />
    <TextField
      type="number"
      label="Amount"
      name="amount"
      value={editedInvoice.amount}
      onChange={handleInputChange}
      fullWidth
      margin="normal"
      required
    />
    <TextField
      type="number"
      label="Fee"
      name="fee"
      value={editedInvoice.fee}
      onChange={handleInputChange}
      fullWidth
      margin="normal"
      required
    />
            <TextField
              type="date"
              label={labelVisibility.creation_date ? 'Creation Date' : ''}
              name="creation_date"
              value={editedInvoice.creation_date.split('T')[0]}
              onChange={handleInputChange}
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
              value={editedInvoice.due_date.split('T')[0]} 
              onChange={handleInputChange}
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
      value={editedInvoice.status}
      onChange={handleInputChange}
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
      value={editedInvoice.approvals}
      onChange={handleInputChange}
      fullWidth
      margin="normal"
      required
    >
      <MenuItem value="1">Approved</MenuItem>
      <MenuItem value="0">Not Approved</MenuItem>
    </TextField>
            <TextField
              type="text"
              label="Email"
              name="email"
              value={editedInvoice.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Invoice
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Invoice;
