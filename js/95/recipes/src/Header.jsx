import React from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header>
      <h1>PCS Recipes</h1>
      <Navbar />
    </header>
  )
}
