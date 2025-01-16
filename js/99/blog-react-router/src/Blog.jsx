import { useEffect, useState } from 'react'
import Post from './Post';
import { Link, useParams } from 'react-router';
import ErrorPage from './ErrorPage';

export default function Blog() {
  const { id } = useParams();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      setError();
      setPosts();

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, {signal: abortController.signal});
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const posts = await response.json();
        setPosts(posts);
      }
      catch (e) {
        console.error(e);
        if (! e.name === 'AbortError') {
          setError(e.message ?? e);
        }
      }
      setLoading(false);
    })();

    return () => {
      abortController.abort();
    }
  }, [id])

  return (
    <>
      {loading && <h5>Loading....</h5>}
      {error && <ErrorPage error={error} />}
      {posts?.map(p => <Post key={p.id} post={p} />)}

      <Link to="/blog/foo/5">see this great blog!</Link>
      <br/>
      <Link to="/blog/bar/6">Also see this other great blog!</Link>
    </>
  )
}
