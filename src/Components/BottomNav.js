import React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const BottomNav = () => {
  return (
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} component={Link} to="/dashboard" />
        <BottomNavigationAction label="Invoices" value="invoices" icon={<ReceiptIcon />} component={Link} to="/invoices" />
        <BottomNavigationAction label="Score" value="score" icon={<AssessmentIcon />} component={Link} to="/score" />
        <BottomNavigationAction label="Wallet" value="wallet" icon={<AccountBalanceWalletIcon />} component={Link} to="/wallet" />
        <BottomNavigationAction label="Payments" value="Payments" icon={<AccountBalanceWalletIcon />} component={Link} to="/payments" />
        <BottomNavigationAction label="Create User" value="create-user" icon={<AccountBalanceWalletIcon />} component={Link} to="/create-user" />
        <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon />} component={Link} to="/profile" />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
