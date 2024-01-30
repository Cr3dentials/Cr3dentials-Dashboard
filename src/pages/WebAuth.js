// import React, { useEffect, useState } from 'react';
// import { Web3Auth } from '@web3auth/modal';
// import { CHAIN_NAMESPACES } from '@web3auth/base';
// import RPC from './web3RPC';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// // import './Carousel.css';
// import './index.css';

// function WebAuth({slides}) {
//   const [web3auth, setWeb3auth] = useState(null);
//   const [userData, setUserData] = useState({});
//   const [address, setAddress] = useState('');
//   const [provider, setProvider] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const [formData, setFormData] = useState({
//     username: userData.name,
//     email: userData.email,
//     walletAddress: address,
//     password: 'pass123',
//     phone_number: '9194012233',
//     role: '2',
//     created_date: getCurrentDate(),
//     authentication_token: 'authtokendemo',
//   });

//   function getCurrentDate() {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }

//   const resetForm = () => {
//     setFormData({
//       username: '',
//       email: '',
//       password: '',
//       phone_number: '',
//       role: '',
//       walletAddress: '',
//       created_date: getCurrentDate(),
//       authentication_token: '',
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       setFormData((formData) => ({
//         ...formData,
//         username: userData.name,
//         email: userData.email,
//         walletAddress: address,
//       }));

//       const response = await axios.post(
//         'https://t5epo0n12j.execute-api.us-east-1.amazonaws.com/Stage/user',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       alert('User has been successfully created!');
//       resetForm();
//       console.log('Response:', response.data);
//     } catch (error) {
//       console.error('Error submitting form data:', error);
//       alert('Error creating user. Please try again.');
//     }
//   };

//   const handleModalClosure = () => {
//     console.log('User closed the modal');
//     setProvider(null);
//     setAddress('');
//     setUserData({});
//   };

//   useEffect(() => {
    
//     const init = async () => {
//       try {
//         const web3authInstance = new Web3Auth({
//           clientId: 'BMF2iwDfTyCtnq4qdLkvfmFe12v5sJLJOTPdeCXjQBkggAdPArkRRIhXPyqcLJUDQDejy6MPxU1H9OSVPRqM0eY',
//           chainConfig: {
//             chainNamespace: CHAIN_NAMESPACES.EIP155,
//           },
//         });
  
//         setWeb3auth(web3authInstance);
//         await web3authInstance.initModal();
  
//         if (await isConnected()) {
//           setProvider(web3authInstance.provider);
//           getUserInfo();
//           getAccounts();
//         }
  
//         if (web3authInstance) {
//           web3authInstance.on('close', handleModalClosure);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     init();
//     return () => {
//       if (web3auth) {
//         web3auth.off('close', handleModalClosure);
//       }
//     };
//   }, []);
  
//   const isConnected = async () => {
//     if (!web3auth) {
//       console.log('web3auth not initialized yet');
//       return false;
//     }
//     return web3auth.status === 'connected';
//   };
  
//   const handleLogin = async () => {
//     try {
//       if (!web3auth) {
//         console.log('web3auth not initialized yet');
//         return;
//       }
//       const web3authProvider = await web3auth.connect();
//       setProvider(web3authProvider.provider);
  
//       await getUserInfo();
//       await getAccounts();
  
//       if (await isConnected()) {
//         handleSubmit(); 
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     }, 2000);

//     return () => clearInterval(intervalId);
//   }, [currentIndex, slides.length]);

//   // const handleLogout = async () => {
//   //   try {
//   //     if (!web3auth) {
//   //       console.log('web3auth not initialized yet');
//   //       return;
//   //     }

//   //     const web3authProvider = await web3auth.logout();
//   //     setProvider(web3authProvider);
//   //     setAddress('');
//   //     setUserData({});
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   const getUserInfo = async () => {
//     if (!web3auth) {
//       console.log('web3auth not initialized yet');
//       return;
//     }
//     const user = await web3auth.getUserInfo();
//     setUserData(user);
    // setFormData((formData) => ({
    //   ...formData,
    //   username: userData.name,
    //   email: userData.email,
    //   walletAddress: address,
    // }));
//   };


//   const getAccounts = async () => {
//     if (!web3auth) {
//       console.log('provider not initialized yet');
//       return;
//     }
//     const rpc = new RPC(web3auth.provider);
//     const address = await rpc.getAccounts();
//     setAddress(address);
//     console.log(address);
//   };

//   //     <Button onClick={handleLogout} className="button">
//   //       Logout
//   //     </Button>
  

//   return (
//     <div className="carousel-container">
//     <div
//       className="carousel-track"
//       style={{
//         transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
//         width: `${slides.length * 100}%`,
//       }}
//     >
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className="carousel-slide"
//           style={{ width: `${100 / slides.length}%` }}
//         >
//           <img src={slide.image} alt={`slide-${index}`} className="slide-image" />
//           <div className="carousel-info">
//             <h2 className="carousel-title">{slide.title}</h2>
//             <p className="carousel-description">{slide.description}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//     <div className="carousel-dots">
//       {slides.map((_, index) => (
//         <span
//           key={index}
//           className={`dot ${index === currentIndex ? 'active' : ''}`}
//           onClick={() => setCurrentIndex(index)}
//         ></span>
//       ))}
//     </div>
//     <div className="carousel-buttons">
//         <Button className="loginButton" onClick={handleLogin} variant="contained">
//           Connect Wallet
//         </Button>
//     </div>
//   </div>
//   );
// }

// export default WebAuth;
