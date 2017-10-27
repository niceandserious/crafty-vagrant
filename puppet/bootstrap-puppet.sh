#!/usr/bin/env bash
#
# Make sure Puppet is installed
#

# Exit if any line fails:
set -e

if [ "$(id -u)" != "0" ]; then
  echo "This script must be run as root." >&2
  exit 1
fi

if which puppet > /dev/null 2>&1 && apt-cache policy | grep --quiet apt.puppetlabs.com; then
  echo "Puppet is already installed."
  exit 0
fi

# Do the initial apt-get update
echo "Initial apt-get update..."
apt-get update >/dev/null

# Install Puppet
echo "Installing Puppet..."
apt-get install --yes puppet >/dev/null

echo "Puppet installed!"
