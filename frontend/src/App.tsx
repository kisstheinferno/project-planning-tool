import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Outlet, useLoaderData} from 'react-router-dom';
import Header from './Components/Header';
import { useState } from 'react';

type Data = {
  email: string;
  name: string;
  username: string;
};

export type Context = {
  loggedIn: boolean;
  toggleLoggedIn: () => void;
}

function App() {
  const data = useLoaderData() as Data | undefined;
  const [loggedIn, setLoggedIn] = useState(data?.username !== undefined);

  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  }

  const context: Context = {
    loggedIn,
    toggleLoggedIn
  }

  console.log("LOGGEDIN: ", loggedIn);

  return (
    <ChakraProvider>
      <Header loggedIn={loggedIn}/>
      <Outlet context={context}/>
    </ChakraProvider>
  );
}

export default App;
