import {Image as ImageNextUI} from "@nextui-org/react";

const Image = ({ src, alt, className}) => {

    return (
        <ImageNextUI
            src={src}
            alt={alt}
            className={className}
            loading='lazy'
        />
    );
}

export default Image;