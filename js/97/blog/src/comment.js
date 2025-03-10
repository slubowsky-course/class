import './css/comment.css';
import { createElement } from './utils';

function createComment(comment) {
  const { email, body } = comment;
  const postElem = createElement(`<div class="comment">
             <div class="body">${body}</div>
             <div class="email">${email}</div>
          </div>`);

  postElem.find('button').on('click', () => {
    console.log('load comments here');
  });

  return postElem;
}

export default async function loadComments(id) {
  let content;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const comments = await response.json();
    content = comments.map(post => createComment(post));
  }
  catch (e) {
    content = `<div class="error">Failed to load blog - ${e.message}</div>`;
  }

  return content;
}
