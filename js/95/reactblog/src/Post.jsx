import { useState } from 'react';
import './post.css';
import Comment from './Comment';

export default function Post(props) {
  const { id, title, body } = props.post;
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [comments, setComments] = useState();

  function toggleComments() {
    if (comments) {
      setComments();
    } else {
      loadComments();
    }
  }

  let abortController;
  async function loadComments() {
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();

    setLoading(true);
    setError();
    setComments();

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`, { signal: abortController.signal });

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      const theComments = await response.json();
      setComments(theComments);
    } catch (e) {
      console.error(e);

      if (!e.name === 'AbortError') {
        setError(e);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="post">
      <div className="title">{title}</div>
      <div className="body">{body}</div>
      <div className="comments-area">
        <div className={'comments ' + (comments ? '' : 'closed')}>
          {loading && <div>loading...</div>}
          {error && <div>oops {error.message}</div>}
          {comments?.map(comment => <Comment key={comment.id} comment={comment} />)}
        </div>
        <button onClick={toggleComments}>{comments ? 'hide' : 'show'} comments</button>
      </div>
    </div>
  )
}
