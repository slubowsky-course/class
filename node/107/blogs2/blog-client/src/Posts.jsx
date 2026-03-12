import React from 'react'
import { useEffect } from 'react'

export default function Posts() {
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8080/posts');
        if (! response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const posts = await response.json();
        console.log(posts);
      } catch(e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div>Posts</div>
  )
}
