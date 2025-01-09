import React, { useState } from 'react'

interface SearchProps {
  style: React.CSSProperties
}

export default function Search(props: SearchProps) {
  const [term, setTerm] = useState<string>();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
  }

  return (
    <div style={props.style}>Search:
      <input value={term} onChange={handleSearch} />
    </div>
  )
}
