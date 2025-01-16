import React, { useEffect, useState } from 'react'
import Comment from './Comment';

export default function Comments(props) {
  const { id } = props;
  const [comments, setComments] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const comments = await response.json();
        setComments(comments);
      }
      catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  return (
    <>
      {comments?.map(c => <Comment key={c.id} comment={c}/>)}
    </>
  )
}
