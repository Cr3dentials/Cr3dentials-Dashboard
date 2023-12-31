import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const roles = ['Admin', 'User', 'Guest'];

const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: '',
    role: '',
    created_date: getCurrentDate(),
    authentication_token: "testingtoken"
  });

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://fpwpyyjfamwujijz56gogk3wam0yoqkh.lambda-url.us-east-1.on.aws/', {
            body: {
              ...formData,
            },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        type="email"
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        type="password"
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Phone Number"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        select
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      >
        {roles.map((role) => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Creation Date"
        name="creationDate"
        value={formData.created_date}
        fullWidth
        margin="normal"
        disabled
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Create User
      </Button>
    </form>
  );
};

export default CreateUser;
