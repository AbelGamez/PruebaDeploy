import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { resetPassword } from  '../../Routes/routes'; 
import { Card, Input, Button } from '@nextui-org/react';


const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Aquí podrías realizar alguna lógica adicional si lo necesitas
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post(`${resetPassword()}/${token}`, { password });
      setSuccess(response.data.message);
      setError('');
    } catch (error) {
      setError(error.response.data.error);
      setSuccess('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <h2 className="text-center">Reset Password</h2>
        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password:</label>
            <Input type="password" id="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
            <Input type="password" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div className="flex justify-center">
            <Button type="submit">Reset Password</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
