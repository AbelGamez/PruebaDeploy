// import axios from "axios";
import { Link } from "react-router-dom";

import userQuery from '../../Assets/userQuery.svg';

import Container from '../General/Container';

function Settings() {

    return (
        <>
            <Container className='px-20 mt-40'>
                <Container className='grid grid-cols-2'>
                    <Link to={'/settings/product-management'}>
                        <Container className='w-10/12 mx-auto text-black border cursor-pointer shadow-2xl rounded-lg transform transition-transform duration-500 hover:scale-105'>
                            <img src={userQuery} alt="User Query Icon" className='py-10 mx-auto w-5/12' />
                            <Container className='text-center w-4/12 mx-auto pb-5'>
                                <span>Product Management</span>
                            </Container>
                        </Container>
                    </Link>
                    <Link to={'/settings/user-management'}>
                    <Container className='w-10/12 mx-auto text-black border cursor-pointer shadow-2xl rounded-lg transform transition-transform duration-500 hover:scale-105'>
                        <img src={userQuery} alt="User Query Icon" className='py-10 mx-auto w-5/12' />
                        <Container className='text-center w-4/12 mx-auto pb-5'>
                            <span>User Management</span>
                        </Container>
                    </Container>
                    </Link>
                    </Container>
                <Container className='grid grid-cols-1 mx-auto w-6/12 mt-20'>
                    <Container className='w-10/12 mx-auto text-black border cursor-pointer shadow-2xl rounded-lg transform transition-transform duration-500 hover:scale-105'>
                        <img src={userQuery} alt="User Query Icon" className='py-10 mx-auto w-5/12' />
                        <Container className='text-center w-4/12 mx-auto pb-5'>
                            <span>User Activity Log</span>
                        </Container>
                    </Container>
                </Container>
            </Container>
        </>
    );
}

export default Settings;