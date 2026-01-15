import './css/comments.css';
import { load } from './utils';

function createComment(comment) {
  const { email, body } = comment;

  return `<div class="comment">
    <div class="body">${body}</div>
    <div class="email">${email}</div>
  </div>`;
}

export default async function loadComments(postId) {
  const comments = (
    await load(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
      createComment,
    )
  )?.join('');

  return comments;
}
