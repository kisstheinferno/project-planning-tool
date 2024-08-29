import { Box, Image, Heading } from '@chakra-ui/react';
import logo from './logo';
import { Link } from 'react-router-dom';

const pages = [
  {name: "Log In", path: "/log-in"},
  {name: "Create Account", path: "/sign-up"},
  {name: "Projects", path: "/projects"},
  {name: "Account Details", path: "/profile"},
]

const Header = () => {


  return (
    <Box p={4} display="flex" border="1px solid" alignItems="center">
      <Box display="flex" gap={4}  alignItems="center">
        <Image 
          src={logo} 
          alt='logo' 
          boxSize="70px" 
          objectFit="cover"
        />
        <Heading fontSize={24}>Project Planning Tool</Heading>
      </Box>
      <Box display="flex" justifyContent="space-around" w="70%">
        {pages.map((page) => {
          return (<Link to={page.path}><Box>{page.name}</Box></Link>);
        })}
      </Box>
    </Box>
  );
}

export default Header;
