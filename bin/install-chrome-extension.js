#!/usr/bin/env node

const { installChromeExtension } = require('../lib/installer');
const os = require('os');

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Usage: chromeextensioninstaller <extension-id> [extension-name]');
  console.error('');
  console.error('Arguments:');
  console.error('  extension-id    - The Chrome/Chromium extension ID (required)');
  console.error('  extension-name  - A friendly name for the extension (optional)');
  console.error('');
  console.error('Example:');
  console.error('  chromeextensioninstaller jfeammnjpkecdekppnclgkkffahnhfhe "React DevTools"');
  process.exit(1);
}

const extensionId = args[0];
const extensionName = args[1] || extensionId;

if (os.platform() !== 'linux') {
  console.error('Error: This tool only works on Linux systems');
  process.exit(1);
}

console.log(`Installing Chrome extension: ${extensionName} (${extensionId})...`);
const success = installChromeExtension(extensionId, extensionName);

if (!success) {
  console.error('Make sure you are running this with appropriate permissions (may require sudo)');
  process.exit(1);
}

console.log(`\nChrome extension installation completed!`);
