import loadBlog from './blog';
import './css/blogList.css';
import setPage from "./page";
import { createElement } from './utils';

function createBlog(blog) {
  const { name, website, company: { name: companyName, catchPhrase } } = blog;

  // <img src="foo" style="display: none;" onerror="alert('Youve been hacked!')">

  return createElement(`<div class="blog">
            <div class="title">${name}</div>
            <div class="website">${website}</div>
            <div class="company">
              <div>${companyName}</div>
              <div>${catchPhrase}</div>
            </div>
          </div>`).on('click', () => {
    loadBlog(blog);
  });
}

let blogList;
export default async function loadBlogs() {
  let content;
  try {
    if (!blogList) {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      blogList = await response.json();
    }
    content = blogList.map(blog => createBlog(blog));/*.join('')*/;
  }
  catch (e) {
    content = `<div class="error">Failed to load blogs - ${e.message}</div>`;
  }

  setPage({
    title: 'Blog List',
    content
  });
}
