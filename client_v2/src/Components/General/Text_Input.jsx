import React from "react";
import { Input as NextUIInput } from "@nextui-org/react";
import Container from '../General/Container';

const TextInput = ({ label, value, onChange, placeholder, type, ...rest }) => {
  return (
    <Container className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <NextUIInput 
        type={type || "text"}
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
    </Container>
  );
};

export default TextInput;
