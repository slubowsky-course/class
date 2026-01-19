import React, { useEffect, useState } from 'react'
import Post from './Post';

export default function Blog(props) {
  const { id } = props.blog;
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      setError();
      setPosts();

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }

        const thePosts = await response.json();
        setPosts(thePosts);
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
  }, [id]);

  return (
    <>
      {loading && <div>loading...</div>}
      {error && <div>oops {error.message}</div>}
      {posts?.map(post => <Post key={post.id} post={post} />)}
    </>
  )
}
