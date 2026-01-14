const { execSync } = require('child_process');
const path = require('path');

function installChromeExtension(extensionId, extensionName) {
  const installerScript = path.join(__dirname, 'installer.sh');

  try {
    execSync(`chmod +x "${installerScript}"`);
    execSync(`bash -c 'source "${installerScript}" && install_chrome_extension "${extensionId}" "${extensionName}"'`, {
      stdio: 'inherit'
    });
    return true;
  } catch (error) {
    console.error('Error installing extension:', error.message);
    return false;
  }
}

module.exports = { installChromeExtension };
