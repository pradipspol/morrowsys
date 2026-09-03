import { chromium } from 'playwright';
const out = 'D:/Users/prapol/AppData/Local/Temp/claude/d--projects-github-repos-morrowsys/5608a3bf-782b-457c-8a18-8567062fb394/scratchpad';
const browser = await chromium.launch();

// Light theme
const light = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await light.emulateMedia({ colorScheme: 'light' });
await light.goto('http://localhost:5173/', { waitUntil: 'load' });
await light.waitForTimeout(800);
await light.screenshot({ path: `${out}/light-home.png`, fullPage: true });

await light.goto('http://localhost:5173/#/focuskube', { waitUntil: 'load' });
await light.waitForTimeout(800);
await light.screenshot({ path: `${out}/light-focuskube.png`, fullPage: true });

// Dark theme (should still work)
const dark = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await dark.emulateMedia({ colorScheme: 'dark' });
await dark.goto('http://localhost:5173/', { waitUntil: 'load' });
await dark.waitForTimeout(800);
await dark.screenshot({ path: `${out}/dark-home-v2.png`, fullPage: true });

console.log('Light and dark theme screenshots created');
await browser.close();
