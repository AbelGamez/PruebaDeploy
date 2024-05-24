import React, { useState, useContext } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import {
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
  HiOutlineLogout
} from 'react-icons/hi'
import { FaHouse } from "react-icons/fa6";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { Navbar, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { AcmeLogo } from '../../General/AcmeLogo';


import HomeIcon from '../../../Assets/homeIcon';
import Settingicon from '../../../Assets/settingsIcon';
import Editdatausericon from '../../../Assets/editdatausericon' 
import Adminicon from '../../../Assets/adminIcon' 
import ManagementIcon from '../../../Assets/managementIcon'
import LogoutIcon from '../../../Assets/logoutIcon';

const Sidebar = ({ setActiveComponent }) => {

  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/pistols');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (

    <>
      <div className={`h-screen flex bg-gray-200 transition-all duration-300`}>
        {/* Container */}
        <aside className={`flex flex-col items-center bg-white text-gray-700 shadow h-full w-20`}>
          {/* Logo Section */}
          <div className="h-16 flex items-center w-full">
            <a className="h-6 mx-auto">
              <AcmeLogo />
            </a>
          </div>
          <ul className="w-full">
            {/* Toggle Button */}

            {/* Items Section */}

            <li
              className="hover:bg-gray-100"
              onClick={() => setActiveComponent('Home')}
            >
              <div className='h-16 px-6 flex justify-center items-center w-full focus:text-orange-500'>
                <Settingicon className='' /> 
              </div>
            </li>


            <li
              className="hover:bg-gray-100"
              onClick={() => setActiveComponent('Settings')}
            >
              <div className='h-16 px-6 flex justify-center items-center w-full focus:text-orange-500'>
                <Editdatausericon className='' /> 
              </div>
            </li>

            <li
              className="hover:bg-gray-100"
              onClick={() => setActiveComponent('Users')}
            >
              <div className='h-16 px-6 flex justify-center items-center w-full focus:text-orange-500'>
                <Adminicon className='' /> 
              </div>
            </li>
            <li
              className="hover:bg-gray-100"
              onClick={() => setActiveComponent('Product')}
            >
              <div className='h-16 px-6 flex justify-center items-center w-full focus:text-orange-500'>
                <ManagementIcon className='' /> 
              </div>
            </li>
            <li
              className="hover:bg-gray-100"
              onClick={() => setActiveComponent('AddProduct')}
            >
              <div className='h-16 px-6 flex justify-center items-center w-full focus:text-orange-500'>
                {/* <HomeIcon className='' />  */}
              </div>
            </li>
          </ul>

          <div className="mt-auto h-16 flex items-center w-full">
            {/* Action Section */}
            <div className='flex items-center relative w-full pl-6 pb-6'>
              <div className='flex items-center'>
                <Dropdown className='bg-black' placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="primary"
                      size="sm"
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      {user && <p className="font-semibold">{user.email}</p>}
                    </DropdownItem>
                    <DropdownItem key="my_account">
                      <Link to="/edit">My Account</Link>
                    </DropdownItem>
                    {user.admin === 1 && (
                      <DropdownItem key="settings">
                        <Link to="/settings">Settings</Link>
                      </DropdownItem>
                    )}
                    <DropdownItem key="transaction_History">Transaction History</DropdownItem>
                    <DropdownItem key="configurations">Configurations</DropdownItem>

                    <DropdownItem key="logout" color="danger" >
                      <Link onClick={handleLogout} className='flex items-center'> <HiOutlineLogout className="mr-2" /> Log Out</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
        
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
