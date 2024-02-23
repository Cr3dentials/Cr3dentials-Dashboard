import React, { useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import RPC from '../../pages/web3RPC';
import { Link } from 'react-router-dom';
import Logo from '../../images/Logo.png'
import axios from 'axios';
import './Carousel.css';

function Carousel({slides, onLogin, setWeb3auth}) {
  const [web3auth, setWeb3authLocal] = useState(null);
  const [userData, setUserData] = useState({});
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // const [formData, setFormData] = useState({
  //   username: userData.name,
  //   email: userData.email,
  //   wallet_address: walletAddress,
  //   password: 'pass123',
  //   phone_number: '9194012233',
  //   role: '2',
  //   created_date: getCurrentDate(),
  //   authentication_token: 'authtokendemo',
  // });

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // const resetForm = () => {
  //   setFormData({
  //     username: '',
  //     email: '',
  //     wallet_address: '',
  //     password: '',
  //     phone_number: '',
  //     role: '',
  //     created_date: getCurrentDate(),
  //     authentication_token: '',
  //   });
  // };

  const handleSubmit = async () => {
    try {
      const user = await web3auth.getUserInfo();
      setUserData(user);
      console.log(user , "user data")
      const rpc = new RPC(web3auth.provider);
      const address = await rpc.getAccounts();
      const apiFormData = {
        username : user.name,
        email : user.email,
        wallet_address : address,
        password: 'naikmir',
        phone_number: '9194012233',
        role: '2',
        created_date: getCurrentDate(),
        authentication_token: 'web3auth',
      }
      const response = await axios.post(
        'https://t5epo0n12j.execute-api.us-east-1.amazonaws.com/Stage/user',
        {
          body: apiFormData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );      
      console.log('Response after api:', response);
      // resetForm();
    } catch (error) {
      console.error('Error submitting form data:', error);
      alert('Error creating user. Please try again.');
    }
  };
  
  const handleModalClosure = () => {
    console.log('User closed the modal');
    setProvider(null);
    setWalletAddress('');
    setUserData({});
  };

  useEffect(() => {
    
    const init = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId: 'BMF2iwDfTyCtnq4qdLkvfmFe12v5sJLJOTPdeCXjQBkggAdPArkRRIhXPyqcLJUDQDejy6MPxU1H9OSVPRqM0eY',
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
          },
        });
  
        setWeb3authLocal(web3authInstance);
        setWeb3auth(web3authInstance);
        await web3authInstance.initModal();
  
        if (await isConnected()) {
          setProvider(web3authInstance.provider);
          // getUserInfo();
          // getAccounts();
           const user = await web3auth.getUserInfo();
      setUserData(user);
      console.log(user , "user data")
        }
  
        if (web3authInstance) {
          web3authInstance.on('close', handleModalClosure);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    init();
    return () => {
      if (web3auth) {
        web3auth.off('close', handleModalClosure);
      }
    };
  }, []);
  
  const isConnected = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return false;
    }
    return web3auth.status === 'connected';
  };
  
  const handleLogin = async () => {
    try {
      if (!web3auth) {
        console.log('web3auth not initialized yet');
        return;
      }
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider.provider);
  
      if (await isConnected()) {
        await handleSubmit('web3auth');
        onLogin('web3authLogin');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  // const handleSubmit = async () => {
  //   try {
  //   const user = await web3auth.getUserInfo();
  //   setUserData(user);
  //   const rpc = new RPC(web3auth.provider);
  //   const address = await rpc.getAccounts();
  //   const apiFormData = {
  //     username : user.name,
  //     email : user.email,
  //     wallet_address : address
  //   }
  //     console.log('user and address :', user, 'adddress = ', address);
  //     console.log('Handle submit :', apiFormData);
  //   } catch (error) {
  //     console.error('Error submitting form data:', error);
  //     alert('Error creating user. Please try again.');
  //   }
  // };
  
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentIndex, slides.length]);

  // useEffect(() => {
  //   console.log(userData, "Userdata")
  //   console.log(walletAddress, "Address usefeect")
  // }, [userData, walletAddress]);

  // const getUserInfo = async () => {
  //   if (!web3auth) {
  //     console.log('web3auth not initialized yet');
  //     return;
  //   }
  //   const user = await web3auth.getUserInfo();
  //   setUserData(user);
  //   // console.log(user.name, user.email, "user data");
  // };
  


  // const getAccounts = async () => {
  //   if (!web3auth) {
  //     console.log('provider not initialized yet');
  //     return;
  //   }
  //   const rpc = new RPC(web3auth.provider);
  //   const address = await rpc.getAccounts();
  //   setWalletAddress(address);
  //   console.log(address);
  // };
  

  return (
    <div className="carousel-container">
    <div className="top-bar">
      <img src={Logo} alt="Logo" className="logo" />
      <Link to="/sign-in">
      <button className="loginButtonTop">
        Log In
      </button>
        </Link>
      
    </div>

    <div
      className="carousel-track"
      style={{
        transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
        width: `${slides.length * 100}%`,
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className="carousel-slide"
          style={{ width: `${100 / slides.length}%` }}
        >
          <img
            src={slide.image}
            alt={`slide-${index}`}
            className="slide-image"
          />
          <div className="carousel-info">
            <h2 className="carousel-title">{slide.title}</h2>
            <p className="carousel-description">{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="carousel-dots">
      {slides.map((_, index) => (
        <span
          key={index}
          className={`dot ${index === currentIndex ? 'active' : ''}`}
          onClick={() => setCurrentIndex(index)}
        ></span>
      ))}
    </div>
    <div className="carousel-buttons">
      <button className="loginButton" onClick={handleLogin}>
        Get Started
      </button>
    </div>
  </div>
  );
}

export default Carousel;
