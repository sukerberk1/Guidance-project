import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './routes/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children: [
      {
        path: "home/",
        element: <HomePage/>
      },
      // {
      //   path: "trending/",
      //   element: <LoginPage/>
      // },
      // {
      //   path: "search/",
      //   element: <LoginPage/>
      // },
      {
        path: "login/",
        element: <LoginPage/>
      },
      {
        path: "register/",
        element: <RegisterPage/>
      }
    ]
  }
]);
root.render(
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
);
