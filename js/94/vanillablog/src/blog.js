import { createElement } from './utils';
import './css/blog.css';
import setPage from './page';
import { load } from './utils';
import loadComments from './comments';

function createPost(post) {
  const { id, title, body } = post;

  let commentsShowing;

  const p = createElement(`<div class="post">
    <div class="title">${title}</div>
    <div class="body">${body}</div>
    <div class="comments-area">
      <div class="comments">
      </div>
      <button>show comments</button>
    </div>
  </div>`);

  const commentDiv = p.find('.comments');
  const button = p.find('button').on('click', async () => {
    if (commentsShowing) {
      commentDiv.slideUp('slow', () => commentDiv.empty());
    } else {
      const comments = await loadComments(id);
      commentDiv.append(comments);
      commentDiv.slideDown('fast');
    }
    commentsShowing = !commentsShowing;
    button.text(`${commentsShowing ? 'hide' : 'show'} comments`);
  });

  return p;
}

export default async function loadBlog(blog) {
  /*let content;

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${blog.id}`,
    );

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const blog = await response.json();

    content = blog.map(post => createPost(post)).join('');
  } catch (e) {
    // console.error(e);
    content = `<div class="error">${e.message} - Failed to load blog ${id}</div>`;
  }*/

  setPage({ title: `${blog.name}'s blog`, content: 'loading...' });
  const content = await load(
    `https://jsonplaceholder.typicode.com/posts?userId=${blog.id}`,
    createPost,
  ); // ?.join('');

  setPage({ title: `${blog.name}'s blog`, content });
}
