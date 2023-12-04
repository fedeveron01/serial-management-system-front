import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const SerialManagement = () => {
  const [quantity, setQuantity] = useState('');
  const [daysDuration, setDaysDuration] = useState('');
  const [serials, setSerials] = useState([]);

  const fetchSerials = async () => {
    try {
      const response = await fetch('https://serial-management-api.onrender.com/serial');
      const data = await response.json();
      setSerials(data);
    } catch (error) {
      console.error('Error fetching serials:', error);
    }
  };

  const handleRegister = async () => {
    try {
      console.log(quantity, daysDuration);
      const response = await fetch('https://serial-management-api.onrender.com/serial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: quantity, durationDays: parseInt(daysDuration) }),
      });
      console.log(response);
      if (response.ok) {
        console.log('Serial registered');
        // Registro exitoso, actualizar la lista de seriales
        fetchSerials();
      } else {
        console.error('Error registering serial');
      }
    } catch (error) {
      console.error('Error registering serial:', error);
    }
  };
  const handleDelete = (code) => {
    console.log(code);
    try {
        fetch('https://serial-management-api.onrender.com/serial/' + code, {
            method: 'DELETE',
        }).then(resultado => {
            fetchSerials();
        }
            ).catch((error) => {
            console.error('Error deleting serial:', error);
        }
        );
    }catch (error) {
        console.error('Error deleting serial:', error);
    }
  }

  useEffect(() => {
    fetchSerials();
  }, []);

  return (
    <div>
      <div>
        <br />
        <TextField
          label="Cantidad"
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <TextField
          label="Duración del serial en dias"
          variant="outlined"
          type="number"
          value={daysDuration}
          onChange={(e) => setDaysDuration(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Used</TableCell>
              <TableCell>Expiration Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serials.map((serial) => (
              <TableRow key={serial.code}>
                <TableCell>{serial.code}</TableCell>
                <TableCell>{serial.used.toString()}</TableCell>
                <TableCell>{serial.expirationDate}</TableCell>
                <TableCell><Button onClick={() => handleDelete(serial.code)}><DeleteIcon/></Button></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SerialManagement;
