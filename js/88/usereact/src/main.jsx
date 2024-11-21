import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root')).render(

    <App />

)

/*function formatName(person) {
  //return `${person.first} ${person.last}`;
  if (person) {
    return <h5>{`${person.first} ${person.last}`}</h5>
  } else {
    return <h5 className="error">please login</h5>;
  }
}

const potus = { first: "Joe", last: "Biden" };

//root.render(<h1>Hello {`${potus.first} ${potus.last}`}</h1>);

setInterval(() => {
  root.render(
    <div>
      Hello {formatName()}
      <h1>{new Date().toLocaleTimeString()}</h1>
    </div>
  );
}, 1000);*/
