import { Card as NextUICard, CardHeader, CardBody, Chip, Divider } from '@nextui-org/react';

import ShoppingCartIcon from '../../Assets/shoppingCartIcon';
import WearsIcon from '../../Assets/wearsIcon';

import Container from './Container';
import Image from './Image';

const Card = ({ className, src, alt, productName, patternName, productPrice, floatProduct}) => {

    const getFloatText = (floatValue) => {
        if (floatValue >= 0 && floatValue < 0.07) {
            return ['Factory New', <WearsIcon key="icon" className="text-[#0A8B00] me-1" />];
        } else if (floatValue >= 0.07 && floatValue < 0.15) {
            return ['Minimal Wear', <WearsIcon key="icon" className="text-[#69C067] me-1" />];
        } else if (floatValue >= 0.15 && floatValue < 0.38) {
            return ['Field-Tested', <WearsIcon key="icon" className="text-[#F2B758] me-1" />];
        } else if (floatValue >= 0.38 && floatValue < 0.45) {
            return ['Well-Worn', <WearsIcon key="icon" className="text-[#DD5E59] me-1" />];
        } else if (floatValue >= 0.45 && floatValue <= 1) {
            return ['Battle-Scarred', <WearsIcon key="icon" className="text-[#A44440] me-1" />];
        }
    };

    const [floatText, floatIcon] = getFloatText(floatProduct);

    return (
        <NextUICard className={`${className} overflow-hidden relative transition-shadow duration-300 hover:shadow-lg`}>
        <CardHeader className='pb-0 flex justify-center items-center relative'>
            <Container className="transition-transform duration-300 transform hover:scale-105">
                <Image
                    src={src}
                    alt={alt}
                    className='w-52 transition-transform duration-300 transform hover:scale-103' />
            </Container>
            {/* <button onClick={onAddToCart} className="absolute top-0 right-0 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <ShoppingCartIcon />
            </button> */}
            <Chip size='sm' radius='sm' color="primary" className='px-2 absolute bottom-0 left-0 ml-3 mb-1'>{productName}</Chip>
        </CardHeader>
        <CardBody className='pt-0'>
            <Container className='flex justify-between relative'>
                <span className='text-sm font-semibold'>{patternName}</span>
                <span className='text-sm font-semibold'>{productPrice} €</span>
            </Container>
            <Divider className="my-2" />
            <Container className='flex justify-between items-center'>
                <span className='text-xs font-semibold flex items-center'>{floatIcon}{floatText}</span>
                <span className='text-xs font-semibold'>{floatProduct} %</span>
            </Container>
        </CardBody>
    </NextUICard>
    );
}

export default Card;


// import { Card as NextUICard, CardHeader, CardBody, Chip } from '@nextui-org/react';

// import Container from '../General/Container';
// import Image from '../General/Image';

// const Card = ({ productName, src, alt }) => {
//     return (
//         <NextUICard className='rounded-none rounded-tl-lg rounded-br-lg rounded-bl-lg shadow-xl'>
//             <CardHeader className='pb-0'>
//                     <Container>
//                         <Image
//                             src={src}
//                             alt={alt}
//                             className='w-45'/>
//                     </Container>
//             </CardHeader>
//             <CardBody className='pt-0'>
//                 <Chip color="primary">{productName}</Chip>
//             </CardBody>
//         </NextUICard>
//     );
// }

// export default Card;