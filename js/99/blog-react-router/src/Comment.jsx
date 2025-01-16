import './Comment.css';

export default function Comment(props) {
  const { body, email } = props.comment;

  return (
    <div className="comment">
      <div className="body">{body}</div>
      <div className="email">{email}</div>
    </div>
  )
}
