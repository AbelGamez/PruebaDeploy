import { Input as NextInput } from '@nextui-org/react';

import Container from '../General/Container';

const Input = ({ ...rest }) => {

    return (
        <Container className='mb-5'>
            {/* <label htmlFor=""></label> */}
            <NextInput {...rest} />
        </Container>
    );
}

export default Input;