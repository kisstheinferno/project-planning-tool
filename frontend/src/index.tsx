import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Projects from "./Pages/Projects";
import Profile from "./Pages/Profile";
import axios from 'axios';
import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/log-in",
        element: <Login />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
          // get a token from local storage
          const token = localStorage.getItem("token");
          // if we have a token well use it as a bearer token on our request for user data
          if (token) {
            try {
              const response = await axios.get("http://localhost:3005/auth/profile", 
                { headers: { Authorization: `Bearer ${token}`} } 
              );
              return response.data;
            } catch (error) {
              // if we have an expired token, we will show an error toast and redirect the user to the login page
              toast({
                title: 'An error occurred.',
                description: 'You must be signed in to view this page!',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
              return redirect("/log-in");
            }
          } else {
            toast({
              title: 'An error occurred.',
              description: 'You must have accout to view this page!',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
            return redirect("/sign-up");
          }
          // if we dont have a token, it will show error toast and we will redirect to the login page
        }
      }
    ]
  }
])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <ToastContainer />
    <RouterProvider router={router} />
  </>
);
