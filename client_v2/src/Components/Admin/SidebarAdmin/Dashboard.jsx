import React, { useState, useContext } from 'react';
import Sidebar from './Sidebar';
import Analytics from './Analytics';
import UpdateUserForm from '../../User/editUser'; 
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import ListAllUsers from '../../User/ListAllUsers';
import DisplayProductsAdmin from '../displayProductsAdmin'
import AddProdcuts from '../../Products/addProducts'
function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('Home');
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Llama a la función de logout del contexto de autenticación
    navigate('/pistols'); // Redirige a la página de inicio de sesión después del logout
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'Home':
        return <HomeContent />;
      case 'Settings':
        return <SettingsContent />;
      case 'Users':
        return <Users />;
      case 'Product':
        return <DisplayProductsAdmin/>
        case 'AddProduct':
          return <AddProdcuts/>
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="flex flex-col w-full pb-16"> 

        <div className="flex-1 text-2xl font-bold">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

const HomeContent = () => <Analytics />;
const SettingsContent = () => (
  <div className="flex justify-center items-center h-screen">
    <UpdateUserForm />
  </div>
);
const Users = () => <ListAllUsers/>;

export default Dashboard;
