import React from 'react';
import { Link } from 'react-router-dom';
import { repoUrl } from '../data/focuskube';

export default function Footer() {
  return (
    <footer>
      <div>
        <strong>MorrowSys</strong>
        {/* <small>Systems for what&apos;s next.</small> */}
      </div>
      <div className="footer-links">
        {/* <Link to="/focuskube">FocusKube</Link> */}
        {/* <Link to="/focuskube#docs">Docs</Link> */}
        {/* <Link to="/focuskube#contributing">Contributing</Link> */}
        {/* <a href={repoUrl} target="_blank" rel="noopener">GitHub</a> */}
        <a href={`${repoUrl}/blob/main/PRIVACY.md`} target="_blank" rel="noopener">Privacy</a>
        <a href="mailto:morrowsys@gmail.com">Contact</a>
      </div>
      <small>© 2026 MorrowSys</small>
    </footer>
  );
}
