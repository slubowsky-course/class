import './App.css';
import Header from './Header';
import BlogList from './BlogList';
import { useState } from 'react';
import Blog from './Blog';

function App() {
  const [selectedBlog, setSelectedBlog] = useState();

  return (
    <>
      <Header setSelectedBlog={setSelectedBlog} />
      {!selectedBlog && <BlogList setSelectedBlog={setSelectedBlog} />}

      {selectedBlog && <Blog blog={selectedBlog} />}
    </>
  )
}

export default App
