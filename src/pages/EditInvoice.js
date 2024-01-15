import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const EditInvoice = ({ invoice, onClose }) => {
  const [editedInvoiceData, setEditedInvoiceData] = useState({
    // Initialize with the existing invoice data
    payer_address: invoice.payer_address,
    payee_address: invoice.payee_address,
    // ... other fields ...
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInvoiceData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Make a PUT request to update the invoice
      await axios.put(`https://t5epo0n12j.execute-api.us-east-1.amazonaws.com/Stage/invoices/${invoice.invoice_id}`, {
        ...editedInvoiceData,
      });

      // Close the modal and trigger a data refresh
      onClose();
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
  };

  return (
    <div className="edit-invoice-modal">
      <h2>Edit Invoice</h2>
      <form>
        <TextField
          label="Payer Address"
          name="payer_address"
          value={editedInvoiceData.payer_address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        {/* ... other fields ... */}
        <Button onClick={handleSave} variant="contained" color="primary" fullWidth>
          Save Changes
        </Button>
      </form>
      <Button onClick={onClose} variant="outlined" color="secondary" fullWidth>
        Cancel
      </Button>
    </div>
  );
};

export default EditInvoice;
