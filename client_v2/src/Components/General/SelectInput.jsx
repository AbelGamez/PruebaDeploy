import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import Container from '../General/Container';

const SelectInput = ({ label, options, onChange }) => {
  return (
    <Container className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select 
        label={label || "Select an option"} 
        className="max-w-xs" 
        onChange={onChange}  
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </Container>
  );
};

export default SelectInput;
