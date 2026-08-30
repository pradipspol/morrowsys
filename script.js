const repoOwner = 'pradipspol';
const repoName = 'focusKube';
const RELEASE_API_URL = `https://api.github.com/repos/${repoOwner}/${repoName}/releases`;
const README_API_URL = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/README.md`;
const assetContainer = document.getElementById('release-assets');
const statusElement = document.getElementById('release-status');
const releaseVersionTag = document.getElementById('release-version-tag');
const readmeContent = document.getElementById('readme-content');
const refreshButton = document.getElementById('refresh-release-assets');
const downloadButtons = [
  document.getElementById('download-latest-button'),
  document.getElementById('readme-download-button'),
  document.getElementById('cta-download-button'),
  document.getElementById('footer-download-button')
].filter(Boolean);

function classifyAsset(name) {
  const lower = (name || '').toLowerCase();
  if (lower.includes('.exe') || lower.includes('.msi')) return { label: 'Windows', icon: 'bi-windows', kind: 'windows', detail: lower, order: 0 };
  if (lower.includes('.dmg') || lower.includes('-mac.zip')) return { label: 'macOS', icon: 'bi-apple', kind: 'mac', detail: lower, order: 1 };
  if (lower.includes('.deb')) return { label: 'Linux', icon: 'bi-ubuntu', kind: 'linux', detail: lower, order: 2 };
  if (lower.includes('.appimage')) return { label: 'Linux', icon: 'bi-ubuntu', kind: 'linux', detail: lower, order: 2 };
  if (lower.includes('.rpm')) return { label: 'Linux', icon: 'bi-redhat', kind: 'linux', detail: lower, order: 2 };
  return null;
}

function renderFallbackAssetButton() {
  const fallback = document.createElement('div');
  fallback.className = 'download-item download-item-fallback';
  fallback.innerHTML = '<span class="icon">📦</span><strong>No installer</strong><small>Asset data unavailable</small>';
  assetContainer.innerHTML = '';
  assetContainer.appendChild(fallback);
}

function updateButtonsWithLatestUrl(url) {
  downloadButtons.forEach((button) => {
    if (!url) {
      button.disabled = true;
      button.style.opacity = '0.55';
      button.style.cursor = 'not-allowed';
      button.title = 'No installer download available right now';
      button.onclick = null;
      return;
    }

    button.disabled = false;
    button.style.opacity = '1';
    button.style.cursor = 'pointer';
    button.title = 'Download the latest installer';
    button.onclick = () => {
      window.open(url, '_blank', 'noopener');
    };
  });
}

function renderAssets(assets, versionLabel) {
  const validAssets = (assets || [])
    .filter((asset) => asset && asset.browser_download_url && asset.name)
    .map((asset) => ({ ...asset, platform: classifyAsset(asset.name) }))
    .filter((asset) => asset.platform);

  if (releaseVersionTag) {
    if (versionLabel && !versionLabel.startsWith('v')) {
      versionLabel = `v${versionLabel}`;
    }
    releaseVersionTag.textContent = versionLabel ? `${versionLabel}` : 'RELEASE ASSETS';
  }

  if (!validAssets.length) {
    statusElement.textContent = 'No installer assets were found in the latest release.';
    renderFallbackAssetButton();
    updateButtonsWithLatestUrl(null);
    return;
  }

  const sortedAssets = validAssets.slice().sort((a, b) => {
    if (a.platform.order !== b.platform.order) return a.platform.order - b.platform.order;
    return a.name.localeCompare(b.name);
  });
  const firstUrl = sortedAssets[0].browser_download_url;

  assetContainer.innerHTML = '';

  sortedAssets.forEach((asset) => {
    const platform = asset.platform;
    const item = document.createElement('a');
    item.href = asset.browser_download_url;
    item.className = `download-item ${platform.kind}`;
    item.target = '_blank';
    item.rel = 'noopener';
    item.title = asset.name;
    item.innerHTML = `<i class="icon bi ${platform.icon}"></i><strong>${platform.label}</strong><small>${platform.detail}</small>`;
    assetContainer.appendChild(item);
  });

  statusElement.textContent = `Latest release assets available to download.`;
  updateButtonsWithLatestUrl(firstUrl);
}

function extractBadgeHtml(markdown) {
  const badgeMatches = [...markdown.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)];
  const badges = badgeMatches
    .map((match) => {
      let url = match[1];
      // If URL is relative, convert to GitHub raw content URL
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${url}`;
      }
      return url;
    })
    .filter((url) => /shields.io|badge|app512|icon|platform/i.test(url))
    .slice(0, 4);

  if (!badges.length) return '';
  return `<div class="readme-badges">${badges.map((src) => `<img src="${src}" alt="FocusKube badge">`).join('')}</div>`;
}

function convertImageUrls(html) {
  // Replace all relative image src attributes with GitHub raw URLs
  return html.replace(/src="(?!https?:\/\/)([^"]+)"/g, (match, path) => {
    const url = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${path}`;
    return `src="${url}"`;
  });
}

function buildReadmeSummary(markdown) {
  if (!markdown) return '<p>No README content available.</p>';

  const clean = markdown.replace(/\r/g, '');
  const titleMatch = clean.match(/^#\s+.*$/m);
  const title = titleMatch ? titleMatch[0].replace(/^#\s+/, '').replace(/\*\*/g, '') : 'FocusKube';

  const introSection = clean.split(/##\s+Why\s+\*\*FocusKube\*\*/i)[0];
  const introParagraphs = introSection
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter((block) => block && !block.startsWith('#') && !block.startsWith('![') && !block.startsWith('---'))
    .slice(0, 2);

  const featureBlocks = [];
  const featureMatch = clean.match(/##\s+Features\s*\n([\s\S]*?)(?=\n##\s+|$)/i);
  if (featureMatch) {
    const featureText = featureMatch[1];
    const sections = featureText.split(/\n###\s+/).slice(1);
    sections.forEach((section) => {
      const lines = section.split('\n').map((line) => line.trim()).filter(Boolean);
      const heading = lines.shift();
      const bullets = lines.filter((line) => line.startsWith('- ')).map((line) => line.replace(/^-\s*/, ''));
      if (heading && bullets.length) {
        featureBlocks.push({ heading, bullets });
      }
    });
  }

  const featureCards = featureBlocks.slice(0, 3).map((feature) => `
    <div class="feature-card">
      <h4>${feature.heading.replace(/\*\*/g, '')}</h4>
      <ul>${feature.bullets.slice(0, 3).map((bullet) => `<li>${bullet.replace(/\*\*/g, '')}</li>`).join('')}</ul>
    </div>
  `).join('');

  const introHtml = introParagraphs.length
    ? introParagraphs.map((paragraph) => `<p>${paragraph.replace(/\*\*/g, '').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')}</p>`).join('')
    : '<p>FocusKube provides deep visibility into Kubernetes clusters with live activity, topology, and operations tooling.</p>';

  return `
    <div class="readme-summary">
      <div class="readme-header-block">
        <h3>${title}</h3>
        ${extractBadgeHtml(clean)}
      </div>
      <div class="readme-intro">${introHtml}</div>
      <div class="feature-grid">${featureCards}</div>
      <div class="readme-project-link">
        <a class="btn primary readme-project-link-button" href="https://github.com/${repoOwner}/${repoName}" target="_blank" rel="noopener">View project on GitHub →</a>
      </div>
    </div>
  `;
}

async function loadReadme() {
  if (!readmeContent) return;

  try {
    const response = await fetch(README_API_URL, {
      headers: {
        Accept: 'text/plain, text/markdown, */*'
      }
    });

    if (!response.ok) {
      throw new Error('README fetch failed');
    }

    const content = await response.text();
    let summary = buildReadmeSummary(content);
    // Convert any remaining relative image URLs to GitHub URLs
    summary = convertImageUrls(summary);
    readmeContent.innerHTML = summary;
  } catch (error) {
    readmeContent.innerHTML = '<p>README could not be loaded from GitHub right now.</p>';
  }
}

async function loadLatestReleaseAssets() {
  statusElement.textContent = 'Loading latest installers…';
  try {
    const response = await fetch(RELEASE_API_URL, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      throw new Error('Release request failed');
    }

    const releases = await response.json();
    const latestRelease = Array.isArray(releases) ? releases.find((release) => !release.draft && !release.prerelease) || releases[0] : null;

    if (!latestRelease) {
      throw new Error('No published releases found');
    }

    renderAssets(latestRelease.assets || [], latestRelease.tag_name || latestRelease.name || 'latest');
  } catch (error) {
    statusElement.textContent = 'Unable to load release assets right now. Please try again.';
    if (releaseVersionTag) {
      releaseVersionTag.textContent = 'RELEASE ASSETS';
    }
    renderFallbackAssetButton();
    updateButtonsWithLatestUrl(null);
  }
}

refreshButton?.addEventListener('click', loadLatestReleaseAssets);
loadReadme();
loadLatestReleaseAssets();
