import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('https://uru3ltbv7vn42n4duubofssy4y0pdslh.lambda-url.us-east-1.on.aws/');
        setPayments(response.data.payments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payment data:', error);
        setError('An error occurred while fetching payment data. Please try again later.');
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const fetchPaymentStatus = async (paymentId) => {
    try {
      const response = await axios.get(`https://j2m43iwenuftlg6oksvgc5lsba0wsrcv.lambda-url.us-east-1.on.aws/${paymentId}`);
      return response.data.status;
    } catch (error) {
      console.error(`Error fetching status for payment ID ${paymentId}:`, error);
      return 'Error'; 
    }
  };

  const getStatusForPayment = async (paymentId) => {
    const status = await fetchPaymentStatus(paymentId);
    setPayments(prevPayments => prevPayments.map(payment => {
      if (payment.payment_id === paymentId) {
        return { ...payment, status };
      }
      return payment;
    }));
  };

  useEffect(() => {
    payments.forEach(payment => {
      getStatusForPayment(payment.payment_id);
    });
  }, [payments]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className='payment-heading'>Payments</h2>
      {payments.length > 0 ? (
        <ul>
          {payments.map((payment, index) => (
            <li key={index} className='paymentsList'>
              <p>
                <strong>Payment ID:</strong> {payment.payment_id}
              </p>
              <p>
                <strong>Description:</strong> {payment.description}
              </p>
              <p>
                <strong>Status:</strong> {payment.status || 'Loading...'}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No payments available.</p>
      )}
    </div>
  );
};

export default Payments;
