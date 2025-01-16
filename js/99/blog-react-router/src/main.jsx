import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router';
import BlogList from './BlogList'
import Blog/*, { loader }*/ from './Blog2';
import App from './App.jsx'
import ErrorPage from './ErrorPage.jsx';

/*createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<BlogList />} />
        <Route path="/blog/:name/:id" element={<Blog />} />
        <Route path="*" element={<div>404... This is not the blog you are looking for...</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
)*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <BlogList />
      },
      {
        path: '/blog/:name/:id',
        element: <Blog />,
        // loader: loader
        loader: ({params: {id}}) => fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`),
        errorElement: <ErrorPage />
      },
      {
        path: '*',
        element: <div>404... This is not the blog you are looking for...</div>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
