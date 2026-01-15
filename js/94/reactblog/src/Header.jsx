import './Header.css';

export default function Header() {
  return (
    <header>
      <h1>PCS Blog</h1>
      <h2 id="title"></h2>
      <nav>
        <ul>
          <li>
            <a id="home" href="#">blogs</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
