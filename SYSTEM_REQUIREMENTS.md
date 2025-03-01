# System Requirements for DevOps Journey

This document outlines the system requirements for developing and running the DevOps Journey project.

## Automatic Setup

We provide a setup script that automatically installs all required dependencies. To use it, run:

```bash
# Using the Makefile (recommended)
make setup

# Or directly
./setup.sh
```

The setup script will:
1. Detect your operating system
2. Install or update Node.js to the required version
3. Install pnpm package manager
4. Install project dependencies

The script supports the following operating systems:
- Debian/Ubuntu
- Fedora
- RHEL/CentOS
- Arch Linux
- macOS
- Windows (limited support, may require manual installation)

## Manual Setup

If you prefer to set up your environment manually, you'll need:

### Required Software

1. **Node.js** - Version 16.0 or higher
   - Download from: https://nodejs.org/
   - Verify with: `node -v`

2. **npm** - Usually comes with Node.js
   - Verify with: `npm -v`
   
3. **pnpm** (recommended) or yarn
   - Install with: `npm install -g pnpm`
   - Verify with: `pnpm -v`

### Optional Software

1. **Docker** - For containerized development and deployment
   - Download from: https://www.docker.com/get-started
   - Verify with: `docker -v`

## Project Setup

After installing the required software, set up the project:

```bash
# Clone the repository
git clone https://github.com/ismoilovdevml/devops-journey.git
cd devops-journey

# Install dependencies
npm install --legacy-peer-deps
# or with pnpm
pnpm install

# Start development server
npm run dev
# or with pnpm
pnpm dev
```

## Troubleshooting

### Permission Issues

If you encounter permission issues when installing global packages, try:

```bash
# Using sudo (Linux/macOS)
sudo npm install -g pnpm

# Or configure npm to use a different directory
npm config set prefix ~/.npm
export PATH="$HOME/.npm/bin:$PATH"
# Add the export line to your .bashrc or .zshrc
```

### Node.js Version Issues

If you have an older version of Node.js and can't update it system-wide, consider using a version manager:

- **nvm** (Node Version Manager): https://github.com/nvm-sh/nvm
- **n** (Node version management): https://github.com/tj/n

### Docker Issues

If you're having trouble with Docker, ensure:
1. Docker daemon is running: `sudo systemctl start docker`
2. Your user is in the docker group: `sudo usermod -aG docker $USER`
3. You've logged out and back in after adding yourself to the docker group

## Additional Information

For more details on project setup and development, see:
- [README.md](README.md) - General project information
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute to the project
- [IMPROVEMENTS.md](IMPROVEMENTS.md) - Recent improvements to the project
