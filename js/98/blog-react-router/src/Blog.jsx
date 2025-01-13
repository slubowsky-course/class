import { useEffect, useState } from 'react'
import Post from './Post';
import { useParams } from 'react-router';

export default function Blog() {
  const { id } = useParams();
  const [posts, setPosts] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const posts = await response.json();
        setPosts(posts);
      }
      catch (e) {
        console.error(e);
      }
    })();
  }, [id])

  return (
    <>
      {posts?.map(p => <Post key={p.id} post={p} />)}
    </>
  )
}
