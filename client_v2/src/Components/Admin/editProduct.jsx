import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import { Breadcrumbs, BreadcrumbItem, Card as NextUICard, CardBody, Slider, Textarea, Button } from "@nextui-org/react";

import { AuthContext } from '../../context/AuthContext';

import HomeIcon from '../../Assets/homeIcon';
import SettingsIcon from '../../Assets/settingsIcon';
import ManagementIcon from '../../Assets/managementIcon';
import EditIcon from '../../Assets/editIcon';

import Container from '../General/Container';
import Image from '../General/Image';
import Input from '../General/Input';

import { listProductInStock, editProductInStock } from "../../Routes/routes";

function EditProduct() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editedData, setEditedData] = useState({});
    

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(listProductInStock(id));
                setSelectedProduct(response.data);
                setEditedData(response.data);

                // console.log('Selected product: ', selectedProduct)
            } catch (error) {
                console.error('Error fetching products: ', error);
            }
        }
        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Actualizar los datos editados con los nuevos valores del input
        setEditedData({ ...editedData, [name]: value });
    };

    const handleSliderChange = (value) => {
        setEditedData({ ...editedData, float: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(editProductInStock(id, user.id), editedData);
            console.log(user.id);
            navigate('/settings/product-management');
        } catch (error) {
            console.error('Error editing product: ', error);
        }
    };

    const handleCancelSubmit = async (e) => {
        e.preventDefault();
        try {
            navigate('/settings/product-management');
        } catch (error) {
            console.error('Error editing product: ', error);
        }
    };

    if (!selectedProduct) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Container className='container w-[81%] mx-auto mt-24 mb-7 flex justify-center'>
                <Breadcrumbs>
                    <BreadcrumbItem>
                        <Link to="/" className="flex items-center">
                            <HomeIcon /><span className='ms-1 text-xs'>Home</span>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/settings" className="flex items-center">
                            <SettingsIcon /><span className='ms-1 text-xs'>Settings</span>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/settings/product-management" className="flex items-center">
                            <ManagementIcon /><span className='ms-1 text-xs'>Product management</span> 
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <EditIcon /><span className='ms-1 text-xs'>Edit</span>
                    </BreadcrumbItem>
                </Breadcrumbs>
            </Container>
            <Container className='container flex items-center justify-center mx-auto px-4 sm:px-6 lg:px-8'>
                <NextUICard className='w-[85%]'>
                    <CardBody>
                        <form onSubmit={handleOnSubmit}>
                            <h1 className='mt-5 mb-10 mx-[10%] text-black text-3xl font-bold'>{selectedProduct.product.name} | {selectedProduct.product.pattern}</h1>
                            <Container className='grid grid-cols-1 gap-6'>
                                <Container className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6'>
                                    <Container className='w-8/12 sm:w-8/12 md:w-[60%] lg:w-[80%] xl:w-[70%] 2xl:w-[58%] xl:ms-[20%] 2xl:ms-[30%] my-auto mx-auto text-center flex justify-center '>
                                        <Container className="w-full h-full relative">
                                            <Image
                                                alt={selectedProduct.product.name}
                                                className="object-cover w-full h-full"
                                                // shadow='md'
                                                src={selectedProduct.product.image}
                                            />
                                        </Container>
                                    </Container>
                                    <Container className='w-[85%] sm:w-[82%] md:w-[79%] lg:w-[75%] xl:w-[71%] 2xl:w-[71%] mx-[8%] sm:mx-[9%] md:mx-[10%] lg:mx-[0%] my-auto space-y-4 text-center'>
                                        {/* <Container className='w-[92%] sm:w-[92%] md:w-[83%] lg:w-[84%] xl:w-[76%] mx-5 sm:mx-5 md:mx-0 my-auto space-y-4 text-center'> */}
                                        <Input
                                            label="Category"
                                            value={selectedProduct.product.category}
                                            className='w-full'
                                            disabled />
                                        <Input
                                            label='Rarity'
                                            value={selectedProduct.product.rarity_name}
                                            className='w-full'
                                            disabled />
                                        <Input
                                            label='Stattrak™'
                                            value={selectedProduct.stattrak === 0 ? 'Without Stattrak' : 'With Stattrak'}
                                            className='w-full'
                                            disabled />
                                        <Slider
                                            label='Float'
                                            name='float'
                                            value={editedData.float}
                                            step={0.001}
                                            maxValue={1}
                                            minValue={0}
                                            defaultValue={0.5}
                                            className="w-full mb-2"
                                            onChange={handleSliderChange} />
                                    </Container>
                                </Container>
                                <Container className='w-[93%] sm:w-[89%] md:w-[94%] lg:w-[90%] xl:w-[90%] 2xl:w-[90%] mt-5 mx-auto'>
                                    {/* <Container className='mt-5 w-[90%] mx-auto'> */}
                                    <Textarea
                                        label="Description"
                                        value={selectedProduct.product.description}
                                        className='w-11/12 sm:w-11/12 md:w-10/12 lg:w-[84%] xl:w-[85%] mx-auto'
                                        disabled />
                                </Container>
                                <Container className='w-[89%] sm:w-[85%] md:w-[85%] lg:w-[84%] xl:w-[85.4%] 2xl:w-[86.4%] mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-6'>
                                    {/* <Container className='mt-5 mx-4 sm:mx-4 md:mx-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-6'> */}
                                    <Container>
                                        <Input
                                            label='Unit'
                                            value={selectedProduct.units}
                                            className='w-11/12 sm:w-11/12 md:w-10/12 lg:w-4/5 xl:w-[79%] 2xl:w-[77%] mx-auto'
                                            disabled />
                                    </Container>
                                    <Container>
                                        <Input
                                            label='Price'
                                            type='number'
                                            name='unit_price'
                                            value={editedData.unit_price}
                                            className='w-11/12 sm:w-11/12 md:w-10/12 lg:w-4/5 xl:w-[79%] 2xl:w-[77%] mx-auto'
                                            onChange={handleInputChange}
                                            startContent={
                                                <Container className="pointer-events-none flex items-center">
                                                    <span className="text-default-400 text-small">$</span>
                                                </Container>
                                            } />
                                    </Container>
                                </Container>
                            </Container>
                            <Container className="w-[76%] mx-auto flex justify-end mt-5 mb-5 space-x-4">
                                <Button type='submit' color='primary' radius='sm' className='px-10'>Save</Button>
                                <Button color='danger' radius='sm' className='px-9' onClick={handleCancelSubmit}>Cancel</Button>
                            </Container>
                        </form>
                    </CardBody>
                </NextUICard>
            </Container>
        </>
    );
}

export default EditProduct;