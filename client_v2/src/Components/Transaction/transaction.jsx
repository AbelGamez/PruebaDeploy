import React, { useEffect, useState } from 'react';
import { Card } from '@nextui-org/react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { showPaymentsByUser } from '../../Routes/routes';
import { useNavigate } from 'react-router-dom';

import './styles.css';

export default function Transaction() {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(showPaymentsByUser(user.id));
        setPayments(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPayments();
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching payments: {error.message}</p>;
  }

  return (
    <div className="transactions-container mt-20">
      {payments.map((payment) => (
        <Card key={payment.id} className="payment-card">
          <p className="purchase-date">Purchase Date: {new Date(payment.created_at).toLocaleDateString()}</p>
          <h1>Your order #{payment.id} has been accepted.</h1>
          <p className="total-price">Total Price: ${payment.total_price.toFixed(2)}</p>
          <button onClick={() => navigate(`/listProductsPayment/${payment.id}`)} className="view-products-btn">View Products</button>

        </Card>
      ))}
    </div>
  );
}
