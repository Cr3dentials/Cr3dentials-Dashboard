import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Carousel from './Components/Carousel/Carousel';
import BottomNav from './Components/BottomNav'; 
import Dashboard from './pages/Dashboard';
import CreateAccount from './pages/CreateAccount';
import Invoices from './pages/Invoices';
import Payments from './pages/Payments';
import SignIn from "./pages/SignIn";
import slider1 from "./images/slider1.png";
import slider2 from "./images/slider2.png";
import slider3 from "./images/slider3.png";
import CreateUser from './pages/CreateUser';
import GetUser from './pages/GetUser';
import PayInvoice from "./pages/PayInvoice"
import CreateInvoice from './Components/CreateInvoice/CreateInvoice';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
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
      {isLoggedIn && <BottomNav />}
      <Routes>
        <Route
          path="/"
          element={
            // <Carousel
            //   slides={slides}
            //   isLoggedIn={isLoggedIn}
            // />
            <Dashboard />
          }
        />
        {/* <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard onSignOut={handleSignOut} />
            ) : (
              <Navigate to="/" />
            )
          }
        /> */}
         {/* <Route path="/create-account" element={<CreateAccount onSignIn={handleSignIn}/>} /> */}
         {/* <Route path="/sign-in" element={<SignIn onSignIn={handleSignIn}/>} /> */}
         <Route path="/invoices" element={<Invoices/>} />
         <Route path="/payments" element={<Payments/>} />
         <Route path="/create-user" element={<CreateUser/>} />
         <Route path="/pay-invoice" element={<PayInvoice/>} />
         <Route path="/create-invoice" element={<CreateInvoice/>} />
         <Route path="/get-user" element={<GetUser/>} />
      </Routes>
    </Router>
  );
}

export default App;
