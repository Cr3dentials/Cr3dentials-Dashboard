import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Icon1 from "../images/dashIcon1.png";
import Icon2 from "../images/dashIcon2.png";
import Icon3 from "../images/dashIcon3.png";
import bellIcon from "../images/bellIcon.png";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import axios from 'axios';
import './index.css';

const Dashboard = ({ onSignOut }) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://v4ae2rk43ktmsyuwohefx5wr6a0njgsw.lambda-url.us-east-1.on.aws');
        setInvoices(response.data.invoices);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };
  
  const [filterStatus, setFilterStatus] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [signOut, setSignOut] = useState(false);

  const handleSignOut = () => {
    setSignOut(true);
    if (onSignOut) {
      onSignOut();
    }
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };


  const filteredInvoices = invoices.filter(invoice => {
    if (filterStatus === 'all') return true;
    return (
      invoice.status === filterStatus ||
      (filterStatus === 'paid' && invoice.status === 'paidEarly') ||
      (filterStatus === 'paid' && invoice.status === 'paidLate')
    );
  });

  const renderInvoices = (invoices) => {
    return (
      <ul>
        {invoices.map((invoice, index) => (
          <li key={index} className={`status-${invoice.status}`}>
            <div className="transaction-header">
              <span className="transaction-name">{invoice.payer_address}</span>
              <span className="transaction-name">
              {invoice.payee_address}
              </span>
              <span className="transaction-amount">${invoice.amount}</span>
            </div>
            <div className="transaction-details">
            <span className="transaction-date">{formatDate(invoice.creation_date)}</span>
              <span className="transaction-status">
                Status: {invoice.status}
              </span>
              <span className="transaction-fee">Fee: ${invoice.fee}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="outer-container">
      <div className="top-row">
        <div className="user-info">
        <Avatar className="user-icon" alt="Ahmer" src="/static/images/avatar/1.jpg" />
         <div className="welcomeUser">
         <span className="welcome-message">Welcome !</span>
         <span >Hey Ahmer 👋</span>
         </div>
        </div>
        <Button variant="contained" onClick={handleSignOut}>Sign Out</Button>
        {/* <img src={bellIcon} className="bell-icon" alt='notifications icon' /> */}
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
        {tabValue === 0 && renderInvoices(filteredInvoices)}
        {tabValue === 1 && renderInvoices(invoices)}
      </div>
    </div>
  );
};

export default Dashboard;