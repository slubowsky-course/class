import './App.css';
import Header from './Header';
import BlogList from './BlogList';
import { useState } from 'react';

function App() {
  const [selectedBlog, setSelectedBlog] = useState();

  return (
    <>
      <Header />
      <BlogList setSelectedBlog={setSelectedBlog} />

      {JSON.stringify(selectedBlog)}
    </>
  )
}

export default App
