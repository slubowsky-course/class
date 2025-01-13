import { useState } from 'react';
import './App.css'
import BlogList from './BlogList'
import Header from './Header'
import Blog from './Blog';

export default function App() {
  const [selectedBlog, setSelectedBlog] = useState();

  return (
    <>
      <Header selectedBlog={selectedBlog} setSelectedBlog={setSelectedBlog} />

      {!selectedBlog && <BlogList setSelectedBlog={setSelectedBlog} />}

      {selectedBlog && <Blog id={selectedBlog.id} />}
    </>
  )
}
