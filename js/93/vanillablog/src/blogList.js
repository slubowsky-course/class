import './blogList.css';
import setPage from './page';

function createBlog(blog) {
  const {
    name,
    website,
    company: { name: companyName, catchPhrase },
  } = blog;

  return `<div class="blog">
    <div class="title">${name}</div>
    <div class="website">${website}</div>
    <div class="company">
      <div>${companyName}</div>
      <div>${catchPhrase}</div>
    </div>
  </div>`;
}

export default async function loadBlogs() {
  let content;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const blogs = await response.json();

    content = blogs.map(blog => createBlog(blog));
  } catch (e) {
    // console.error(e);
    content = `<div class="error">${e.message} - Failed to load blogs</div>`;
  }

  setPage({ title: 'Blog List', content });
}
