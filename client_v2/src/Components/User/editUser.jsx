import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Input, Button } from '@nextui-org/react';
import { AuthContext } from '../../context/AuthContext'; 
import 'tailwindcss/tailwind.css';

const UpdateUserForm = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        name: '',
        apellidos: '',
        email: '',
        nickname: '',
        telefono: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost/Proyecto_M12/server/public/index.php/api/editUser/${user.id}`, userData); 
            setMessage('User updated correctly');
        } catch (error) {
            setMessage('');
            setError('Error updating the user');
            console.error('Error:', error);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm('¿Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost/Proyecto_M12/server/public/index.php/api/user/${user.id}`); 
                alert('¡Your account has been successfully deleted!');
            } catch (error) {
                setError('Error deleting the account');
                console.error('Error:', error);
            }
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost/Proyecto_M12/server/public/index.php/api/user/${user.id}`); 
                setUserData(response.data);
            } catch (error) {
                setError('Error getting user data');
                console.error('Error:', error);
            }
        };
        fetchUserData();
    }, [user.id]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="mt-20 container">
                <h1>Update User</h1>
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <Input type="text" id="name" name="name" value={userData.name} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="apellidos" className="form-label">Last Name:</label>
                        <Input type="text" id="apellidos" name="apellidos" value={userData.apellidos} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <Input type="email" id="email" name="email" value={userData.email} readOnly className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nickname" className="form-label">Nickname:</label>
                        <Input type="text" id="nickname" name="nickname" value={userData.nickname} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="telefono" className="form-label">Number phone:</label>
                        <Input type="text" id="telefono" name="telefono" value={userData.telefono} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="btn btn-primary me-2">Update User</Button>
                        <Button type="button" className="btn btn-danger" style={{ backgroundColor: 'red' }} onClick={handleDeleteAccount}>
                            Delete Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserForm;
