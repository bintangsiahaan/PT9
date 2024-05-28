import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './login.jsx';

import { 
  createBrowserRouter, 
  RouterProvider 
} from "react-router-dom";

import Login from './login.jsx';
import SignUp from './signup.jsx';
import Recipe from './recipe.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/recipe",
    element: <Recipe />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)