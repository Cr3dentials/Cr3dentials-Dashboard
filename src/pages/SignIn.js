import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { Link } from 'react-router-dom';
import './index.css';

const SignIn = ({ onSignIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const handleSignIn = () => {
    setSignIn(true);
    if (onSignIn) {
      onSignIn();
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="container">
      <Box className="form-container">
        <div className='headingContainer'>
          <h1 className="form-heading">Welcome back 👋</h1>
          <h2 className="form-title">Log in to your Cr3dentials account</h2>
        </div>

        <TextField className="form-field" label="Email" id="email" margin="normal" variant="outlined" />

        <FormControl className="form-field" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Link to="/dashboard">
        <Button className="form-buttons" onClick={handleSignIn}>
          Login
        </Button>
        </Link>

        <div className="forgot-password">
          <Button color="primary">Forgot Password</Button>
        </div>

        <Divider className="or-divider">Or Sign In With</Divider>

        <Box className="social-icons">
          <IconButton aria-label="Login with Facebook" sx={{ flex: 1, border: '2px solid #F0F1F5', borderRadius: "1px", margin: "5px" }}>
            <FacebookIcon sx={{ width: '25%', height: '100%' }} />
          </IconButton>
          <IconButton aria-label="Login with Google" sx={{ flex: 1, border: '2px solid #F0F1F5', borderRadius: "1px", margin: "5px" }}>
            <GoogleIcon sx={{ width: '25%', height: '100%' }} />
          </IconButton>
          <IconButton aria-label="Login with Apple" sx={{ flex: 1, border: '2px solid #F0F1F5', borderRadius: "1px", margin: "5px" }}>
            <AppleIcon sx={{ width: '25%', height: '100%' }} />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
};

export default SignIn;