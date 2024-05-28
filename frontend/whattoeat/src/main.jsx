import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './login.jsx';
import './index.css';

import { 
  createBrowserRouter, 
  RouterProvider 
} from "react-router-dom";

import Login from './login.jsx';
import SignUp from './signup.jsx';
import Recipe from './recipe.jsx';
import Contact from './contact.jsx';
import AddRecipe from './addrecipe.jsx';
import ViewRecipe from './viewrecipe.jsx';

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
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/recipe",
    element: <Recipe />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/addrecipe/:id",
    element: <AddRecipe />
  },
  {
    path: "/viewrecipe/:id",
    element: <ViewRecipe />
}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
