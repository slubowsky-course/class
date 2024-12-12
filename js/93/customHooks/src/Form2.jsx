
import useForm from './useForm';

export default function Form2() {
  const [state, setState] = useForm({
      password: '',
      email: 'donald@whitehouse.gov'
    });

  return (
    <div>
      password: <input name="password" value={state.password} onChange={setState} type="password" />
      email: <input name="email" value={state.email} onChange={setState} type="email" />
    </div>
  )
}
