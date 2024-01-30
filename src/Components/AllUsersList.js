import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../pages/index.css";

const UsersPerPage = 10;

const fetchAllUsersData = async () => {
  try {
    const response = await axios.get(
      'https://t5epo0n12j.execute-api.us-east-1.amazonaws.com/Stage/users/1',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching all users data:', error);
    throw new Error('An error occurred while fetching all users data.');
  }
};

const AllUsersList = () => {
  const [fetchAllUsers, setFetchAllUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userDataResponse = await fetchAllUsersData();
      setFetchAllUsers(userDataResponse);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      setFetchAllUsers(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const totalUsers = fetchAllUsers?.users?.length || 0;
  const totalPages = Math.ceil(totalUsers / UsersPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * UsersPerPage;
  const endIndex = startIndex + UsersPerPage;
  const displayedUsers = fetchAllUsers?.users?.slice(startIndex, endIndex) || [];

  return (
    <div className='outer-container'>
      <h2 className='pageHeading'>All Users</h2>
      {loading ? (
        <CircularProgress style={{ margin: '20px auto', display: 'block' }} />
      ) : displayedUsers.length > 0 ? (
        <>
          {displayedUsers.map((user) => (
            <Accordion key={user.userid} className={`status-${user.account_status}`} id="userList">
              <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ width: "100%" }}>
                <Typography>
                  <h3>{user.username || 'N/A'}</h3>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p className='accordDetails'>Email: {user.email || 'N/A'}</p>
                  <p>Phone Number: {user.phone_number || 'N/A'}</p>
                  <p>Role: {user.role || 'N/A'}</p>
                  <p>Authentication Token: {user.authentication_token || 'N/A'}</p>
                  <p>Password: {user.password || 'N/A'}</p>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
          />
        </>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default AllUsersList;
