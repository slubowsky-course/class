import { useEffect, useState } from "react"
import BlogInfo from "./BlogInfo";

export default function BlogList(props) {
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      setError();
      setBlogs();

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', { signal: abortController.signal });

        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }

        const theBlogs = await response.json();
        setBlogs(theBlogs);
      } catch (e) {
        console.error(e);

        if (!e.name === 'AbortError') {
          setError(e);
        }
      } finally {
        setLoading(false);
      }

      return () => {
        abortController.abort();
      }
    })();
  }, []);

  return (
    <>
      {loading && <div>loading...</div>}
      {error && <div>oops {error.message}</div>}
      {blogs?.map(blog => <BlogInfo key={blog.id} blog={blog} />)}
    </>
  )
}
