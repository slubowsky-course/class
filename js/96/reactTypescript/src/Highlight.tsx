import React, { ReactElement } from 'react'

interface HighlightProps {
  children: ReactElement[]
}

export default function Highlight(props: HighlightProps) {
  return (
    <div style={{backgroundColor: 'yellow'}}>
      {props.children}
    </div>
  )
}
