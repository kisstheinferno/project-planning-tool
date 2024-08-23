import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Outlet />
    </ChakraProvider>
  );
}

export default App;
