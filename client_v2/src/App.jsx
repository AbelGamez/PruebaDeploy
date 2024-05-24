import './App.css';
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import NavigationMenu from './Components/General/Navbar';
import Footer from './Components/General/footer/Footer';

import LogIn from './Components/User/logIn';
import Register from './Components/User/register';
import ForgotPassword from './Components/User/ForgotPassword';
import ResetPassword from './Components/User/ResetPassword';
import ShoppingCartPage from './Components/ShoppingCart/SoppingCartPage';
import PaymentCheckout from './Components/Payment/payment';

import Dashboard from './Components/Admin/SidebarAdmin/Dashboard';
import Settings from './Components/Admin/settings';
import DisplayProductsAdmin from './Components/Admin/displayProductsAdmin';
import AddProducts from './Components/Products/addProducts';
import EditProduct from './Components/Admin/editProduct';
import ListAllUsers from './Components/User/ListAllUsers';
import EditUser from './Components/User/editUser';

import DisplayProductsClient from './Components/Products/displayProductsClient';
import ProductDetails from './Components/Products/productDetail';

import MensajesIngles from "./lang/en-US.json";
import MensajesES from "./lang/es-ES.json";
import Transactions from './Components/Transaction/transaction';
import ListProductsPayment from './Components/Transaction/listProductsPayment';

import { LangProvider } from './context/langContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/cartContext';
import { PrivateRoute, PrivateRouteUser } from './Components/User/PrivateRoute';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const lang = localStorage.getItem('lang') || 'en-US';
  const mensajes = lang === 'es-ES' ? MensajesES : MensajesIngles;
  const locale = lang;
  return (
    <AuthProvider>
      <CartProvider>
        <LangProvider>
          <IntlProvider locale={locale} messages={mensajes}>

            {/* Oculta un componente si esta en /Dashboard  */}
            {location.pathname !== '/Dashboard' && (
              <NavigationMenu onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
            )}

            <Routes>
              {/* Rutas para la gestión de usuarios */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<LogIn />} />

              <Route path="/edit" element={<PrivateRouteUser element={EditUser} />} />
              <Route path="/forgot" element={<PrivateRouteUser element={ForgotPassword} />} />
              <Route path="/reset/:token" element={<PrivateRouteUser element={ResetPassword} />} />
              <Route path="/transactions" element={<PrivateRouteUser element={Transactions} />} />
              <Route path="/listProductsPayment/:paymentId" element={<PrivateRouteUser element={ListProductsPayment}/>} />

              {/* Rutas para la gestión de productos */}
              <Route path="/pistols" element={<DisplayProductsClient category="Pistols" />} />
              <Route path="/rifles" element={<DisplayProductsClient category="Rifles" />} />
              <Route path="/heavy" element={<DisplayProductsClient category="Heavy" />} />
              <Route path="/smgs" element={<DisplayProductsClient category="SMGs" />} />
              <Route path="/knives" element={<DisplayProductsClient category="Knives" />} />
              <Route path="/gloves" element={<DisplayProductsClient category="Gloves" />} />
              <Route path="/product/:id" element={<ProductDetails />} />

              {/* Rutas admin */}
              <Route path="/settings" element={<Settings />} />

              {/*<Route path="/settings/product-management" element={<DisplayProductsAdmin/>} />
              <Route path="/settings/product-management/add" element={<AddProducts />} />
              <Route path='/settings/product-management/edit/:id' element={<EditProduct />} />
              <Route path="/settings/user-management" element={<ListAllUsers />} />
              <Route path="/Dashboard" element={<Dashboard />} /> */}

              <Route path="/settings/product-management" element={<PrivateRoute element={DisplayProductsAdmin} />} />
              <Route path="/settings/product-management/add" element={<PrivateRoute element={AddProducts} />} />
              <Route path='/settings/product-management/edit/:id' element={<PrivateRoute element={EditProduct} />} />
              <Route path="/settings/user-management" element={<PrivateRoute element={ListAllUsers} />} />
              <Route path="/Dashboard" element={<PrivateRoute element={Dashboard} />} />

              {/* Rutas Shopping */}
              {/* <Route path="/shopping-cart" element={<ShoppingCartPage />} />
              <Route path="/paymentCheckout" element={<PaymentCheckout />} /> */}
              <Route path="/shopping-cart" element={<PrivateRouteUser element={ShoppingCartPage} />} />
              <Route path="/paymentCheckout" element={<PrivateRouteUser element={PaymentCheckout} />} />

            </Routes>
            
            {/* Oculta un componente si esta en /Dashboard  */}
            {location.pathname !== '/Dashboard' && (
              <Footer />
            )}
          </IntlProvider>
        </LangProvider>
      </CartProvider>
    </AuthProvider>

  );

}

export default App;
