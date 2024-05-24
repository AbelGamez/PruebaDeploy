import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { Card as NextUICard, CardBody, Accordion, AccordionItem } from "@nextui-org/react";

import Container from "../General/Container";
import Image from "../General/Image";
import ProductDetailsInfo from "../General/ProductDetailsInfo";
import Card from "../General/Card";

import { listProductInStock, listRndProductsInStock } from '../../Routes/routes';

function ProductDetails() {
    const { id } = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rndProducts, setRndProducts] = useState([]);

    useEffect(() => {
        fetchDetailProduct();
        fetchRndProducts();
        window.scrollTo(0, 0);
    }, [id]);

    async function fetchDetailProduct() {
        try {
            const response = await axios.get(listProductInStock(id));
            setSelectedProduct(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    async function fetchRndProducts() {
        try {
            const response = await axios.get(listRndProductsInStock());
            setRndProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    if (!selectedProduct) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Container className='container flex items-center justify-center mt-20 mx-auto px-4 sm:px-6 lg:px-8'>
                <NextUICard className='w-[85%]'>
                    <CardBody>
                        <h1 className='mt-5 mb-10 mx-[10%] text-black text-3xl font-bold'>{selectedProduct.product.name} | {selectedProduct.product.pattern}</h1>
                        <Container className='grid grid-cols-1 gap-6'>
                            <Container className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6'>
                                <Container className='w-8/12 sm:w-8/12 md:w-[60%] lg:w-[80%] xl:w-[70%] 2xl:w-[58%] xl:ms-[20%] 2xl:ms-[30%] my-auto mx-auto text-center flex justify-center'>
                                    <Container className="w-full h-full relative">
                                        <Image
                                            alt={selectedProduct.product.name}
                                            className="object-cover w-full h-full"
                                            // shadow='md'
                                            src={selectedProduct.product.image}
                                        />
                                    </Container>
                                </Container>
                                <Container className='w-[85%] sm:w-[82%] md:w-[79%] lg:w-[75%] xl:w-[71%] 2xl:w-[71%] mx-[8%] sm:mx-[9%] md:mx-[10%] lg:mx-[0%] my-auto space-y-4 text-center border border-black'>
                                    <ProductDetailsInfo fieldLabel='Category' fieldValue={selectedProduct.product.category} />
                                    <ProductDetailsInfo fieldLabel='Rarity' fieldValue={selectedProduct.product.rarity_name} />
                                    <ProductDetailsInfo fieldLabel='Stattrak' fieldValue={selectedProduct.stattrak === 0 ? 'Without Stattrak' : 'With Stattrak'} />
                                    <ProductDetailsInfo fieldLabel='Price' fieldValue={selectedProduct.unit_price} />
                                </Container>
                            </Container>
                            <Container className='w-[93%] sm:w-[89%] md:w-[94%] lg:w-[90%] xl:w-[90%] 2xl:w-[65%] mt-5 mx-auto'>
                                <Accordion selectionMode="multiple" defaultExpandedKeys={["1"]}>
                                    <AccordionItem key='1' aria-label="Description" title="Description">
                                        <Container className="pb-5">
                                            {selectedProduct.product.description}
                                        </Container>
                                    </AccordionItem>
                                    <AccordionItem key='2' aria-label="Shipping Information" title="Shipping & Return Information">
                                        We strive to provide you with a fast and secure shopping experience. All Counter-Strike skins you purchase from our store will be digitally delivered to your Steam account. The shipping process is almost instantaneous and you will receive your skins within 5-10 minutes after confirming your purchase. In case you experience any delays, please feel free to contact us through our customer support to assist you immediately.
                                    </AccordionItem>
                                    <AccordionItem key='3' aria-label="Contact" title="Contact">
                                        If you have any questions or need additional assistance, our support team is available 24/7. You can reach us via [email/contact]
                                    </AccordionItem>
                                </Accordion>
                            </Container>
                        </Container>
                    </CardBody>
                </NextUICard>
            </Container>
            
            <Container className='mx-auto my-24 w-11/12'>
                <h2 className='text-2xl font-bold mb-8 text-black'>Other skins you may be interested in</h2>
            <Container className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10'>
                {rndProducts.map(productInStock => (
                    <Container key={productInStock.id}>
                        <Link to={`/product/${productInStock.id}`}>
                            <Card 
                                src={productInStock.product.image}
                                alt={productInStock.product.name}
                                productName={productInStock.product.name}
                                patternName={productInStock.product.pattern}
                                productPrice={productInStock.unit_price}
                                floatProduct={productInStock.float}
                                />
                        </Link>
                    </Container>
                ))}
            </Container>
        </Container>
        </>
    );
}

export default ProductDetails;