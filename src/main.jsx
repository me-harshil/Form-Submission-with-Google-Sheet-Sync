import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import App from './App.jsx'
import Form from './Form.jsx';
import './index.css'
import Listing from './Listing.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
  },
  {
    path: "form/:formType",
    element: <Form />,
  },
  {
    path: "/listing",
    element: <Listing />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
