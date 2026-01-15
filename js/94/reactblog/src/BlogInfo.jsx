import './BlogInfo.css';

export default function BlogInfo(props) {
  const { blog, setSelectedBlog } = props;
  const {
    // id,
    name,
    website,
    company: { name: companyName, catchPhrase },
  } = props.blog;

  return (<div class="blog" onClick={() => setSelectedBlog(blog)}>
    <div class="title">{name}</div>
    <div class="website">{website}</div>
    <div class="company">
      <div>{companyName}</div>
      <div>{catchPhrase}</div>
    </div>
  </div>);
}
