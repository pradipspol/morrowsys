import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { features, repoUrl } from '../data/focuskube';

export default function ProductsPage() {
  useDocumentMeta(
    "MorrowSys — Systems for what's next",
    "MorrowSys builds focused tools for modern infrastructure. FocusKube is a free, open-source Kubernetes cluster explorer and operations console."
  );

  const heroFeatures = features.slice(0, 3);

  return (
    <>
      <section id="product" className="section">
        <div className="label">01 / PRODUCT</div>
        <div className="two-col">
          <div className="product-card-heading">
            <div className="product-header">
              <img src="https://raw.githubusercontent.com/pradipspol/focusKube/main/platform/desktop/assets/icons/app512.png" alt="FocusKube" className="product-icon" />
              <h2><span>Focus</span><span className="kube">Kube</span></h2>
            </div>
            <p className="lead">Deep visibility into your Kubernetes clusters.</p>
            <p className="body">FocusKube brings cluster exploration and day-to-day operations into one focused experience - topology, live logs, metrics, events, Helm, YAML, terminals, and multi-cluster workflows.</p>            
            <div className="home-release-link">
              <Link className="link" to="/focuskube">Open the FocusKube landing page</Link>
            </div>
          </div>
          <div className="product-card">
            <div className="card-top"><span>FOCUSKUBE</span><span>WHY IT EXISTS</span></div>
            <ul className="home-feature-list">
              {heroFeatures.map((feature) => (
                <li key={feature.title}>
                  <i className={`icon bi ${feature.icon}`} />
                  <div>
                    <strong>{feature.title}</strong>
                    <span>{feature.description}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="card-bottom">
              <Link className="btn primary readme-project-link-button" to="/focuskube">Explore FocusKube →</Link>
              <a className="btn primary readme-project-link-button" href={repoUrl} target="_blank" rel="noopener">View project on GitHub →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div>
          <p className="eyebrow">START WITH FOCUS</p>
          <h2>See what&apos;s happening<br /><span>inside your kubernetes clusters.</span></h2>
        </div>
        <Link className="btn primary" to="/focuskube">Try FocusKube</Link>
      </section>
    </>
  );
}
