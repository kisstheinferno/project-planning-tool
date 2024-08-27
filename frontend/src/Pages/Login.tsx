import { Box, Text, FormControl, FormLabel, Input, FormErrorMessage, Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [submitClickedUsername, setSubmitClickedUsername] = useState(false);
  const [submitClickedPassword, setSubmitClickedPassword] = useState(false);

  const isErrorUsername = username === '' && submitClickedUsername;
  const isErrorPassword = password === '' && submitClickedPassword;

  const onChangeUsername = (e: any) => {
    setSubmitClickedUsername(false);
    setUsername(e.target.value);
  }

  const onChangePassword = (e: any) => {
    setSubmitClickedPassword(false);
    setPassword(e.target.value);
  }

  const onSubmit = () => {
    setSubmitClickedUsername(true);
    setSubmitClickedPassword(true);

    if ( 
      username === "" || 
      password === ""
    ){console.log('Error Bitch');
    }else {
      axios.post('http://localhost:3005/auth/log-in', {
        username,
        password,
      })
      .then((response) => {
        console.log('RESPONSE: ', response.data);
        const token = response.data;
        localStorage.setItem("token", token);
        setUsername('');
        setPassword('');
        setSubmitClickedUsername(false);
        setSubmitClickedPassword(false);

        navigate("/projects");
        toast({
          title:"Logged In",
          description:`Welcome back ${ username }`,
          status: "success",
          duration:3000,
          isClosable: true,
        })
      })
      .catch ((error) => {
        setUsername('');
        setPassword('');
        setSubmitClickedUsername(false);
        setSubmitClickedPassword(false);
        console.log("ERROR", error)
        toast({
          title:"Error",
          description: "There was an error logging you into account, please try again",
          status:"error",
          duration: 3000,
          isClosable: true,
        })
      })
    };
  }
  

  return (
    <Box>
      <Text fontSize={20} textAlign='center' mb={4}>Log into Your Account</Text>
      <Box 
      maxW="75%" 
      display='flex' 
      flexDirection='column' 
      alignItems="center"
      margin='0 auto'
      gap={4}
      >
        <FormControl isInvalid={isErrorUsername} >
          <FormLabel>Username</FormLabel>
          <Input type='text' value={username} onChange={onChangeUsername} />
          {!isErrorUsername ? null : (
            <FormErrorMessage>Username is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isErrorPassword} >
          <FormLabel>Password</FormLabel>
          <Input type='password' value={password} onChange={onChangePassword} />
          {!isErrorPassword ? null : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>
        <Button w="100%" onClick={onSubmit}>Submit</Button>
      </Box>
    </Box>
  );
};
export default Login;
