import React, { useState } from "react";
import { Input, Card, Button } from "@nextui-org/react";
import { useCart } from '../../context/cartContext'; 
import { processPayment } from '../../Routes/routes'; 
import axios from 'axios'; 
import { useAuth } from '../../context/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom';


export default function Payment() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart(); // Obtén los elementos del carrito y el método para limpiar el carrito
  const { user } = useAuth(); // Obtén el usuario autenticado del contexto
  const [formData, setFormData] = useState({
    holderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
    userId: user ? user.id : "" // Agrega la ID del usuario aquí
    
  });
  const [errors, setErrors] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(null); // Para manejar el estado del pago

  const validateForm = () => {
    const newErrors = {};
    
    // Holder Name validation (Name and Surname)
    if (!/^[a-zA-Z]+$/.test(formData.holderName)) {
      newErrors.holderName = "Please enter a valid name.";
    }

    // Card Number validation (numeric and length 16)
    if (!/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    // Expiry Month validation (1-12)
    if (formData.expiryMonth < 1 || formData.expiryMonth > 12) {
      newErrors.expiryMonth = "Expiry month must be between 1 and 12.";
    }

    // Expiry Year validation (valid year)
    const currentYear = new Date().getFullYear();
    if (formData.expiryYear < currentYear) {
      newErrors.expiryYear = `Expiry year must be at least ${currentYear}.`;
    }

    // Security Code validation (3 digits)
    if (!/^\d{3}$/.test(formData.securityCode)) {
      newErrors.securityCode = "Security code must be 3 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const subTotal = cartItems.reduce(
    (total, item) => total + item.unit_price,
    0
  );

  const totalBillings = () => {
    return subTotal > 0 ? subTotal + (subTotal * 0.21) : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const paymentData = {
          holder_name: formData.holderName,
          creditcard_number: parseInt(formData.cardNumber), 
          expiry_month: parseInt(formData.expiryMonth),
          expiry_year: parseInt(formData.expiryYear),
          total_price: totalBillings(),
          security_code: parseInt(formData.securityCode),
          user_id: formData.userId,
          cartItems: cartItems // Usa la ID del usuario del campo oculto
        };
        const response = await axios.post(processPayment(formData.userId), paymentData);

        console.log(response.data);
        setPaymentStatus('success');
        clearCart(); // Limpia el carrito después del pago exitoso
        navigate('/transactions'); // Redirigir a transaccion

      } catch (error) {
        console.error("Error processing payment:", error);
        setPaymentStatus('error');
      }
    }
  };

  return (
    <Card shadow>
  <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-20 p-4">
    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      <div className="w-full">
        <Input
          label="Holder First Name"
          placeholder="Holder Name"
          labelPlacement="outside"
          name="holderName"
          value={formData.holderName}
          onChange={handleInputChange}
          status={errors.holderName ? "error" : ""}
          helperText={errors.holderName}
        />
      </div>
      <div className="w-full">
        <Input
          label="Card Number"
          placeholder="Card Number"
          labelPlacement="outside"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          status={errors.cardNumber ? "error" : ""}
          helperText={errors.cardNumber}
          
        />
      </div>
    </div>
    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      <div className="w-full">
        <Input
          type="number"
          label="Expiry Month"
          placeholder="MM"
          labelPlacement="outside"
          name="expiryMonth"
          value={formData.expiryMonth}
          onChange={handleInputChange}
          status={errors.expiryMonth ? "error" : ""}
          helperText={errors.expiryMonth}
        />
      </div>
      <div className="w-full">
        <Input
          type="number"
          label="Expiry Year"
          placeholder="YYYY"
          labelPlacement="outside"
          name="expiryYear"
          value={formData.expiryYear}
          onChange={handleInputChange}
          status={errors.expiryYear ? "error" : ""}
          helperText={errors.expiryYear}
        />
      </div>
      <div className="w-full">
        <Input
          label="Security Code"
          placeholder="CVC"
          labelPlacement="outside"
          name="securityCode"
          value={formData.securityCode}
          onChange={handleInputChange}
          status={errors.securityCode ? "error" : ""}
          helperText={errors.securityCode}
        />
      </div>
      
    </div>
    <Button
      type="submit"
      className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
    >
      Check out (${totalBillings().toFixed(2)})
    </Button>
    {paymentStatus === 'success' && <p className="text-green-500 mt-4">Payment Successful!</p>}
    {paymentStatus === 'error' && <p className="text-red-500 mt-4">Payment Failed. Please try again.</p>}
  </form>
</Card>

  );
}
