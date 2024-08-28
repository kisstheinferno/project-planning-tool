import { Box, Text, Button, useToast } from '@chakra-ui/react';
import { useLoaderData, useNavigate } from 'react-router-dom'

const Profile = () => {
    const data = useLoaderData();
    const navigate = useNavigate()
    const toast = useToast()

    console.log(data)

    const onClick = () => {
        localStorage.removeItem("token")
        navigate("/log-in")
        toast({
            title: "Success",
            description: "You have been logged out!",
            status: "success",
            duration: 3000,
            isClosable: true
        })
    }

    return (
        <Box>
          <Text textAlign="center" mb={4}>
            Account Details
          </Text>
          <Button onClick={onClick}>Log Out</Button>
        </Box>
    )
};
export default Profile;
