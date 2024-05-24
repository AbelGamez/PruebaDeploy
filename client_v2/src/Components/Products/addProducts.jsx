import React from 'react';
import axios from 'axios';

import Container from '../General/Container';
import Image from '../General/Image';
import SelectInput from '../General/SelectInput';
import TextInput from '../General/Text_Input';
import Checkbox from '../General/CheckBox'; 
import { Breadcrumbs, BreadcrumbItem, Card as NextUICard, CardBody, Slider, Textarea, Button } from "@nextui-org/react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import HomeIcon from '../../Assets/homeIcon';
import SettingsIcon from '../../Assets/settingsIcon';
import ManagementIcon from '../../Assets/managementIcon';
import EditIcon from '../../Assets/editIcon';

import { useFormEffects } from '../../hooks/Product_Form';

function AddProdcuts() {
    const {
        categories,
        selectedCategory,
        products,
        selectedProduct,
        skins,
        imageUrl,
        selectedPattern,
        units,
        unitPrice,
        float,
        description,
        stattrak, 
        handleCategoryChange,
        handleSkinChange,
        handleProductChange,
        setUnits,
        setUnitPrice,
        setFloat,
        setStattrak, 
        handleSubmit,
    } = useFormEffects();

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
                        <Link to="/Dashboard" className="flex items-center">
                            <SettingsIcon /><span className='ms-1 text-xs'>Dashboard</span>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/settings/product-management/add" className="flex items-center">
                            <ManagementIcon /><span className='ms-1 text-xs'>Add Product</span> 
                        </Link>
                    </BreadcrumbItem>
                </Breadcrumbs>
            </Container>
            <Container className='container flex items-center justify-center mx-auto px-4 sm:px-6 lg:px-8'>
                <NextUICard className='w-[85%]'>
                    <CardBody>
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-center mb-8">Agregar Producto</h1>
                            <Container className='grid grid-cols-1 gap-6'>
                                <Container className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6'>
                                    <Container className='w-8/12 sm:w-8/12 md:w-[60%] lg:w-[80%] xl:w-[70%] 2xl:w-[58%] xl:ms-[20%] 2xl:ms-[30%] my-auto mx-auto text-center flex justify-center '>
                                        <Container className="w-full h-full relative">
                                            <Image 
                                            src={imageUrl || ''} 
                                            alt=" " 
                                            className="product-image" />
                                        </Container>
                                    </Container>
                                    <Container className='w-[85%] sm:w-[82%] md:w-[79%] lg:w-[75%] xl:w-[71%] 2xl:w-[71%] mx-[8%] sm:mx-[9%] md:mx-[10%] lg:mx-[0%] my-auto space-y-4 text-center'>
                                    <SelectInput
                            label="Categoría:"
                            options={categories.map(category => ({ value: category.category, label: category.category }))}
                            onChange={handleCategoryChange}
                            id="productCategory"
                            name="productCategory"
                            className="w-full mb-2"
                        />
                                <SelectInput
                                label="Productos:"
                                options={products.map((productName, index) => ({ value: productName, label: productName }))}
                                onChange={handleProductChange}
                                id="products"
                                name="products"
                                className="w-full mb-2"
                            />
                            <SelectInput
                                label="Skins:"
                                options={skins.map((skinName, index) => ({ value: skinName, label: skinName }))}
                                onChange={handleSkinChange}
                                id="skin"
                                name="skin"
                                className="w-full mb-2"
                            />
                            <TextInput
                                label="Units"
                                value="1"
                                defaultValue="1"
                                onChange={(e) => setUnits(e.target.value)}
                                name="unit"
                                className="w-80 mb-2"
                                disable
                            />
                            <TextInput
                                label="Unit price"
                                value={unitPrice}
                                onChange={(e) => setUnitPrice(e.target.value)}
                                name="unit_price"
                                required
                                min="0"
                                step=".01"
                                className="w-80 mb-2"
                            />
                            <Slider
                                label="Float"
                                value={float}
                                onChange={setFloat}
                                step={0.00001}
                                maxValue={1}
                                minValue={0}
                                defaultValue={0.5}
                                className="w-80 mb-2"
                                required
                            />
                             <Checkbox
                                label="StatTrak"
                                checked={stattrak}
                                onChange={(e) => setStattrak(e.target.checked)} // Maneja el cambio en el estado de StatTrak
                                className="mb-2"
                            />
                                    </Container>
                                </Container>
                                <Container className='w-[93%] sm:w-[89%] md:w-[94%] lg:w-[90%] xl:w-[90%] 2xl:w-[90%] mt-5 mx-auto'>
                                     <Textarea
                                     label="Description"
                                     value={description.textValue || description.toString()}
                                     className='w-11/12 sm:w-11/12 md:w-10/12 lg:w-[84%] xl:w-[85%] mx-auto'
                                     
                                    //  className="product-description mt-4 text-center"
                                     disabled
                                      />
                                </Container>
                            </Container>
                            <Container className="w-[76%] mx-auto flex justify-end mt-5 mb-5 space-x-4">
                                 <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                     Agregar Producto
                                 </button>
                            </Container>
                        </form>
                    </CardBody>
                </NextUICard>
            </Container>
    </>
);

}

export default AddProdcuts;
