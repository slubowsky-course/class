import { useState } from 'react';
import './Post.css';
import Comments from './Comments';

export default function Post(props) {
  const { title, body, id } = props.post;
  const [commentsShowing, setCommentsShowing] = useState();

  return (
    <div className="post">
      <div className="title">{title}</div>
      <div className="body">{body}</div>
      <div className="commentsArea">
        <button onClick={() => setCommentsShowing(!commentsShowing)}>{commentsShowing ? 'Hide' : 'Show'} comments</button>
        <div className={`comments ${commentsShowing ? '' : 'closed'}`}>
          <Comments id={id} />
        </div>
      </div>
    </div>
  )
}
