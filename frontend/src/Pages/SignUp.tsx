import { Box, Input, Text, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';


const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [submitClickedEmail, setSubmitClickedEmail] = useState(false);
  const [submitClickedUsername, setSubmitClickedUsername] = useState(false);
  const [submitClickedPassword, setSubmitClickedPassword] = useState(false);

  const isErrorName = name === '' && submitClickedName;
  const isErrorEmail = email === '' && submitClickedEmail;
  const isErrorUsername = username === '' && submitClickedUsername;
  const isErrorPassword = password === '' && submitClickedPassword;


  const onChangeName = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  }

  const onChangeEmail = (e: any) => {
    setSubmitClickedEmail(false);
    setEmail(e.target.value);
  }

  const onChangeUsername = (e: any) => {
    setSubmitClickedUsername(false);
    setUsername(e.target.value);
  }

  const onChangePassword = (e: any) => {
    setSubmitClickedPassword(false);
    setPassword(e.target.value);
  }

  const onSubmit = () => {
    setSubmitClickedName(true);
    setSubmitClickedEmail(true);
    setSubmitClickedUsername(true);
    setSubmitClickedPassword(true);

    if (name === "" || email === "" || username === "" || password === "") {
      console.log('Error Bitch');
    }else{
      axios.post('http://localhost:3005/auth/sign-up', {
        name,
        email,
        username,
        password,
      })
      .then((response) => {
        console.log('RESPONSE: ', response);
        setName('');
        setEmail(''); 
        setUsername('');
        setPassword('');
        setSubmitClickedName(false)
        setSubmitClickedEmail(false)
        setSubmitClickedUsername(false)
        setSubmitClickedPassword(false)
      })
    };
  }



  return (
    <Box>
      <Text fontSize={20} textAlign='center' mb={4}>Create an Account</Text>
      <Box 
      maxW="75%" 
      display='flex' 
      flexDirection='column' 
      alignItems="center"
      margin='0 auto'
      gap={4}
      >
        <FormControl isInvalid={isErrorName} isRequired>
          <FormLabel>Name</FormLabel>
          <Input type='text' value={name} onChange={onChangeName} />
          {!isErrorName ? null : (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isErrorEmail} isRequired>
          <FormLabel>Email</FormLabel>
          <Input type='email' value={email} onChange={onChangeEmail} />
          {!isErrorEmail ? null : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isErrorUsername} isRequired>
          <FormLabel>Username</FormLabel>
          <Input type='text' value={username} onChange={onChangeUsername} />
          {!isErrorUsername ? null : (
            <FormErrorMessage>Username is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isErrorPassword} isRequired>
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
}

export default SignUp;
