import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Carousel from './Components/Carousel/Carousel';
import BottomNav from './Components/BottomNav'; 
// import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import Payments from './pages/Payments';
import SignIn from "./pages/SignIn";
import CreateUser from './pages/CreateUser';
import GetUser from './pages/GetUser';
import PayInvoice from "./pages/PayInvoice";
import CreateInvoice from './Components/CreateInvoice/CreateInvoice';
import CreditScore from './pages/CreditScore';
import TransactionList from './pages/TransactionList';
import slider1 from "./images/slider1.png";
import slider2 from "./images/slider2.png";
import slider3 from "./images/slider3.png";
import Setting from './pages/Setting';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [web3auth, setWeb3auth] = useState(null);
  const [userType, setUserType] = useState('user');

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setWeb3auth(null);
    setUserType('user');
  };

  const slides = [
    {
      title: "Simplifying your Invoicing Process Today!",
      description: "Effortlessly create professional invoices with our easy-to-use app!",
      image: slider1,
    },
    {
      title: "Get started and Streamline your Invoicing Process",
      description: "Effortlessly Make Requests, Track Progress, and Stay Updated",
      image: slider2,
    },
    {
      title: "Sign up now and start Creating Invoices in Minutes",
      description: "Effortlessly create professional invoices with our easy-to-use app!",
      image: slider3,
    },
  ];

  return (
    <Router>
      {isLoggedIn && <BottomNav userType={userType} />}

      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/credit-score" />
            ) : (
              <>
                <Carousel
                  slides={slides}
                  onLogin={handleSignIn}
                  setWeb3auth={setWeb3auth}
                />
                {isLoggedIn && <BottomNav userType={userType} />}
              </>
            )
          }
        />

        <Route
          path="/credit-score"
          element={
            isLoggedIn ? (
              <>
                <CreditScore onSignOut={handleSignOut} />
                {isLoggedIn && <BottomNav userType={userType} />}
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />


        <Route path="/invoices" element={<Invoices />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/credit-score" element={<CreditScore onSignOut={handleSignOut}/>} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/pay-invoice" element={<PayInvoice />} />
        <Route path="/create-invoice" element={<CreateInvoice />} />
        <Route path="/get-user" element={<GetUser />} />
        {/* <Dashboard onSignOut={handleSignOut} web3auth={web3auth} /> */}
        <Route path="/settings" element={<Setting onSignOut={handleSignOut} web3auth={web3auth}/>} />
        <Route
          path="/transaction-list"
          element={<TransactionList setUserType={setUserType} />}
        />
        <Route path="/sign-in" element={<SignIn onSignIn={handleSignIn} setUserType={setUserType}/>} />
      </Routes>
    </Router>
  );
}

export default App;