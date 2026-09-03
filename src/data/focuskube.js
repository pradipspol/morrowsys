export const repoOwner = 'pradipspol';
export const repoName = 'focusKube';
export const repoUrl = `https://github.com/${repoOwner}/${repoName}`;
export const FOCUSKUBE_RELEASE_VERSION = '0.1.1-1';
const RELEASE_DOWNLOAD_BASE = `${repoUrl}/releases/download/v${FOCUSKUBE_RELEASE_VERSION}`;

export const STATIC_RELEASE_ASSETS = [
  { name: 'FocusKube-0.1.1-1-arm64-mac.zip', browser_download_url: `${RELEASE_DOWNLOAD_BASE}/FocusKube-0.1.1-1-arm64-mac.zip` },
  { name: 'FocusKube-0.1.1-1-arm64.dmg', browser_download_url: `${RELEASE_DOWNLOAD_BASE}/FocusKube-0.1.1-1-arm64.dmg` },
  { name: 'FocusKube-Setup-0.1.1-1.AppImage', browser_download_url: `${RELEASE_DOWNLOAD_BASE}/FocusKube-Setup-0.1.1-1.AppImage` },
  { name: 'FocusKube-Setup-0.1.1-1.deb', browser_download_url: `${RELEASE_DOWNLOAD_BASE}/FocusKube-Setup-0.1.1-1.deb` },
  { name: 'FocusKube-Setup-0.1.1-1.exe', browser_download_url: `${RELEASE_DOWNLOAD_BASE}/FocusKube-Setup-0.1.1-1.exe` },
  { name: 'FocusKube-Setup-0.1.1-1.msi', browser_download_url: `${RELEASE_DOWNLOAD_BASE}/FocusKube-Setup-0.1.1-1.msi` }
];

export function classifyAsset(name) {
  const lower = (name || '').toLowerCase();
  if (lower.includes('.exe') || lower.includes('.msi')) return { label: 'Windows', icon: 'bi-windows', kind: 'windows', detail: lower, order: 0 };
  if (lower.includes('.dmg') || lower.includes('-mac.zip')) return { label: 'macOS', icon: 'bi-apple', kind: 'mac', detail: lower, order: 1 };
  if (lower.includes('.deb') || lower.includes('.appimage') || lower.includes('.rpm')) return { label: 'Linux', icon: 'bi-ubuntu', kind: 'linux', detail: lower, order: 2 };
  return null;
}

export const releaseAssets = STATIC_RELEASE_ASSETS
  .map((asset) => ({ ...asset, platform: classifyAsset(asset.name) }))
  .filter((asset) => asset.platform)
  .sort((a, b) => (a.platform.order !== b.platform.order ? a.platform.order - b.platform.order : a.name.localeCompare(b.name)));

export const features = [
  {
    icon: 'bi-diagram-3',
    title: 'Multi-cluster management',
    description: 'Connect simultaneously to Azure AKS, AWS EKS, and local kubeconfig contexts. Pin the ones you use most, with cached auth-checking to minimize cloud API calls.'
  },
  {
    icon: 'bi-broadcast',
    title: 'Live streaming, everywhere',
    description: 'WebSocket channels for pod logs, multi-pod log tailing, exec terminals, port-forwarding, and resource watches — lists update live via Kubernetes watch informers.'
  },
  {
    icon: 'bi-share',
    title: 'Topology & dependency graphs',
    description: 'Interactive, auto-laid-out graphs connecting Deployments, StatefulSets, Pods, Services, and Ingresses. Filter by application or namespace, pan and zoom to explore.'
  },
  {
    icon: 'bi-clock-history',
    title: 'Event recording & observability',
    description: 'Recording sessions capture workload changes and Kubernetes Events with automatic 72-hour retention by default, plus timeline replay and a correlation dashboard.'
  },
  {
    icon: 'bi-boxes',
    title: 'Full Helm lifecycle',
    description: 'Manage repositories, install charts, and upgrade releases with a diff viewer that shows manifest changes before you apply — plus history and rollback.'
  },
  {
    icon: 'bi-terminal',
    title: 'Sandboxed terminal',
    description: 'A built-in kubectl/Helm terminal that rejects shell pipes, logs every command for auditability, and keeps a separate RBAC-gated terminal for exec-into-pod.'
  },
  {
    icon: 'bi-code-square',
    title: 'YAML editor',
    description: 'Edit and create resources with a full-featured code editor, sample manifests, multi-namespace filtering, and customizable table columns.'
  },
  {
    icon: 'bi-shield-lock',
    title: 'Privacy-first by design',
    description: 'Zero telemetry, no cloud account or login required, and air-gapped environments are fully supported.'
  }
];

export const differentiators = [
  {
    title: 'Self-hosted, not SaaS',
    description: 'Runs on your machine or your own infrastructure. Nothing about your clusters is routed through a third-party service.'
  },
  {
    title: 'No cloud login required',
    description: 'Point it at a kubeconfig and go. There is no account to create and no vendor identity to federate against.'
  },
  {
    title: 'Multi-cloud in one workspace',
    description: 'Azure AKS, AWS EKS, and local clusters sit side by side instead of forcing you into separate tools per provider.'
  },
  {
    title: 'Air-gapped ready',
    description: 'Zero telemetry and no required outbound calls mean it works in disconnected or tightly locked-down environments.'
  }
];

export const docs = [
  {
    title: 'Getting started',
    description: 'Install the desktop app, connect a cluster, and take the first tour of topology, logs, and Helm.',
    href: `${repoUrl}/blob/main/docs/HOW_TO_USE.md`
  },
  {
    title: 'Development setup',
    description: 'Backend, frontend, and desktop project structure, environment variables, and local run commands.',
    href: `${repoUrl}/blob/main/DEVELOPMENT.md`
  },
  {
    title: 'Privacy',
    description: 'What FocusKube does and does not collect, and how it behaves in air-gapped environments.',
    href: `${repoUrl}/blob/main/PRIVACY.md`
  },
  {
    title: 'License',
    description: 'FocusKube is free and open source under the Apache License 2.0.',
    href: `${repoUrl}/blob/main/LICENSE`
  }
];

export const contributingSteps = [
  {
    title: 'Fork and clone',
    description: `Fork ${repoOwner}/${repoName} on GitHub, then clone your fork locally.`
  },
  {
    title: 'Install dependencies',
    description: 'Node.js and npm are required, along with access to a Kubernetes cluster or a saved kubeconfig for testing.'
  },
  {
    title: 'Run it locally',
    description: 'Start the backend (Express + Kubernetes API) on port 4000 and the frontend (React + Vite) on port 5173 in separate terminals.'
  },
  {
    title: 'Branch and build your change',
    description: 'Work on a focused branch. Use the typecheck and build commands before opening a pull request.'
  },
  {
    title: 'Open a pull request',
    description: `Push your branch and open a PR against ${repoOwner}/${repoName}'s main branch. Contributions are welcomed under the Apache-2.0 license.`
  }
];

export const faqs = [
  {
    question: 'Is FocusKube free?',
    answer: 'Yes. FocusKube is free and open source under the Apache License 2.0 — you can read, modify, and redistribute the source on GitHub.'
  },
  {
    question: 'Which clusters does it support?',
    answer: 'Azure AKS, AWS EKS, and local kubeconfig contexts — and you can connect to several of them at once from the same workspace.'
  },
  {
    question: 'Does it collect telemetry or require a cloud login?',
    answer: 'No. FocusKube has zero telemetry, needs no account or cloud login, and is built to run in air-gapped environments.'
  },
  {
    question: 'What platforms can I install it on?',
    answer: 'Windows (.exe / .msi), macOS (.dmg, including Apple Silicon), and Linux (.deb / .AppImage).'
  },
  {
    question: 'Is the built-in terminal a raw shell?',
    answer: 'No. It is a sandboxed kubectl/Helm terminal that rejects shell pipes and logs every command for auditability. Exec-into-pod uses a separate, RBAC-gated terminal.'
  },
  {
    question: 'How do I start contributing?',
    answer: `Fork ${repoOwner}/${repoName}, follow the development setup guide, and open a pull request — see the Contributing section above.`
  }
];

export const testimonials = [
  {
    quote: "We replaced Lens and K9s across our entire team. FocusKube's topology view saved us hours debugging multi-service failures — seeing the whole dependency graph at once is a game-changer."
  },
  {
    quote: "The fact that it runs completely offline with zero telemetry was critical for our compliance requirements. We deployed it in an air-gapped environment without any headaches. No vendor lock-in, just pure control."
  },
  {
    quote: "Managing three Kubernetes clusters across different providers used to mean switching between three different tools. Now I have everything in one workspace. The Helm diff viewer alone has prevented multiple deployment disasters."
  }
];
