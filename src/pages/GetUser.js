import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './index.css';

const UserInfo = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [fetchAllUsers, setFetchAllUsers] = useState(null);
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

  const fetchAllUsersData = async () => {
    try {
      const allUsersResponse = await fetchData(
        'https://t5epo0n12j.execute-api.us-east-1.amazonaws.com/Stage/users/1'
      );
      setFetchAllUsers(allUsersResponse);
    } catch (error) {
      setFetchAllUsers(null);
      console.error('Error fetching all users data:', error);
    }
  };

  useEffect(() => {
    // Fetch all users data when the component mounts
    fetchAllUsersData();
  }, []); // Empty dependency array ensures the effect runs once after the first render

  const renderUserData = (userData) => {
    return (
      <div>
        <h2>User Information</h2>
        {userData && userData.user && userData.user.length > 0 ? (
          <>
            <p>
              <strong>User ID:</strong> {userData.user[0].userid}
            </p>
            <p>
              <strong>Username:</strong> {userData.user[0].username}
            </p>
            <p>
              <strong>Phone Number:</strong> {userData.user[0].phone_number}
            </p>
            <p>
              <strong>Role:</strong> {userData.user[0].role}
            </p>
            <p>
              <strong>Created Date:</strong> {userData.user[0].created_date}
            </p>
            <p>
              <strong>Last Login Date:</strong> {userData.user[0].last_login_date}
            </p>
            <p>
              <strong>Account Status:</strong> {userData.user[0].account_status}
            </p>
          </>
        ) : (
          userData && <p>No user information available for the specified ID.</p>
        )}
      </div>
    );
  };

  const renderAllUsersTable = (fetchAllUsers) => {
    return (
      <div>
        <h2>All Users</h2>
        {fetchAllUsers && fetchAllUsers.users && fetchAllUsers.users.length > 0 ? (
          fetchAllUsers.users.map((user) => (
            <div key={user.userid}>
              <p>
                <strong>User ID:</strong> {user.userid}
              </p>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Phone Number:</strong> {user.phone_number}
              </p>
              <p>
                <strong>Password:</strong> {user.password}
              </p>
              <p>
                <strong>Authentication Token:</strong> {user.authentication_token}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Account Status:</strong> {user.account_status}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          ))
        ) : (
          fetchAllUsers && <p>No user information available.</p>
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
      <form onSubmit={handleSubmit}>
        <TextField
          type='number'
          label="User ID"
          name="userId"
          value={userId}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Get User Data
        </Button>
      </form>

      {loading && <CircularProgress style={{ margin: '20px' }} />}
      {error && <p>Error: {error}</p>}

      {renderUserData(userData)}

      <hr /> {/* Section Divider */}

      {renderAllUsersTable(fetchAllUsers)}
    </div>
  );
};

export default UserInfo;
