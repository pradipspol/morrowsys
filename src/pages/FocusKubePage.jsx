import React from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import {
  repoUrl,
  releaseAssets,
  features,
  differentiators,
  docs,
  contributingSteps,
  faqs,
  testimonials,
  FOCUSKUBE_RELEASE_VERSION
} from '../data/focuskube';

const SUB_NAV = [
  { href: '#features', label: 'Features' },
  { href: '#download', label: 'Download' },
  { href: '#docs', label: 'Docs' },
  { href: '#contributing', label: 'Contributing' },
  { href: '#privacy-and-license', label: 'Privacy & License' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#faq', label: 'FAQ' },
];

export default function FocusKubePage() {
  useDocumentMeta(
    'FocusKube — Deep visibility into your Kubernetes clusters',
    'FocusKube is a free, open-source, self-hosted alternative to Lens and K9s for Azure AKS, AWS EKS, and local kubeconfig clusters.'
  );

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const imagesRef = useIntersectionObserver();
  const featuresRef = useIntersectionObserver();
  const diffRef = useIntersectionObserver();
  const downloadRef = useIntersectionObserver();
  const docsRef = useIntersectionObserver();
  const contributingRef = useIntersectionObserver();
  const faqRef = useIntersectionObserver();
  const privacyAndLicenseRef = useIntersectionObserver();
  const testimonialsRef = useIntersectionObserver();

  const firstUrl = releaseAssets[0]?.browser_download_url;

  return (
    <>
      {/* <section className="hero focus-hero">
        <div className="glow a" />
        <div className="grid" />
        <div className="hero-inner">
          <h1>FocusKube</h1>
          <h2>Deep Visibility <br /><span>into your Kubernetes cluster.</span></h2>
        </div>
      </section> */}

      <section className="hero focus-hero">
        <div className="glow a" />
        <div className="grid" />
        {/* <img src="/assets/toplogy.png" alt="FocusKube Topology" className="hero-topology-image" /> */}
        <div className="hero-inner">
          <p className="eyebrow">FOCUSKUBE</p>
          {/* <h1>FocusKube</h1>
          <h2>Deep Visibility <br /><span>into your Kubernetes cluster.</span></h2> */}
          <h1>Explore clusters<br /><span>without losing context.</span></h1>
          <p className="hero-copy">A free, open-source, self-hosted alternative to Lens and K9s — topology, live logs, metrics, events, Helm, YAML, terminals, and multi-cluster workflows for Azure AKS, AWS EKS, and local kubeconfig clusters.</p>
          <div className="actions">
            <a className="btn primary" href="#" onClick={(e) => scrollToSection(e, 'download')}>Download FocusKube</a>
            <a className="btn secondary" href={repoUrl} target="_blank" rel="noopener">View on GitHub</a>
          </div>
          <div className="trust-bar">
            <span className="trust-pill">Apache-2.0</span>
            <span className="trust-pill">Zero telemetry</span>
            <span className="trust-pill">Windows · macOS · Linux</span>
          </div>
        </div>
      </section>


      <nav className="subnav">
        {SUB_NAV.map((item) => (
          <a key={item.href} href="#" onClick={(e) => scrollToSection(e, item.href.slice(1))}>{item.label}</a>
        ))}
      </nav>

      <section ref={imagesRef} className="section images-showcase">
        <div className="images-container">
          <img src="/assets/app.png" alt="FocusKube App Interface" className="showcase-image" />
          <img src="/assets/toplogy.png" alt="FocusKube Topology" className="showcase-image" />
        </div>
      </section>

      <section ref={featuresRef} id="features" className="section">
        <div className="label">01 / FEATURES</div>
        <h2>Everything you need<br /><span>for day-to-day operations.</span></h2>
        <div className="feature-grid feature-grid-full">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <i className={`icon bi ${feature.icon}`} />
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={diffRef} className="section border">
        <div className="label">02 / WHY FOCUSKUBE</div>
        <h2>Built different<br /><span>from Lens and K9s.</span></h2>
        <div className="diff-grid">
          {differentiators.map((item) => (
            <article className="diff-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section ref={downloadRef} id="download" className="section border">
        <div className="label">03 / DOWNLOAD</div>
        <div className="two-col">
          <div>
            <h2>Get FocusKube<br /><span>on your platform.</span></h2>
            <p className="lead">Version {FOCUSKUBE_RELEASE_VERSION}</p>
            <p className="body">Direct download links from the latest GitHub release. Prefer checksums or older builds? Browse the full releases page.</p>
            <div className="home-release-link">
              <a className="link" href={`${repoUrl}/releases`} target="_blank" rel="noopener">Browse all releases →</a>
            </div>
          </div>
          <div className="product-card">
            <div className="card-top"><span>FOCUSKUBE</span><span>RELEASE ASSETS</span></div>
            <div className="download-grid" aria-live="polite">
              {releaseAssets.length ? releaseAssets.map((asset) => {
                const platform = asset.platform;
                return (
                  <a key={asset.name} href={asset.browser_download_url} className={`download-item ${platform.kind}`} target="_blank" rel="noopener" title={asset.name}>
                    <i className={`icon bi ${platform.icon}`} />
                    <strong>{platform.label}</strong>
                    <small>{platform.detail}</small>
                  </a>
                );
              }) : <div className="download-item download-item-fallback"><span className="icon">📦</span><strong>No installer</strong><small>Asset data unavailable</small></div>}
            </div>
            <div className="card-bottom">{firstUrl ? 'Direct download links from the latest GitHub release' : 'Installer links are unavailable right now'}</div>
          </div>
        </div>
      </section>

      <section ref={docsRef} id="docs" className="section border">
        <div className="label">04 / DOCUMENTATION</div>
        <h2>Read the guides<br /><span>before you dive in.</span></h2>
        <div className="docs-grid">
          {docs.map((doc) => (
            <a className="docs-card" key={doc.title} href={doc.href} target="_blank" rel="noopener">
              <h4>{doc.title}</h4>
              <p>{doc.description}</p>
              <span className="link">Read more →</span>
            </a>
          ))}
        </div>
      </section>

      <section ref={contributingRef} id="contributing" className="section border">
        <div className="label">05 / CONTRIBUTING</div>
        <div className="two-col">
          <div>
            <h2>Help build<br /><span>the open-source console.</span></h2>
            <p className="lead">FocusKube is Apache-2.0 licensed and open to contributions.</p>
            <p className="body">The project is split into a backend (Express + Kubernetes API), a frontend (React + Vite), and an Electron desktop wrapper. Here's how to get set up.</p>
            <div className="home-release-link">
              <a className="link" href={`${repoUrl}/blob/main/DEVELOPMENT.md`} target="_blank" rel="noopener">Read the full development guide →</a>
            </div>
            <div className="home-release-link">
              <a className="link" href={`${repoUrl}/issues`} target="_blank" rel="noopener">Browse open issues →</a>
            </div>
          </div>
          <ol className="contributing-steps">
            {contributingSteps.map((step, index) => (
              <li key={step.title}>
                <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section ref={privacyAndLicenseRef} id="privacy-and-license" className="section border">
        <div className="label">06 / PRIVACY & LICENSE</div>
        <h2>Privacy & License<br /><span>understand our policies.</span></h2>
        <p className="body">FocusKube respects your privacy and is licensed under the Apache-2.0 license.</p>
        <div className="iframe-container">
          <div className="iframe-wrapper">
            <h3>Privacy Policy</h3>
            <iframe
              src={`https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/PRIVACY.md`}
              title="Privacy Policy"
              className="policy-iframe"
              sandbox="allow-same-origin"
            />
          </div>
          <div className="iframe-wrapper">
            <h3>License</h3>
            <iframe
              src={`https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/LICENSE`}
              title="License"
              className="policy-iframe"
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      </section>

      <section ref={testimonialsRef} id="testimonials" className="section border">
        <div className="label">06 / TESTIMONIALS</div>
        <h2>Early days<br /><span>be one of our first users.</span></h2>
        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <span className="quote-mark">
              <p>”{testimonial.quote}”</p>
              </span>
            </div>
          ))}
        </div>
        <div className="home-release-link">
          <a className="link" href={`${repoUrl}/discussions`} target="_blank" rel="noopener">Try FocusKube and share your feedback →</a>
        </div>
      </section>

      <section ref={faqRef} id="faq" className="section border">
        <div className="label">07 / FAQ</div>
        <h2>Frequently asked<br /><span>questions.</span></h2>
        <div className="faq-list">
          {faqs.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta">
        <div>
          <p className="eyebrow">START WITH FOCUS</p>
          <h2>See what&apos;s happening<br /><span>inside your kubernetes clusters.</span></h2>
        </div>
        <a className="btn primary" href="#" onClick={(e) => scrollToSection(e, 'download')}>Download FocusKube</a>
      </section>
    </>
  );
}
