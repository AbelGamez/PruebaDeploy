import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button } from '@nextui-org/react';
import { forgotPassword } from '../../Routes/routes';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(forgotPassword(), { email });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setMessage('');
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-2xl mb-4">Forgot Password</h1>
      {message && <p className="text-green-500 mb-2">{message}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleInputChange}
          required
          className="mb-4"
        />
        <div className="flex justify-center">
          <Button type="submit" className="mb-4">
            Send Password Reset Link
          </Button>
        </div>

      </form>
    </div>
  );
};

export default ForgotPasswordForm;
