import React, { useState, useContext } from 'react';
import { Input, Button } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import { LogInUser } from '../../Routes/routes';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { EyeFilledIcon } from "./EyeIcons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeIcons/EyeSlashFIlledIcon";
import { MailIcon} from "../Payment/MailIcon"
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para controlar la visibilidad de la contraseña


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realizar validaciones
    const validationErrors = {};
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      validationErrors.email = 'The email must be in a valid format.';
    }
    if (formData.password.length < 6) {
      validationErrors.password = 'The password must be at least 6 characters long.';
    }

    setErrors(validationErrors); // Actualizar estado de errores

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(LogInUser(), formData);
        login(response.data.user); // Almacenar la información del usuario en el contexto
        navigate('/'); // Redirigir a la página principal
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card-body">
        <h1 className="card-title text-center mx-auto" style={{ color: 'black' }}>Log In Here</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label "style={{ color: 'black' }}>Email:</label>
            <Input 
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
    
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label"style={{ color: 'black' }}>Password:</label>
            <div className="relative">
              <Input 
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button className="absolute right-2 top-2 focus:outline-none" type="button" onClick={togglePasswordVisibility}>
                {isPasswordVisible ? (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />

                )}
              </button>
            </div>
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>
          <div className="flex justify-center">
            <Button type="submit">Log In</Button>
          </div>
        </form>
        <p className="mt-3"style={{ color: 'black' }}>Don't have an account yet? <Link to="/register" className="border-b border-black hover:border-blue-500">Register here</Link></p>
        <p className="mt-3"style={{ color: 'black' }}>Have you forgotten your password? <Link to="/forgot" className="border-b border-black hover:border-blue-500">Recover password</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;
