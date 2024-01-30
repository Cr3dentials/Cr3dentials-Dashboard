import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

import './index.css';

const CreateUser = () => {
  const roles = [2, 1, 3];
  const [formData, setFormData] = useState({
    username: '', //username we get from web3auth
      email: '', // the user's email we get from web3auth
      walletAddress:'', // get the wallet address from web3auth
      password: 'pass123',
      phone_number: '9194012233',
      role: '2',
      created_date: getCurrentDate(),
      authentication_token: 'authtokendemo',
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

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      phone_number: '',
      role: '',
      walletAddress:'',
      created_date: getCurrentDate(),
      authentication_token: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {  
      setFormData({
        ...formData,
      });
  
      const response = await axios.post(
        'https://t5epo0n12j.execute-api.us-east-1.amazonaws.com/Stage/user',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('User has been successfully created!');
      resetForm();
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form data:', error);
      alert('Error creating user. Please try again.');
    }
  };

  return (
    <>
      <div className="outer-container">
        <div className='pageHeading'>Create User</div>
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
          label="Auth Token"
          name="authentication_token"
          value={formData.authentication_token}
          onChange={handleChange}
          fullWidth
          margin="normal"
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
        {/* <TextField
          label="Created Date"
          name="created_date"
          value={formData.created_date}
          fullWidth
          margin="normal"
          disabled
        /> */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add User
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
