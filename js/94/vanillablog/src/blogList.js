import './css/blogList.css';
import loadBlog from './blog';
import setPage from './page';
import { createElement, load } from './utils';

function createBlog(blog) {
  const {
    // id,
    name,
    website,
    company: { name: companyName, catchPhrase },
  } = blog;

  return createElement(`<div class="blog">
    <img src="foo" style="display: none" onerror="alert('russian hacker stealing info here')" />
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

export default async function loadBlogs() {
  /*let content;
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const blogs = await response.json();

    content = blogs.map(blog => createBlog(blog)); //.join('');
  } catch (e) {
    // console.error(e);
    content = `<div class="error">${e.message} - Failed to load blogs</div>`;
  }*/

  setPage({ title: 'Blog List', content: 'loading...' });
  const content = await load(
    'https://jsonplaceholder.typicode.com/users',
    createBlog,
  );

  setPage({ title: 'Blog List', content });
}

/*let content;
export default async function loadBlogs() {
  let theContent;

  try {
    if (!content) {
      const response = await fetch(
        'https://xjsonplaceholder.typicode.com/users',
      );

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      content = await response.json();
    }

    theContent = content.map(blog => createBlog(blog));
  } catch (e) {
    // console.error(e);
    theContent = `<div class="error">${e.message} - Failed to load blogs</div>`;
  }

  setPage({ title: 'Blog List', content: theContent });
}*/
