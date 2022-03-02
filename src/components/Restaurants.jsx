import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Create from './Create';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const Restaurants = () => {

  const [data, setData] = useState([]);
  console.log(data, "data");

  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {

    var url = process.env.REACT_APP_API_URL;

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    const response = await fetch(url, requestOptions);
    const json = await response.json();
    console.log(json)
    setData(json);

  };

  const handleShow = (restaurant) => {
    console.log(restaurant);
  };

  const [create, setCreate] = useState(false);

  return (
    <div>
      <h1 className='main-title'>
        Restaurants
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell onClick={() => handleShow(item)}>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.address}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>

      <Create create={create} setCreate={setCreate} refresh={initData} />
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: 'fixed' }}
        sx={{ bottom: 16, right: 16, zIndex: '100' }}
        onClick={() => setCreate(true)}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default Restaurants
