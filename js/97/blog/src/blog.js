import loadComments from './comment';
import './css/blog.css';
import setPage from "./page";
import { createElement } from './utils';

function createPost(post) {
  const {title, body} = post;
  const postElem = createElement(`<div class="post">
             <div class="title">${title}</div>
             <div class="body">${body}</div>
             <div class="comments">
              <button>show comments</button>
             </div>
          </div>`);

    const commentsElem = postElem.find('.comments');
    postElem.find('button').on('click', async () => {
      const comments = await loadComments(post.id);
      commentsElem.append(comments);
    });

    return postElem;
}

export default async function loadBlog(blog) {
  const {id, name} = blog;
  let content;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const posts = await response.json();
    content = posts.map(post => createPost(post));
  }
  catch (e) {
    content = `<div class="error">Failed to load blog - ${e.message}</div>`;
  }

  setPage({
    title: `${name}'s Blog`,
    content
  });
}
