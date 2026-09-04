import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Brand() {
  return (
    <Link className="brand" to="/">
      <img src="/assets/morrowsys-mark.svg" alt="" />
      MorrowSys
    </Link>
  );
}

export default function Header() {
  return (
    <header className="nav">
      <Brand />
      <nav>
        <NavLink to="/products">Products</NavLink>
        <a href="https://blogs.morrowsys.com" target="_blank" rel="noopener">Blog</a>
      </nav>
    </header>
  );
}
