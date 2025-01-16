import Post from './Post';
import { Link, useLoaderData } from 'react-router';

export default function Blog() {
  const posts = useLoaderData();

  return (
    <>
      {posts?.map(p => <Post key={p.id} post={p} />)}

      <Link to="/blog/foo/5">see this great blog!</Link>
      <br />
      <Link to="/blog/bar/6">Also see this other great blog!</Link>
    </>
  )
}

/*export /*async* / function loader(routingData) {
  const { id } = routingData.params;

  /*try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    return await response.json();
  }
  catch (e) {
    console.error(e);
  }* /

  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
}*/
