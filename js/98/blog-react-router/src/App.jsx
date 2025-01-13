import './App.css'
import BlogList from './BlogList'
import Header from './Header'
import Blog from './Blog';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>
            <Header />

            <Outlet />
          </>}>
            <Route index element={<BlogList />} />

            <Route path="/blog/:name/:id" element={<Blog />} />

            {/*<Route path="/foo" element={<div>foo</div>} />*/}

            <Route path="*" element={<div>404... This is not the blog you are looking for...</div>} />
          </Route>

          {/*<Route path="/foo" element={<div>foo</div>} />*/}
          {/*<Route path="*" element={<div>404... This is not the blog you are looking for...</div>} />*/}

        </Routes>
      </BrowserRouter>


    </>
  )
}
