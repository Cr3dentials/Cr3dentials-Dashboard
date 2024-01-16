import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
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
          <ul className="transaction-list">
            {displayedUsers.map((user) => (
              <li key={user.userid} className={`status-${user.account_status}`} id="transactionList">
                <div className="transaction-header">
                  <span className="transaction-name">{user.username || 'Username'}</span>
                  <span className="transaction-name">{user.email || 'Email'}</span>
                  <span className="transaction-amount">{user.phone_number || 'Phone Number'}</span>
                </div>
                <div className="transaction-details">
                  <span className="transaction-status">{user.role || 'Role'}</span>
                  <span className="transaction-fee">{user.authentication_token || 'Authentication Token'}</span>
                  <span className="transaction-fee">{user.password || 'Password'}</span>
                </div>
              </li>
            ))}
          </ul>
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
