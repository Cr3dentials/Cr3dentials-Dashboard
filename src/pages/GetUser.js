import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import "./index.css"

const UserInfo = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Fetch user data
      const userDataResponse = await axios.get(
        `https://hsc6elksf6pmumjz7mnpb5ovza0rwpws.lambda-url.us-east-1.on.aws/?userId=${userId}`
      );
      // Fetch additional user details
      const userDetailsResponse = await axios.post(
        'https://lu3fimyuqqbhj5zxkqtv3azyoe0gsxks.lambda-url.us-east-1.on.aws/',
        {
          httpMethod: 'GET',
          pathParameters: {
            userId: userId,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setUserData(userDataResponse.data);
      console.log(userDataResponse.data, "Set User Data");
      setError(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData(null);
      setError('An error occurred while fetching user data.');
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

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {userData && (
        <div>
          <h2>User Information</h2>
          <p>
            {/* <strong>User ID:</strong> {userData.userId} */}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
