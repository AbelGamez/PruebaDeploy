import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { listProductsInStockByPaymentId } from '../../Routes/routes';
import { Card } from '@nextui-org/react';



export default function ListProductsPayment() {
  const { paymentId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(listProductsInStockByPaymentId(paymentId));
        setProducts(response.data);
        console.log(response.data)

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [paymentId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching products: {error.message}</p>;
  }

  return (
    <div className="transactions-container mt-20">
        <h1>Products in Order {paymentId}</h1>
      {products.map((product) => (
        <Card key={product.id} className="product-card mt-3">
          <img src={product.image} alt={product.name} className="w-52 mr-4" />
          <div>
            <h2>{product.name} {product.pattern} </h2>
          </div>
        </Card>
      ))}
    </div>
  );
}
