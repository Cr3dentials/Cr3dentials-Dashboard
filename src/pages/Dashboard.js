import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './index.css';

const Dashboard = ({ onSignOut, web3auth }) => {
  const totalInvoices = 6;
  const paidInvoices = 3;
  const unpaidInvoices = 3;

  const transactions = [
  { name: 'Christopher Barton', amount: 50, date: '2023-03-15', status: 'paid' },
  { name: 'Christopher Barton', amount: 30, date: '2023-03-18', status: 'active' },
  { name: 'Christopher Barton', amount: 20, date: '2023-03-22', status: 'unpaid' },
  { name: 'Christopher Barton', amount: 60, date: '2023-03-25', status: 'active' },
  { name: 'Christopher Barton', amount: 40, date: '2023-03-28', status: 'paidLate' },
  { name: 'Christopher Barton', amount: 35, date: '2023-04-01', status: 'paidEarly' },
  ];

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

  const [filterStatus, setFilterStatus] = useState('all');
  const [provider, setProvider] = useState(null);


  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  // const handleSignOut = () => {
  //   if (onSignOut) {
  //     onSignOut();
  //   }
  // };

    const handleSignOut = async () => {
      onSignOut();
    try {
      if (!web3auth) {
        console.log('web3auth not initialized yet');
        return;
      }

      const web3authProvider = await web3auth.logout();
      setProvider(web3authProvider);
      // setAddress('');
      // setUserData({});
      onSignOut();
    } catch (error) {
      console.error(error);
    }
  };

  const renderTransactions = (transactions) => {
    return (
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index} className={`status-${transaction.status}`} id="transactionList">
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
                  backgroundColor: `${getStatusColor(transaction.status)}10`, 
                  padding: '0px 5px', 
                  display: 'inline-block',
                }}
              >
                {transaction.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    )
  };

  return (
    <div className="outer-container">
      <div className="top-row">
        <div className="user-info">
          <Avatar className="user-icon" alt="Ahmer" src="/static/images/avatar/1.jpg" />
          <div className="welcomeUser">
            <span className="welcome-message">Welcome !</span>
            <span>Hey Ahmer 👋</span>
          </div>
        </div>
        <Button variant="contained" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
      <div className="dashSummary">
        <Card className="invoice-card">
          <CardContent>
            <h2>Total Invoices</h2>
            <p>{totalInvoices}</p>
          </CardContent>
        </Card>

        <Card className="invoice-card">
          <CardContent>
            <h2>Paid Invoices</h2>
            <p>{paidInvoices}</p>
          </CardContent>
        </Card>

        <Card className="invoice-card">
          <CardContent>
            <h2>Unpaid Invoices</h2>
            <p>{unpaidInvoices}</p>
          </CardContent>
        </Card>
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
        {renderTransactions(transactions)}
      </div>
    </div>
  );
};

export default Dashboard;
