#!/bin/bash

install_chrome_extension () {
  local extension_id="$1"
  local extension_name="$2"
  local pref_file_path

  # Try Google Chrome first
  if [ -d "/opt/google/chrome/extensions" ]; then
    pref_file_path="/opt/google/chrome/extensions/${extension_id}.json"
  # Then try Chromium
  elif [ -d "/etc/chromium/extensions" ]; then
    pref_file_path="/etc/chromium/extensions/${extension_id}.json"
  # Create Chrome path by default
  else
    pref_file_path="/opt/google/chrome/extensions/${extension_id}.json"
  fi

  local preferences_dir_path="$(dirname "$pref_file_path")"
  local upd_url="https://clients2.google.com/service/update2/crx"

  mkdir -p "$preferences_dir_path"
  echo "{" > "$pref_file_path"
  echo "  \"external_update_url\": \"$upd_url\"" >> "$pref_file_path"
  echo "}" >> "$pref_file_path"
  echo "Added \"$pref_file_path\" [$extension_name]"
}

# Check for Chrome or Chromium
if ! which "google-chrome" >/dev/null 2>&1 && ! which "chromium" >/dev/null 2>&1 && ! which "chromium-browser" >/dev/null 2>&1 ; then
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub \
  | sudo apt-key add -
  echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' \
  | sudo tee /etc/apt/sources.list.d/google-chrome.list
  sudo apt-get update
  sudo apt install google-chrome-stable
else
  if which "google-chrome" >/dev/null 2>&1; then
    echo "Chrome already installed"
  elif which "chromium" >/dev/null 2>&1 || which "chromium-browser" >/dev/null 2>&1; then
    echo "Chromium already installed"
  fi
fi
