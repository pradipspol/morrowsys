import React, { useState, useEffect } from 'react';

export function PolicyModal({ isOpen, title, filePath, onClose, repoOwner, repoName }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`)
      .then(res => res.json())
      .then(data => {
        if (data.content) {
          const decoded = atob(data.content);
          setContent(decoded);
        } else {
          setError('Could not load file');
        }
      })
      .catch(err => {
        setError('Failed to fetch content');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [isOpen, filePath, repoOwner, repoName]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">
          {loading && <div className="modal-loading">Loading...</div>}
          {error && <div className="modal-error">{error}</div>}
          {content && <pre className="policy-content">{content}</pre>}
        </div>
      </div>
    </div>
  );
}
