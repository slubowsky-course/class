import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import Buy from './Buy';
import Sell from './Sell';
import Home from './Home';
import PageNotFound from './PageNotFound';
import Error from './Error';

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
        path: '/buy',
        element: <Buy />
      },
      {
        path: '/sell',
        element: <Sell />
      },
      {
        path: '/*',
        element: <PageNotFound />
        //element: <Navigate to="/" replace={true} />
      }
    ]
  }
]);

/*createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} errorElement={<Error />}>
          <Route index={true} element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="*" element={<PageNotFound />} />
          {/*<Route path="*" element={<Navigate to="/" replace={true} />} />* /}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);*/

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
