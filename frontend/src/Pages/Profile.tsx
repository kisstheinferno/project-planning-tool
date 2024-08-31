import { Box, Text, Button, useToast } from '@chakra-ui/react';
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Context } from '../App';

const Profile = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const context = useOutletContext() as Context

    const logout = () => {
        localStorage.removeItem("token");
        context.toggleLoggedIn();
        navigate("/log-in");
        toast({
            title: "Success",
            description: "You have been logged out!",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    }

    return (
        <Box>
          <Text textAlign="center" mb={4}>
            Account Details
          </Text>
          <Button onClick={logout}>Log Out</Button>
        </Box>
    )
};
export default Profile;
