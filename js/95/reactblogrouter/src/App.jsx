import './App.css';
import Header from './Header';
import BlogList from './BlogList';
import Blog from './Blog';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>
          <Header />

          <Outlet />
        </>}>

          <Route index element={<BlogList />} />

          <Route path="blog/:name/:id" element={<Blog  />} />

          <Route path="*" element={<div>404.. This is not the blog you are looking for</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
