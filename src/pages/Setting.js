import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Setting = ({ onSignOut, web3auth }) => {
  const [provider, setProvider] = useState(null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    onSignOut();
    navigate('/', { replace: true });
    try {
      if (!web3auth) {
        console.log('web3auth not initialized yet');
        return;
      }
      const web3authProvider = await web3auth.logout();
      setProvider(web3authProvider);
      onSignOut();
      navigate('/', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="outer-container">
      <div className="top-row">
        <div className="user-info">
          <div className="welcomeUser">
            <span className="welcome-message">Settings</span>
          </div>
        </div>
        <Button variant="contained" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Setting;
