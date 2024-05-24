// import React from "react";
import {Button as NextUIButton} from "@nextui-org/react";

const EditAndDeleteBtn = ({ src, alt, className, onClick }) => {
    return (
      <NextUIButton isIconOnly className={className} onClick={onClick}>
        <img src={src} alt={alt} loading="lazy" />
      </NextUIButton>
    );
  };

export default EditAndDeleteBtn;