import { useState } from 'react'
import './App.css'
import Recipe, { recipeLoader } from './Recipe'
import { Suspense } from 'react';
import { Component } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  const [id, setId] = useState(1);

  const recipePromise = recipeLoader(10);

  return (
    <>
      <input value={id} onChange={e => setId(e.target.value)} />

      <ErrorBoundary fallbackRender={error => <div>oops...{error.toString()}</div>}>
        <Suspense fallback={<div>loading...</div>}>
          <Recipe recipePromise={recipePromise} />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

/* <ErrorBoundary fallback={<div>oops...</div>}> */
/*class ErrorBoundary extends Component {
  state = {hasError: false};

  static getDerivedStateFromError() { return { hasError: true } }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}*/

export default App
