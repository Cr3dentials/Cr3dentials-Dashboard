import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './index.css';
import AllUsersList from '../Components/AllUsersList';

const UserInfo = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      throw new Error(`An error occurred while fetching data.`);
    }
  };

  const renderUserData = (userData) => {
    return (
      <div>
      {userData && userData.user && userData.user.length > 0 ? (
      // <h2>User Information</h2>
        <ul className="transaction-list m-6">
          <li className={`status-${userData.user[0].account_status}`}>
            <div className="transaction-details">
              <span className="transaction-name">User ID:</span>
              <span className="transaction-amount">{userData.user[0].userid}</span>
            </div>
            <div className="transaction-details">
              <span className="transaction-name">Username:</span>
              <span className="transaction-amount">{userData.user[0].username}</span>
            </div>
            <div className="transaction-details">
              <span className="transaction-name">Phone Number:</span>
              <span className="transaction-amount">{userData.user[0].phone_number}</span>
            </div>
            <div className="transaction-details">
              <span className="transaction-name">Role:</span>
              <span className="transaction-amount">{userData.user[0].role}</span>
            </div>
            <div className="transaction-details">
              <span className="transaction-name">Created Date:</span>
              <span className="transaction-amount">{userData.user[0].created_date}</span>
            </div>
            <div className="transaction-details">
              <span className="transaction-name">Last Login Date:</span>
              <span className="transaction-amount">{userData.user[0].last_login_date}</span>
            </div>
            <div className="transaction-details">
              <span className="transaction-name">Account Status:</span>
              <span className="transaction-amount">{userData.user[0].account_status}</span>
            </div>
          </li>
        </ul>
      ) : (
        userData && <p>No user information available for the specified ID.</p>
      )}
    </div>
    );
  }; 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userDataResponse = await fetchData(
        `https://t5epo0n12j.execute-api.us-east-1.amazonaws.com/Stage/users/details/${userId}`
      );

      setUserData(userDataResponse);
      setError(null);
    } catch (error) {
      setUserData(null);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='outer-container'>
      <form style={{ maxWidth: '400px', margin: '20px auto' }} onSubmit={handleSubmit}>
        <TextField
        className='userInput'
          label="Input User ID"
          name="userId"
          value={userId}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Get User Data
        </Button>
      </form>

      {loading &&  <CircularProgress style={{ margin: '20px auto', display: 'block' }} />}
      {error && <p>Error: {error}</p>}

      {renderUserData(userData)}

      <hr />

      <AllUsersList />
    </div>
  );
};

export default UserInfo;
