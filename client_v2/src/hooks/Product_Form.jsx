import axios from 'axios';
import { useState, useEffect } from 'react';
import {
    uniqueProductCategories,
    getProducts,
    listskins,
    getSkins,
    getDescription,
    addStock,
} from '../Routes/routes';

import { useNavigate,Link } from 'react-router-dom';
export function useFormEffects() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [skins, setSkins] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [selectedPattern, setSelectedPattern] = useState('');
    const [units, setUnits] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [float, setFloat] = useState('');
    const [stattrak, setStattrak] = useState(false); // Nuevo estado para StatTrak
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            units,
            unit_price: unitPrice,
            float: float,
            name: selectedProduct,  
            pattern: selectedPattern,
            stattrak: stattrak 
        };
        axios.post(addStock(), formData)
            .then(response => {
                console.log(response.data);
                // Redirecciona a la ruta deseada después de agregar el producto
                navigate('/settings/product-management');
            })
            .catch(error => {
                console.error('Error al enviar los datos:', error);
            });
    };

    useEffect(() => {
        axios.get(uniqueProductCategories())
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        if (selectedProduct && selectedPattern) {
            axios.get(getDescription(selectedProduct, selectedPattern))
                .then(response => {
                    setDescription(response.data.description); 
                })
                .catch(error => console.error('Error fetching description:', error));
        }
    }, [selectedProduct, selectedPattern]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        axios.get(getProducts(event.target.value))
            .then(response => {
                setProducts(response.data);
                setSkins([]);
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    const handleSkinChange = (event) => {
        setSelectedPattern(event.target.value);
        axios.get(listskins(selectedProduct, event.target.value))
            .then(response => {
                const data = response.data;
                if (data.length > 0) {
                    setImageUrl(data[0]);
                }
            })
            .catch(error => console.error('Error:', error));
    };
    
    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
        axios.get(getSkins(event.target.value))
            .then(response => {
                setSkins(response.data);
            })
            .catch(error => console.error('Error fetching skins:', error));
    };

    return {
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
        stattrak, // Incluye stattrak en el retorno del hook
        description,
        handleCategoryChange,
        handleSkinChange,
        handleProductChange,
        setUnits,
        setUnitPrice,
        setFloat,
        setStattrak, // Nuevo setter para StatTrak
        handleSubmit
    };
}
