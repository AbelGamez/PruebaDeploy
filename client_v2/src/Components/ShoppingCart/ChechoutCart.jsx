import React from 'react';
import { useCart } from '../../context/cartContext';
import Billing from "./Billing";
import { IoMdClose } from "react-icons/io";

const ChechoutCart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <main className="py-12 max-w-7xl container mx-auto px-4">
      <div className="mt-8 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:gap-8 gap-4">
          <div className="space-y-6 md:w-2/3">
            {cartItems.length ? (
              cartItems.map((item) => (
                <div key={item.id} className="rounded-lg">
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-28 rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {item.product.name}
                        </h2>
                        <p className="mt-1 text-sm text-gray-700">Price: ${item.unit_price}</p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">${item.unit_price}</p>
                          <button className="lws-removeFromCart" onClick={() => removeFromCart(item.id)}>
                            <IoMdClose style={{ color: 'red' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // POner algo aqui para cuando no haya nada en el carrito
              <div></div>
            )}
            <button
              className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${cartItems.length > 0 ? '' : 'hidden'}`}
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
          <div className="md:w-1/3"><Billing /></div>
        </div>
      </div>
    </main>
  );
};

export default ChechoutCart;