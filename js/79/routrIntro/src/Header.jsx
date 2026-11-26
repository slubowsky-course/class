
import React from 'react'
import { Link } from 'react-router'

export default function Header() {
  return (
    <header><h1>PCS App</h1>

      <Link to="/aboutUs">about us</Link> | <Link to="/contactUs">contact us</Link>
    </header>
  )
}
