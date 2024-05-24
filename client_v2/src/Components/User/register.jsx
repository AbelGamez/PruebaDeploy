import { useState } from 'react';
import axios from 'axios';
import { Input, Button } from '@nextui-org/react';
import { UserRegister, UserExistsData } from '../../Routes/routes';
import { Link, useNavigate } from 'react-router-dom';
import { EyeFilledIcon } from "./EyeIcons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeIcons/EyeSlashFIlledIcon";
import { MailIcon} from "../Payment/MailIcon"

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        apellidos: '',
        email: '',
        password: '',
        nickname: '',
        telefono: ''
    });

    const [errors, setErrors] = useState({});
    const [existingDataErrors, setExistingDataErrors] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para controlar la visibilidad de la contraseña

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Realizar validaciones
        const validationErrors = {};
        if (!formData.name.match(/^[a-zA-Z\s]{1,20}$/)) {
            validationErrors.name = 'The name can only contain letters and have a maximum of 20 characters.';
        }
        if (!formData.apellidos.match(/^[a-zA-Z\s]{1,20}$/)) {
            validationErrors.apellidos = 'Last name can only contain letters and have a maximum of 20 characters.';
        }
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
            validationErrors.email = 'The email must be in a valid format.';
        }
        if (formData.password.length < 8) {
            validationErrors.password = 'The password must be at least 8 characters long.';
        }
        if (formData.nickname.length > 20 && formData.nickname.length < 0) {
            validationErrors.nickname = 'The nickname must be no more than 20 characters long.';
        }
        if (!formData.telefono.match(/^\d{9}$/)) {
            validationErrors.telefono = 'The phone must contain only 9 numeric digits.';
        }

        setErrors(validationErrors); // Actualizar estado de errores

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post(UserRegister(), formData); // Utilizar la ruta para registrar usuario
                console.log(response.data);
                navigate('/login'); 

            } catch (error) {
                console.error('Error:', error.response.data);
            }
        }
    };

    const handleExistingDataCheck = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(UserExistsData(), {
                email: formData.email,
                nickname: formData.nickname,
                telefono: formData.telefono
            });

            const existingDataValidationErrors = {};

            if (response.data.emailExists) {
                existingDataValidationErrors.email = 'The email is already registered.';
            }
            if (response.data.nicknameExists) {
                existingDataValidationErrors.nickname = 'The nickname is already in use.';
            }
            if (response.data.telefonoExists) {
                existingDataValidationErrors.telefono = 'The phone number is already in use.';
            }

            setExistingDataErrors(existingDataValidationErrors);

            if (Object.keys(existingDataValidationErrors).length === 0) {
                handleSubmit(e); // Si no hay errores de datos existentes, continuar con el envío del formulario
            }
        } catch (error) {
            //   console.error('Error:', error.response.data);
        }
    };
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="mt-20 card">
                <div className="card-body">
                    <h1 className="card-title text-center mx-auto"style={{ color: 'black' }}>Sign Up Now</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"style={{ color: 'black' }}>Name:</label>
                            <Input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellidos" className="form-label"style={{ color: 'black' }}>Last name:</label>
                            <Input type="text" id="apellidos" name="apellidos" placeholder="Last name" value={formData.apellidos} onChange={handleChange} required />
                            {errors.apellidos && <div className="text-danger">{errors.apellidos}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"style={{ color: 'black' }}>Email:</label>
                            <Input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} onBlur={handleExistingDataCheck} required />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                            {existingDataErrors.email && <div className="text-danger">{existingDataErrors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"style={{ color: 'black' }}>Password:</label>
                            <div className="relative">
                                <Input type={isPasswordVisible ? "text" : "password"} id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
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
                        <div className="mb-3">
                            <label htmlFor="nickname" className="form-label"style={{ color: 'black' }}>Nickname:</label>
                            <Input type="text" id="nickname" name="nickname" placeholder="Nickname" value={formData.nickname} onChange={handleChange} onBlur={handleExistingDataCheck} required />
                            {errors.nickname && <div className="text-danger">{errors.nickname}</div>}
                            {existingDataErrors.nickname && <div className="text-danger">{existingDataErrors.nickname}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label"style={{ color: 'black' }}>Phone number:</label>
                            <Input type="text" id="telefono" name="telefono" placeholder="Phone number" value={formData.telefono} onChange={handleChange} onBlur={handleExistingDataCheck} required />
                            {errors.telefono && <div className="text-danger">{errors.telefono}</div>}
                            {existingDataErrors.telefono && <div className="text-danger">{existingDataErrors.telefono}</div>}
                        </div>
                        <div className="flex justify-center">
                            <Button type="submit">Register</Button>
                        </div>
                    </form>
                    <p className="mt-3"style={{ color: 'black' }}>Already have an account? <Link to="/logIn " className="border-b border-black hover:border-blue-500">Log In here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
