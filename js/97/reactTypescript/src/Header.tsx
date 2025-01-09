import React from 'react'

interface HeaderProps {
  children: string
}

export default function Header(props: HeaderProps) {
  return (
    <div>Header {props.children}</div>
  )
}
