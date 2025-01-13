import { useEffect, useState } from 'react'
import BlogInfo from './BlogInfo';

export default function BlogList(props) {
  const { setSelectedBlog } = props;

  const [blogs, setBlogs] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const blogList = await response.json();
        setBlogs(blogList);
      }
      catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <>
      {blogs?.map(b => <BlogInfo key={b.id} blog={b} setSelectedBlog={setSelectedBlog} />)}
    </>
  )
}
