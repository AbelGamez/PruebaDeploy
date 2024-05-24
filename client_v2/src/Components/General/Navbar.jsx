import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";

import { AcmeLogo } from "./AcmeLogo";
import ShoppingCartIcon from '../../Assets/shoppingCartIcon';
import SettingsIcon from '../../Assets/settingsIcon';
import MyAccountIcon from '../../Assets/myAccountIcon';
import TransactionsHistoryIcon from '../../Assets/transactionsHistoryIcon';
import LogoutIcon from '../../Assets/logoutIcon';

// import { langContext } from "../../context/langContext";
// import { IntlProvider, FormattedMessage } from "react-intl";
// import SelectInput from '../General/SelectInput'

import Container from './Container';
import IdiomaSelect from './IdiomaSelect';

import { AuthContext } from "../../context/AuthContext";
import { useCart } from '../../context/cartContext';

export default function NavigationMenu({ onCategorySelect }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { cartItems } = useCart(); // Obtén el estado del carrito desde el contexto

    const menuItems = [
        "Pistols",
        "Rifles",
        "Heavy",
        "SMGs",
        "Knives",
        "Gloves",
    ];

    const handleCategorySelect = (category) => {
        onCategorySelect(category);
    };
    const handleLogout = () => {
        logout(); // Llama a la función de logout del contexto de autenticación
        navigate('/pistols'); // Redirige a la página de inicio de sesión después del logout
    };

    return (
        <Navbar maxWidth='full' onMenuOpenChange={setIsMenuOpen} className="bg-black bg-opacity-80 fixed w-full">
            <NavbarContent>
                <NavbarMenuToggle aria-label="Toggle menu" className="md:hidden" />
                <NavbarBrand>
                    <Link to='/' className="flex items-center">
                        <AcmeLogo />
                        <p className="font-bold text-inherit">ACME</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden md:flex gap-10" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarItem key={`${item}-${index}`}>
                        <Link to={`/${item}`} className="text-white font-semibold" onClick={() => handleCategorySelect(item)}>{item}</Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden sm:flex">
                    {!user && (
                        <Button
                            as={Link}
                            className="font-semibold"
                            color="primary"
                            to="/login"
                            variant="light"
                        >
                            Login
                        </Button>
                    )}
                </NavbarItem>
                <NavbarItem>
                    {!user && (
                        <Button
                            as={Link}
                            className="font-semibold"
                            color="primary"
                            to="/register"
                            variant="light"
                        >
                            Sign up
                        </Button>
                    )}
                </NavbarItem>
                {/* Botón del carrito con el número de elementos */}
                <NavbarItem>
                    <Link to="/shopping-cart" className="flex items-center">
                        <Container className='relative'>
                            <ShoppingCartIcon />
                            {/* Muestra el número de elementos en el carrito */}
                            {cartItems.length > 0 &&
                                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full p-1 text-xs">
                                    {cartItems.length}
                                </span>
                            }
                        </Container>
                    </Link>
                </NavbarItem>
                {user && (
                    <Dropdown className='bg-black' placement="bottom-end" showArrow classNames={{ content: "p-1 border-small border-divider" }}>
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
                                <Link to="/edit" className="flex items-center">
                                    <MyAccountIcon className="mr-2" />My Account
                                </Link>
                            </DropdownItem>
                            {user.admin === 1 && (
                                <DropdownItem key="dashboard">
                                    <Link to="/Dashboard" className="flex items-center">
                                        <SettingsIcon className="mr-2" />Dashboard
                                    </Link>
                                </DropdownItem>
                            )}
                            <DropdownItem key="transaction_History">
                                <Link to="/transactions" className="flex items-center">
                                    <TransactionsHistoryIcon className="mr-2" />Transaction history
                                </Link>
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={handleLogout} >
                                <Container className="flex items-center">
                                    <LogoutIcon className='ml-1 mr-1.5 ' />
                                    Log Out
                                </Container>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )}
            </NavbarContent>
            <NavbarMenu className="bg-black bg-opacity-10">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            to={`/${item.toLowerCase()}`}
                            color="foreground"
                            className="text-white font-semibold w-full"
                            size="lg"
                            onClick={() => handleCategorySelect(item)} >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
            <IdiomaSelect />
        </Navbar>
    );
}