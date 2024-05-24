import React, { useState } from 'react';
import { useCart } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom'; 

const Billing = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate(); 
    const [isDisabled, setIsDisabled] = useState(false);

    const subTotal = cartItems.reduce(
        (total, item) => total + item.unit_price,
        0    );

    const totalBillings = () => {
        if (subTotal > 0) {
            return subTotal+(subTotal*0.21) ;
        } else {
            return 0;
        }
    };
    const handleCheckout = () => {
        navigate('/paymentCheckout'); 
    };

    // Poner el boton de checkout deshabilitado si el precio es 0
    React.useEffect(() => {
        setIsDisabled(subTotal <= 0);
    }, [subTotal]);

    return (
        <div className="mt-6 rounded-lg border bg-white p-6 shadow-md md:mt-0">
            <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${subTotal}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
                <p className="text-gray-700">Total</p>
                <div className="">
                    <p className="text-gray-700">${subTotal > 0 ? totalBillings() : 0} USD</p>
                    <p className="text-sm text-gray-700">including IVA</p>
                </div>
            </div>
            <button
                className={`mt-6 w-full rounded-md py-1.5 font-medium text-blue-50 hover:bg-blue-600 ${isDisabled ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-blue-50'}`}
                onClick={handleCheckout} 
                disabled={isDisabled} 
            >
                Check out
            </button>
        </div>
    );
};

export default Billing;