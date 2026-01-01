import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { BrowserRouter, Routes, Route, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router';
import AboutUs from './AboutUs.jsx';
import ContactUs from './ContactUs.jsx';
import Home from './Home.jsx';
import PageNotFound from './PageNotFound.jsx';
import Error from './Error.jsx';

/*createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />}>
            <Route index element={<h1>Im A</h1>} />
            <Route path="b" element={<h1>Im B</h1>} />
          </Route>
          {/*<Route path="*" element={<PageNotFound />} />* /}
          {/*<Route path="*" element={<Navigate to="/" replace />} />* /}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)*/

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/aboutUs',
        element: <AboutUs />
      },
      {
        path: '/contactUs',
        element: <ContactUs />,
        children: [
          {
            path: 'a',
            element: <h1>A</h1>
          },
          {
            path: 'b',
            element: <h1>B</h1>
          }
        ]
      },
      {
        path: '*',
        element: <PageNotFound />
        //element: <Navigate to="/" />
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
