import { Box, Image, Heading } from '@chakra-ui/react';
import logo from './logo';
import { Link } from 'react-router-dom';

const pages = [
  {name: "Log In", path: "/log-in", showWhenLoggedIn: false},
  {name: "Create Account", path: "/sign-up", showWhenLoggedIn: false},
  {name: "Projects", path: "/projects", showWhenLoggedIn: true},
  {name: "Account Details", path: "/profile", showWhenLoggedIn: true},
]

type Props = {
  loggedIn: boolean;
}

const Header = ({loggedIn}:Props) => {
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
          if (
            (loggedIn && page.showWhenLoggedIn) || 
            (!loggedIn && !page.showWhenLoggedIn)) {
            return (
              <Link to={page.path} key={page.name}>
                <Box>{page.name}</Box>
              </Link>
            );
          } else {
            return null;
          }
        })}
      </Box>
    </Box>
  );
}

export default Header;
