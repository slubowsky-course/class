import { Link } from 'react-router';
import './BlogInfo.css';

export default function BlogInfo(props) {
  const { blog } = props;
  const { id, name, website, company: { name: companyName, catchPhrase } } = blog;

  return (
    <Link to={`/blog/${name}/${id}`} className="blog">
      <div className="title">{name}</div>
      <div className="website">{website}</div>
      <div className="company">
        <div>{companyName}</div>
        <div>{catchPhrase}</div>
      </div>
    </Link>
  )
}

// add prop types
