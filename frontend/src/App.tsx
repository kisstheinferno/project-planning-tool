import React from 'react';
import './App.css';
import { Input, Button, Box, ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onChangeFirstName = (event:any) => {
    setFirstName(event.target.value);
  }

  const onChangeLastName = (event:any) => {
    setLastName(event.target.value);
  }

  const handleClick = async () => {
    const response = await axios.post('http://localhost:3005/name', {
      firstName,
      lastName
    });
    console.log("Response: ", response.data);
  }
  return (
    <ChakraProvider>
      <Box m={10} display="flex" gap={4}>
        <Input onChange={onChangeFirstName} placeholder="Type in a first name..." />
        <Input onChange={onChangeLastName} placeholder="Type in a last name..." />
        <Button colorScheme="purple" onClick={handleClick}>
          Add
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
