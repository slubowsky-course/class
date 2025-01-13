import './BlogInfo.css';

export default function BlogInfo(props) {
  const { blog, setSelectedBlog } = props;
  const { id, name, website, company: { name: companyName, catchPhrase } } = blog;

  return (
    <div className="blog" onClick={() => setSelectedBlog(blog)}>
      <div className="title">{name}</div>
      <div className="website">{website}</div>
      <div className="company">
        <div>{companyName}</div>
        <div>{catchPhrase}</div>
      </div>
    </div>
  )
}

// add prop types
