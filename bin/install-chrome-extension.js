#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: chromeextensioninstaller <extension-id> <extension-name>');
  console.error('');
  console.error('Arguments:');
  console.error('  extension-id    - The Chrome/Chromium extension ID');
  console.error('  extension-name  - A friendly name for the extension');
  console.error('');
  console.error('Example:');
  console.error('  npx chromeextensioninstaller abcdefghijklmnopqrstuvwxyz123456 "My Extension"');
  process.exit(1);
}

const extensionId = args[0];
const extensionName = args[1];

// Check if running on Linux
if (os.platform() !== 'linux') {
  console.error('Error: This tool only works on Linux systems');
  process.exit(1);
}

// Check if running with appropriate permissions
const installerScript = path.join(__dirname, '..', 'lib', 'installer.sh');

try {
  // Make the script executable
  execSync(`chmod +x "${installerScript}"`);

  // Run the installer with the provided arguments
  console.log(`Installing Chrome extension: ${extensionName} (${extensionId})...`);
  execSync(`bash "${installerScript}"`, {
    stdio: 'inherit',
    env: { ...process.env }
  });

  // Call the installation function with the extension ID
  execSync(`bash -c 'source "${installerScript}" && install_chrome_extension "${extensionId}" "${extensionName}"'`, {
    stdio: 'inherit'
  });

  console.log(`\nChrome extension installation completed!`);
} catch (error) {
  console.error(`Error: Failed to install Chrome extension`);
  console.error('Make sure you are running this with appropriate permissions (may require sudo)');
  process.exit(1);
}
