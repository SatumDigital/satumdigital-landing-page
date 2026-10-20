// Renders scripts/og.html to static/og.png (1200x630) with headless Chrome.
// The logo comes from the brand kit next to this repo: ../SatumDigital Brandkit/Web.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
].find((p) => fs.existsSync(p));
if (!CHROME) throw new Error('Chrome not found');

const out = path.join(ROOT, 'static', 'og.png');
execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--window-size=1200,630', '--virtual-time-budget=8000', '--allow-file-access-from-files',
    `--screenshot=${out}`, pathToFileURL(path.join(ROOT, 'scripts', 'og.html')).href,
], { stdio: 'ignore' });
console.log('wrote', path.relative(ROOT, out), fs.statSync(out).size, 'bytes');
