import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { BrowserRouter, Routes, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router';
import About from './About';
import ContactUs from './ContactUs';
import Home from './home';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<App />>
          <Route index={true} element=<Home /> />
          <Route path="/about" element=<About /> />
          <Route path="/contactUs" element=<ContactUs /> />
          <Route path="*" element=<h2>404</h2> />
        </Route>
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)

/*const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element=<App />>
      <Route index={true} element=<Home /> />
      <Route path="/about" element=<About /> />
      <Route path="/contactUs" element=<ContactUs /> />
    </Route>
  )
);*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //errorElement: <h2>error</h2>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contactUs",
        element: <ContactUs />
      },
      {
        path: "*",
        element: <h2>404</h2>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
