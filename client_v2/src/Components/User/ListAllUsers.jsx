import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Pagination, Tooltip } from '@nextui-org/react';

import BanIcon from '../../Assets/banIcon';
import UnbanIcon from '../../Assets/unbanIcon';
import AdminIcon from '../../Assets/adminIcon';
import UserIcon from '../../Assets/userIcon';

import Container from '../General/Container';

import { listAllUsers, banUser, getAdmin } from '../../Routes/routes';

const ListAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // Simulación de un retraso de 1 segundos antes de realizar la solicitud.
    setTimeout(async () => {
      setIsLoading(true); // Establece isLoading a true al iniciar la carga de datos.
      try {
        // Realiza la solicitud para obtener los productos filtrados.
        const response = await axios.get(listAllUsers());
        // Actualiza el estado de los productos con los datos obtenidos.
        setUsers(response.data);
      } catch (error) {
        // Muestra un mensaje de error en la consola si ocurre algún error durante la solicitud.
        console.error('Error fetching products: ', error);
      } finally {
        // Establece isLoading a false después de cargar los datos (incluso si hay un error).
        setIsLoading(false);
      }
    }, 1000); // Espera 1000 milisegundos (1 segundos) antes de realizar la solicitud.
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to ban/unban this user?');
    if (confirmDelete) {
      try {
        await axios.post(banUser(id));
        await fetchUsers();
        // setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleAdmin = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to give admin privileges to this user?');
    if (confirmDelete) {
      try {
        await axios.post(getAdmin(id));
        await fetchUsers();
        // setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Error giving privileges to this user:', error);
      }
    }
  };

  // Calcular el índice del último usuario en la página actual
  // const indexOfLastUser = currentPage * usersPerPage;
  // Calcular el índice del primer usuario en la página actual
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Obtener los usuarios de la página actual
  // const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el índice del último usuario en la página actual
  const indexOfLastUser = currentPage * usersPerPage;
  // Calcular el índice del primer usuario en la página actual
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Obtener los usuarios de la página actual
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  // Calcular el número total de páginas
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container className="container mx-auto mt-20">
      <h1 className="text-3xl font-semibold mb-6">List of All Users</h1>
      <Container className="flex flex-col gap-3">
        <Table aria-label="User list">
          <TableHeader>
            <TableColumn className="text-center text-black">ID</TableColumn>
            <TableColumn className="text-center text-black">NAME</TableColumn>
            <TableColumn className="text-center text-black">LAST NAME</TableColumn>
            <TableColumn className="text-center text-black">EMAIL</TableColumn>
            <TableColumn className="text-center text-black">NICKNAME</TableColumn>
            <TableColumn className="text-center text-black">PHONE</TableColumn>
            <TableColumn className="text-center text-black">STATUS</TableColumn>
            <TableColumn className="text-center text-black">MODE</TableColumn>
            <TableColumn className="text-center text-black">ACTIONS</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            loadingContent={<Spinner size='lg' color="primary" />}
            emptyContent={"No rows to display."} >
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="text-center text-black">{user.id}</TableCell>
                <TableCell className="text-center text-black">{user.name}</TableCell>
                <TableCell className="text-center text-black">{user.apellidos}</TableCell>
                <TableCell className="text-center text-black">{user.email}</TableCell>
                <TableCell className="text-center text-black">{user.nickname}</TableCell>
                <TableCell className="text-center text-black">{user.telefono}</TableCell>
                <TableCell className="text-center text-black">{user.banned === 0 ? 'Able' : 'Banned'}</TableCell>
                <TableCell className="text-center text-black">{user.admin === 0 ? 'User' : 'Admin'}</TableCell>
                <TableCell className="text-center">
                  <Tooltip content={user.banned === 0 ? 'Ban user' : 'Unban user'} className='text-black'>
                    <Button isIconOnly onClick={() => handleDeleteUser(user.id)} className="ml-2 bg-[#F01717] text-white">
                      {user.banned === 0 ? <BanIcon /> : <UnbanIcon />}
                    </Button>
                  </Tooltip>
                  <Tooltip content={user.admin === 0 ? 'Grant admin privileges' : 'Revoke admin privileges'} className='text-black'>
                    <Button isIconOnly onClick={() => handleAdmin(user.id)} auto className="ml-2 bg-[#23AD22] text-white">
                      {user.admin === 0 ? <AdminIcon /> : <UserIcon />}
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Container className="flex justify-center">
          <Pagination
            showControls
            showShadow
            total={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
          {/* {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
            <Button key={i} onClick={() => paginate(i + 1)} className="mx-1">
              {i + 1}
            </Button>
          ))} */}
        </Container>
      </Container>
    </Container>
  );
};

export default ListAllUsers;
