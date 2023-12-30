import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Icon1 from "../images/dashIcon1.png";
import Icon2 from "../images/dashIcon2.png";
import Icon3 from "../images/dashIcon3.png";
import bellIcon from "../images/bellIcon.png";
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const Dashboard = ({ userName }) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://v4ae2rk43ktmsyuwohefx5wr6a0njgsw.lambda-url.us-east-1.on.aws');
        console.log('API Response:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const transactions = [
    { name: 'Christopher Barton', amount: 50, date: '2023-03-15', status: 'paid' },
    { name: 'Christopher Barton', amount: 30, date: '2023-03-18', status: 'active' },
    { name: 'Christopher Barton', amount: 20, date: '2023-03-22', status: 'unpaid' },
    { name: 'Christopher Barton', amount: 60, date: '2023-03-25', status: 'active' },
    { name: 'Christopher Barton', amount: 40, date: '2023-03-28', status: 'paidLate' },
    { name: 'Christopher Barton', amount: 35, date: '2023-04-01', status: 'paidEarly' },
  ];

  const [filterStatus, setFilterStatus] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [bottomNavValue, setBottomNavValue] = useState('home');

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBottomNavChange = (event, newValue) => {
    setBottomNavValue(newValue);
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filterStatus === 'all') return true;
    return (
      transaction.status === filterStatus ||
      (filterStatus === 'paid' && transaction.status === 'paidEarly') ||
      (filterStatus === 'paid' && transaction.status === 'paidLate')
    );
  });

  const renderTransactions = (transactions) => {
    return (
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index} className={`status-${transaction.status}`}>
            <div className="transaction-header">
              <span className="transaction-name">{transaction.name}</span>
              <span className="transaction-amount">${transaction.amount}</span>
            </div>
            <div className="transaction-details">
              <span className="transaction-date">{transaction.date}</span>
              <span
                className="transaction-status"
                style={{
                  color: getStatusColor(transaction.status),
                  border: `1px solid ${getStatusColor(transaction.status)}`,
                  borderRadius: '30px',
                  backgroundColor: `${getStatusColor(transaction.status)}10`, // 
                  padding: '0px 5px', // 
                  display: 'inline-block',
                }}
              >
                {transaction.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return '#20C375';
      case 'active':
        return '#1677FF';
      case 'unpaid':
        return '#C52CEE';
      case 'paidEarly':
        return '#FA8C16';
      case 'paidLate':
        return '#F5222D';
      default:
        return '#1677FF';
    }
  };

  return (
    <div className="outer-container">
      <div className="top-row">
        <div className="user-info">
        <Avatar className="user-icon" alt="Ahmer" src="/static/images/avatar/1.jpg" />
         <div className="welcomeUser">
         <span className="welcome-message">Welcome !</span>
         <span >Hey Ahmer  👋</span>
         </div>
        </div>
        <img src={bellIcon} className="bell-icon" />
      </div>

      <Tabs
        value={tabValue}
        onChange={handleChangeTab}
        centered
        className="tabs-container"
      >
        <Tab label="Get Paid" />
        <Tab label="Pay Now" />
      </Tabs>

      <div className="analytics-row">
        <div className="analytics-box">
          <div className='iconsContainer'>
            <img src={Icon1} alt='Invoice Icon' />
          </div>
          <div>
            <p style={{ fontSize: '24px' }}>40</p>
            <h3 style={{ fontSize: '18px' }}>Received Invoices</h3>
          </div>
        </div>
        <div className="analytics-box">
          <div className='iconsContainer'>
            <img src={Icon2} alt='Invoice Icon' />
          </div>
          <div>
            <p style={{ fontSize: '24px' }}>236</p>
            <h3 style={{ fontSize: '18px' }}>Active Invoices</h3>
          </div>
        </div>
        <div className="analytics-box">
          <div className='iconsContainer'>
            <img src={Icon3} alt='Invoice Icon' />
          </div>
          <div>
            <p style={{ fontSize: '24px' }}>10</p>
            <h3 style={{ fontSize: '18px' }}>Overdue Invoices</h3>
          </div>
        </div>
      </div>

      <div className="filter-dropdown">
        <select id="statusFilter" value={filterStatus} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="active">Active</option>
          <option value="paidLate">Paid Late</option>
          <option value="paidEarly">Paid Early</option>
        </select>
      </div>

      <div className="transaction-list">
        <h2>Transaction List</h2>
        {tabValue === 0 && renderTransactions(filteredTransactions)}
        {tabValue === 1 && renderTransactions(transactions)}
      </div>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            value={bottomNavValue}
            onChange={handleBottomNavChange}
            showLabels
            className="bottom-navigation"
          >
            <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} component={Link} to="/dashboard" />
            <BottomNavigationAction label="Invoices" value="invoices" icon={<ReceiptIcon />} component={Link} to="/invoices" />
            <BottomNavigationAction label="Score" value="score" icon={<AssessmentIcon />} component={Link} to="/score" />
            <BottomNavigationAction label="Wallet" value="wallet" icon={<AccountBalanceWalletIcon />} component={Link} to="/wallet" />
            <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon />} component={Link} to="/profile" />
          </BottomNavigation>
        </Paper>
    </div>
    
  );
};

export default Dashboard;
