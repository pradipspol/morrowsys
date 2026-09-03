import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { features, repoUrl } from '../data/focuskube';

export default function HomePage() {
  useDocumentMeta(
    "MorrowSys — Systems for what's next",
    "MorrowSys builds focused tools for modern infrastructure. FocusKube is a free, open-source Kubernetes cluster explorer and operations console."
  );

  const principlesRef = useIntersectionObserver();
  const aboutRef = useIntersectionObserver();
  const ctaRef = useIntersectionObserver();

  const heroFeatures = features.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="glow a" />
        <div className="grid" />
        <div className="hero-inner">
          <p className="eyebrow">MorrowSys</p>
          <h1>Systems for<br /><span>what&apos;s next.</span></h1>
          <p className="hero-copy">We build focused software for engineers working with increasingly complex systems.</p>
          <div className="actions">
            <Link className="btn primary" to="/focuskube">Try FocusKube</Link>
            <a className="btn secondary" href="#products">View product</a>
          </div>
          {/* <div className="trust-bar">
            <span className="trust-pill">Apache-2.0</span>
            <span className="trust-pill">Zero telemetry</span>
            <span className="trust-pill">Windows · macOS · Linux</span>
          </div> */}
        </div>
      </section>

      {/* <section id="product" className="section">
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
              <a className="btn primary readme-project-link-button" href={repoUrl} target="_blank" rel="noopener">View project on GitHub →</a>
            </div>
          </div>
        </div>
      </section> */}

      <section ref={principlesRef} id="principles" className="section border">
        <div className="label">02 / PRINCIPLES</div>
        <h2>Complex systems<br /><span>deserve clarity.</span></h2>
        <div className="principles">
          <article><small>01</small><h3>Focus</h3><p>Surface the information that matters without burying engineers in noise.</p></article>
          <article><small>02</small><h3>Context</h3><p>Connect resources, events, signals, and relationships so problems make sense faster.</p></article>
          <article><small>03</small><h3>Control</h3><p>Move from understanding to action without jumping between a dozen tools.</p></article>
        </div>
      </section>

      <section ref={aboutRef} id="about" className="section border">
        <div className="label">03 / MORROWSYS</div>
        <div className="two-col">
          <h2>Building the tools<br />engineers <span>need next.</span></h2>
          <div>
            <p className="lead">MorrowSys is an independent technology company focused on developer, infrastructure, and systems software.</p>
            <p className="body">Our products start with real engineering problems: make complex environments easier to see, understand, and operate. FocusKube is the first step.</p>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="cta">
        <div>
          <p className="eyebrow">START WITH FOCUS</p>
          <h2>See what&apos;s happening<br /><span>inside your kubernetes clusters.</span></h2>
        </div>
        <Link className="btn primary" to="/focuskube">Try FocusKube</Link>
      </section>
    </>
  );
}
