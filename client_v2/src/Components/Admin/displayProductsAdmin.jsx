import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Pagination, Breadcrumbs, BreadcrumbItem, Chip } from "@nextui-org/react";

import HomeIcon from '../../Assets/homeIcon';
import SettingsIcon from '../../Assets/settingsIcon';
import ManagementIcon from '../../Assets/managementIcon';
import EditIcon from '../../Assets/editIcon';
import DeleteIcon from '../../Assets/deleteIcon';
import AlertIcon from '../../Assets/alertIcon';

import Container from '../General/Container';
import Card from '../General/Card';
import Image from '../General/Image';
import FilterPanel from '../General/FilterPanel';

import { AuthContext } from '../../context/AuthContext';
import { listProductsInStockFiltered, deleteProductInStock } from '../../Routes/routes';

function DisplayProductsAdmin() {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        min_price: 0,
        max_price: 20000,
        min_float: 0,
        max_float: 1,
        stattrak: false,
        name: ''
    });

    useEffect(() => {
        fetchData();
    }, [currentPage, filters]);

    async function fetchData() {
        try {
            const response = await axios.get(listProductsInStockFiltered(currentPage, filters));
            console.log('Colección de productos filtrados: ', response.data.data)
            setProducts(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    }

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset current page when filters change
    };
    
    const handleEditBtn = (product) => {
        setSelectedProduct(product);
    }

    const handleDeleteBtn = (product) => {
        setSelectedProduct(product);
        onOpen();
    }

    const handleDeleteConfirmation = async () => {
        if (selectedProduct) {
            try {
                await axios.put(deleteProductInStock(selectedProduct.id, user.id));
                // const updatedProducts = products.filter(product => product.id !== selectedProduct.id);
                // setProducts(updatedProducts);
                fetchData();
            } catch (error) {
                console.error('Error deleting product: ', error);
            }
            onClose();
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Container className='container w-[81%] ms-[3%] mt-[5%] 2xl:mt-[4%] mb-3'>
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
                </Breadcrumbs>
            </Container>

            <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />

            <Container className='flex justify-center items-center mt-8 mx-10'>
                <Container className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10'>
                    {products.map(productInStock => (
                        <Container key={productInStock.id} className='flex flex-col items-end'>
                            <Container className='flex justify-center w-24 rounded-t-lg shadow-xl pb-2 bg-white'>
                                <Link to={`/settings/product-management/edit/${productInStock.id}`}>
                                    <Button isIconOnly onClick={() => handleEditBtn(productInStock)} className='mt-2 me-1 bg-sky-700 hover:bg-sky-600'>
                                        <span className="text-white"><EditIcon /></span>
                                    </Button>
                                </Link>
                                <Button isIconOnly onClick={() => handleDeleteBtn(productInStock)} className='mt-2 bg-red-700 hover:bg-red-600'>
                                    <DeleteIcon />
                                </Button>
                            </Container>
                            <Link to={`/product/${productInStock.id}`}>
                                <Card
                                    className='rounded-none rounded-tl-lg rounded-br-lg rounded-bl-lg shadow-xl'
                                    src={productInStock.product.image}
                                    alt={productInStock.product.name}
                                    productName={productInStock.product.name}
                                    patternName={productInStock.product.pattern}
                                    productPrice={productInStock.unit_price}
                                    floatProduct={productInStock.float} />
                            </Link>
                        </Container>
                    ))}
                </Container>
            </Container>

            <Container className="flex justify-center items-center my-20">
                <Pagination
                    showControls
                    showShadow
                    total={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Container>


            <Modal isOpen={isOpen} onClose={onClose} size='3xl' backdrop='blur' isDismissable={false}>
                <ModalContent className="bg-customGrey">
                    <>
                        <ModalHeader className='mt-4 ms-4 flex items-center'>
                            <AlertIcon className='me-5' />
                            Product Removal Confirmation
                        </ModalHeader>
                        {/* 
                        <ModalHeader className='flex flex-col'>Product Removal Confirmation</ModalHeader> 
                        <Divider className="my-4 bg-gray-400" /> 
                        */}
                        <ModalBody>
                            {selectedProduct && (
                                <>
                                    <Container className='grid grid-cols-1 sm:grid-cols-2'>
                                        <Container className='border border-white'>
                                            <Image
                                                src={selectedProduct.product.image}
                                                alt={selectedProduct.product.name}
                                                className='w-[70%] mx-auto' />
                                        </Container>
                                        <Container className='border border-white'>
                                            <Container className='mb-4'>
                                                {selectedProduct.product.name} | {selectedProduct.product.pattern}
                                                <Chip className='me-4'>{selectedProduct.product.category}</Chip>
                                            </Container>
                                            <Container className='mb-4'>
                                                <Chip className='me-4'>{selectedProduct.product.rarity_name}</Chip>
                                            </Container>
                                            <Container className='mb-4'>
                                                <Chip className='me-4'>{selectedProduct.stattrak === 0 ? 'Without Stattrak' : 'Stattrak'}</Chip>
                                            </Container>
                                            <Container className='mb-4'>
                                                <Chip className='me-4'>{selectedProduct.float} %</Chip>
                                            </Container>
                                            <Container>
                                                <span>{selectedProduct.unit_price.toFixed(2)} €</span>
                                            </Container>
                                        </Container>
                                    </Container>
                                    {/* <Container className='mx-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'>
                                        <Container className='border border-black w-[80%]'>
                                            <Image
                                                src={selectedProduct.product.image}
                                                alt={selectedProduct.product.name}
                                                className='w-8/12 mx-auto' />
                                        </Container>
                                        <Container className='border border-black'>
                                            <Container className='font-bold'>Name: <span className='font-normal'>{selectedProduct.product.name}</span></Container>
                                            <Container className='font-bold'>Pattern: <span className='font-normal'>{selectedProduct.product.pattern}</span></Container>
                                            <Container className='font-bold'>Category: <span className='font-normal'>{selectedProduct.product.category}</span></Container>
                                            <Container className='font-bold'>Rarity: <span className='font-normal'>{selectedProduct.product.rarity_name}</span></Container>
                                            <Container className='font-bold'>Stattrak: <span className='font-normal'>{selectedProduct.stattrak === 0 ? 'Without Stattrak' : 'With Stattrak'}</span></Container>
                                            <Container className='font-bold'>Float: <span className='font-normal'>{selectedProduct.float}</span></Container>
                                        </Container>
                                    </Container> */}
                                </>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={handleDeleteConfirmation}>Delete</Button>
                            <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DisplayProductsAdmin;