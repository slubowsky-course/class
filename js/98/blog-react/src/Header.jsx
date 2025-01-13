import './Header.css';

export default function Header(props) {
  const { selectedBlog, setSelectedBlog } = props;

  return (
    <>
      <header>
        <h1>PCS Blogs</h1>
        <h2>{selectedBlog ? `${selectedBlog.name}'s blog` : ''}</h2>
        <nav>
          <ul>
            <li><a href="#" onClick={() => setSelectedBlog()}>blogs</a></li>
          </ul>
        </nav>
      </header>

      <hr />
    </>
  )
}
