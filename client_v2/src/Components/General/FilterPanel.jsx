// import { useState } from 'react';
import { Slider, Checkbox, Input } from '@nextui-org/react';

import SearchIcon from '../../Assets/searchIcon';

import Container from "./Container";

function FilterPanel({ filters, onFiltersChange }) {

    const handlePriceChange = (values) => {
        console.log('Price changed:', values);
        onFiltersChange({ ...filters, min_price: values[0], max_price: values[1] });
    };

    const handleFloatChange = (values) => {
        console.log('Float changed:', values);
        onFiltersChange({ ...filters, min_float: values[0], max_float: values[1] });
    };

    const handleStattrakChange = (event) => {
        console.log('Stattrak changed:', event.target.checked);
        onFiltersChange({ ...filters, stattrak: event.target.checked });
    };

    const handleNameChange = (event) => {
        console.log('Name changed:', event.target.value);
        onFiltersChange({ ...filters, name: event.target.value });
    };

    return (
        <Container className='py-5 bg-black bg-opacity-15'>
            <form action="">
                <Container className='container mx-auto flex flex-wrap justify-center'>
                    <Container className='w-2/12 mx-5'>
                        <Slider
                            label="Price"
                            color='foreground'
                            step={50}
                            minValue={0}
                            maxValue={20000}
                            defaultValue={[0, 20000]}
                            formatOptions={{ style: "currency", currency: "USD" }}
                            className="max-w-md text-black"
                            onChangeEnd={handlePriceChange} />
                    </Container>
                    <Container className='w-2/12 mx-5'>
                        <Slider
                            label="Float"
                            color='foreground'
                            step={0.001}
                            minValue={0}
                            maxValue={1}
                            defaultValue={[0, 1]}
                            className="max-w-md text-black"
                            onChangeEnd={handleFloatChange} />
                    </Container>
                    <Container className='w-1/12 mx-10 flex items-center justify-center'>
                        <Checkbox
                            radius="none"
                            onChange={handleStattrakChange}>
                            Stattrak<sup className="text-xs">TM</sup>
                        </Checkbox>
                    </Container>
                    <Container className='w-3/12 mx-5'>
                        <Input
                            label="Search"
                            isClearable
                            radius="lg"
                            classNames={{
                                label: "text-black/50 dark:text-white/90",
                                input: [
                                    "bg-transparent",
                                    "text-black/90 dark:text-white/90",
                                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                ],
                                innerWrapper: "bg-transparent",
                                inputWrapper: [
                                    "shadow-xl",
                                    "bg-default-200/50",
                                    "dark:bg-default/60",
                                    "backdrop-blur-xl",
                                    "backdrop-saturate-200",
                                    "hover:bg-default-200/70",
                                    "dark:hover:bg-default/70",
                                    "group-data-[focused=true]:bg-default-200/50",
                                    "dark:group-data-[focused=true]:bg-default/60",
                                    "!cursor-text",
                                ],
                            }}
                            placeholder="Type to search..."
                            startContent={
                                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                            }
                            onChange={handleNameChange} />
                    </Container>
                </Container>
            </form>
        </Container>
    );
}

export default FilterPanel;