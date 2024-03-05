import React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
// import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import PaidIcon from '@mui/icons-material/Paid';
import HelpIcon from '@mui/icons-material/Help';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const BottomNav = ({ userType }) => {
  const renderUserNav = () => (
    <>
      <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} component={Link} to="/credit-score" />
      <BottomNavigationAction label="Invoices" value="invoices" icon={<ReceiptIcon />} component={Link} to="/invoices" />
      {/* <BottomNavigationAction label="Score" value="score" icon={<AssessmentIcon />} component={Link} to="/credit-score" /> */}
      <BottomNavigationAction label="Wallet" value="wallet" icon={<AccountBalanceWalletIcon />} component={Link} to="/wallet" />
      <BottomNavigationAction label="Payments" value="Payments" icon={<PaidIcon />} component={Link} to="/payments" />
    </>
  );

  const renderBusinessNav = () => (
    <>
      <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} component={Link} to="/transaction-list" />
      <BottomNavigationAction label="Create Invoice" value="create-invoice" icon={<ReceiptIcon />} component={Link} to="/create-invoice" />
      {/* <BottomNavigationAction label="Invoice Management" value="invoice-management" icon={<BusinessCenterIcon />} component={Link} to="/invoice-management" /> */}
      {/* <BottomNavigationAction label="Transactions" value="transactions" icon={<ListAltIcon />} component={Link} to="/transaction-list" /> */}
      <BottomNavigationAction label="Analytics" value="analytics" icon={<AnalyticsIcon />} component={Link} to="/analytics" />
    </>
  );
  
  const renderCommonNav = () => (
    <>
      {/* <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} component={Link} to="/home" /> */}
      {/* <BottomNavigationAction label="About" value="about" icon={<HelpIcon />} component={Link} to="/about" /> */}
      <BottomNavigationAction label="Contact" value="contact" icon={<PersonIcon />} component={Link} to="/contact" />
      <BottomNavigationAction label="FAQs" value="faqs" icon={<HelpIcon />} component={Link} to="/faqs" />
    <BottomNavigationAction label="Settings" value="settings" icon={<SettingsIcon />} component={Link} to="/settings" />
    </>
  );

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999, }} elevation={3}>
      <BottomNavigation showLabels>
        {userType === 'user' && renderUserNav()}
        {userType === 'business' && renderBusinessNav()}
        {renderCommonNav()}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
