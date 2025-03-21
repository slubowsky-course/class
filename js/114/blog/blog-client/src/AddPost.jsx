import './AddPost.css';
import useForm from './useForm';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

export default function AddPost({ setError }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useForm({
    title: '',
    body: ''
  })
  async function submit(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`${response.status} - ${msg ?? response.statusText}`);
      }

      navigate('/');
    } catch (e) {
      console.error(e);

      setError(e.message);
    }
  }

  return (
    <form id="addPostForm" onSubmit={submit}>
      <label>title: <input name="title" required value={formData.title} onChange={setFormData} minLength="3" maxLength="30"/></label>
      <label>post
        <textarea name="body" required value={formData.body} onChange={setFormData} minLength="3" maxLength="3000"></textarea></label>
      <button>add post</button>
    </form>
  )
}

AddPost.propTypes = {
  setError: PropTypes.func.isRequired
};
