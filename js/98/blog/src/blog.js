import loadComments from './comment';
import './css/blog.css';
import setPage from "./page";
import { createElement } from './utils';


function createPost(post) {
  let comments;
  let commentsShowing = false;

  const { title, body } = post;
  const postElem = createElement(`<div class="post">
             <div class="title">${title}</div>
             <div class="body">${body}</div>
             <div class="commentsArea">
              <button>show comments</button>
              <div class="comments">
              </div>
             </div>
          </div>`);

  const commentsElem = postElem.find('.comments');
  postElem.find('button').on('click', async function () {
    if (!commentsShowing) {
      if (!comments) {
        comments = await loadComments(post.id);
        commentsElem.append(comments);
      }
      // commentsElem.append(comments);
      commentsElem.slideDown('fast');
    } else {
      // commentsElem.empty();
      commentsElem.slideUp('slow');
    }
    commentsShowing = !commentsShowing;
    this.innerText = `${!commentsShowing ? 'show' : 'hide'} comments`;
  });

  return postElem;
}

let abortController;
export default async function loadBlog(blog) {
  if (abortController) {
    abortController.abort('load canceled');
  }
  abortController = new AbortController();

  const { id, name } = blog;
  let content;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, { signal: abortController.signal });
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const posts = await response.json();

    content = posts.map(post => createPost(post));
  }
  catch (e) {
    console.error(e);
    //if (e.name === 'AbortError') {
    if (e === 'load canceled') {
      console.log(`Aborted load of blog ${blog.id}`);
      return;
    }
    content = `<div class="error">Failed to load blog - ${e.message}</div>`;
  }

  setPage({
    title: `${name}'s Blog`,
    content
  });
}
