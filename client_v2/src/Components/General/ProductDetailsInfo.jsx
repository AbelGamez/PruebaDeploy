import Container from "./Container";

const ProductDetailsInfo = ({ fieldLabel, fieldValue }) => {
    return (
        <Container className='font-bold mb-2 flex flex-col'>
            {fieldLabel}
            <span className="mt-2 font-normal">{fieldValue}</span>
        </Container>
    );
}

export default ProductDetailsInfo;