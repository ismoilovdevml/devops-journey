#!/bin/bash

# DevOps Journey Setup Script
# This script installs all required dependencies for the DevOps Journey project

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print colored message
print_message() {
  echo -e "${GREEN}$1${NC}"
}

print_warning() {
  echo -e "${YELLOW}$1${NC}"
}

print_error() {
  echo -e "${RED}$1${NC}"
}

# Check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Detect OS
detect_os() {
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    if command_exists apt-get; then
      OS="debian"
    elif command_exists dnf; then
      OS="fedora"
    elif command_exists yum; then
      OS="rhel"
    elif command_exists pacman; then
      OS="arch"
    else
      OS="linux-other"
    fi
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
  elif [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    OS="windows"
  else
    OS="unknown"
  fi
}

# Check if version is at least the minimum required
check_version() {
  local current=$1
  local required=$2
  
  # Extract version numbers
  local current_version=$(echo $current | sed 's/[^0-9.]//g')
  
  # Compare major version
  local current_major=$(echo $current_version | cut -d. -f1)
  local required_major=$(echo $required | cut -d. -f1)
  
  if [ $current_major -lt $required_major ]; then
    return 1
  elif [ $current_major -gt $required_major ]; then
    return 0
  fi
  
  # Compare minor version
  local current_minor=$(echo $current_version | cut -d. -f2)
  local required_minor=$(echo $required | cut -d. -f2)
  
  if [ $current_minor -lt $required_minor ]; then
    return 1
  fi
  
  return 0
}

# Install Node.js and npm
install_node() {
  local REQUIRED_NODE_VERSION="16.0"
  
  if command_exists node; then
    NODE_VERSION=$(node -v)
    
    if check_version "$NODE_VERSION" "$REQUIRED_NODE_VERSION"; then
      print_message "Node.js $NODE_VERSION is already installed (minimum required: $REQUIRED_NODE_VERSION)"
    else
      print_warning "Node.js $NODE_VERSION is installed, but version $REQUIRED_NODE_VERSION or higher is required"
      print_message "Attempting to update Node.js..."
      
      case $OS in
        debian)
          curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
          sudo apt-get install -y nodejs
          ;;
        fedora)
          sudo dnf install -y nodejs
          ;;
        rhel)
          curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
          sudo yum install -y nodejs
          ;;
        arch)
          sudo pacman -S nodejs npm
          ;;
        macos)
          if command_exists brew; then
            brew upgrade node
          else
            print_warning "Homebrew not found. Installing Homebrew first..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            brew install node
          fi
          ;;
        windows)
          print_warning "On Windows, please update Node.js manually from https://nodejs.org/"
          ;;
        *)
          print_error "Unsupported OS. Please update Node.js manually from https://nodejs.org/"
          ;;
      esac
      
      NODE_VERSION=$(node -v)
      print_message "Node.js updated to $NODE_VERSION"
    fi
  else
    print_message "Installing Node.js..."
    
    case $OS in
      debian)
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
        ;;
      fedora)
        sudo dnf install -y nodejs
        ;;
      rhel)
        curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
        sudo yum install -y nodejs
        ;;
      arch)
        sudo pacman -S nodejs npm
        ;;
      macos)
        if command_exists brew; then
          brew install node
        else
          print_warning "Homebrew not found. Installing Homebrew first..."
          /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
          brew install node
        fi
        ;;
      windows)
        print_warning "On Windows, please install Node.js manually from https://nodejs.org/"
        print_warning "After installation, run this script again."
        exit 1
        ;;
      *)
        print_error "Unsupported OS. Please install Node.js manually from https://nodejs.org/"
        exit 1
        ;;
    esac
    
    NODE_VERSION=$(node -v)
    print_message "Node.js $NODE_VERSION has been installed"
  fi
}

# Install pnpm
install_pnpm() {
  if command_exists pnpm; then
    PNPM_VERSION=$(pnpm --version)
    print_message "pnpm $PNPM_VERSION is already installed"
  else
    print_message "Installing pnpm..."
    
    # Try to install globally first
    if npm install -g pnpm 2>/dev/null; then
      print_message "pnpm installed globally"
    else
      # If global install fails, try with sudo
      print_warning "Global installation failed. Trying with sudo..."
      if command_exists sudo; then
        sudo npm install -g pnpm
      else
        print_error "Cannot install pnpm globally. Please run 'sudo npm install -g pnpm' manually."
        # Install locally as fallback
        print_warning "Installing pnpm locally as a fallback..."
        npm install pnpm --no-save
        export PATH="$PWD/node_modules/.bin:$PATH"
      fi
    fi
    
    if command_exists pnpm; then
      PNPM_VERSION=$(pnpm --version)
      print_message "pnpm $PNPM_VERSION has been installed"
    else
      print_warning "pnpm installation may have failed. You can install it manually with 'sudo npm install -g pnpm'"
    fi
  fi
}

# Install Yarn
install_yarn() {
  if command_exists yarn; then
    YARN_VERSION=$(yarn --version)
    print_message "Yarn $YARN_VERSION is already installed"
  else
    print_message "Installing Yarn..."
    
    # Try to install globally first
    if npm install -g yarn 2>/dev/null; then
      print_message "Yarn installed globally"
    else
      # If global install fails, try with sudo
      print_warning "Global installation failed. Trying with sudo..."
      if command_exists sudo; then
        sudo npm install -g yarn
      else
        print_error "Cannot install yarn globally. Please run 'sudo npm install -g yarn' manually."
        # Install locally as fallback
        print_warning "Installing yarn locally as a fallback..."
        npm install yarn --no-save
        export PATH="$PWD/node_modules/.bin:$PATH"
      fi
    fi
    
    if command_exists yarn; then
      YARN_VERSION=$(yarn --version)
      print_message "Yarn $YARN_VERSION has been installed"
    else
      print_warning "Yarn installation may have failed. You can install it manually with 'sudo npm install -g yarn'"
    fi
  fi
}

# Install project dependencies
install_project_dependencies() {
  print_message "Installing project dependencies..."
  
  # Check if package.json exists
  if [ ! -f "package.json" ]; then
    print_error "package.json not found. Are you in the project directory?"
    return 1
  fi
  
  # Try to install dependencies with pnpm first
  if command_exists pnpm; then
    print_message "Using pnpm to install dependencies..."
    if pnpm install; then
      print_message "Project dependencies installed successfully with pnpm!"
      return 0
    else
      print_warning "pnpm install failed. Falling back to npm..."
    fi
  else
    print_warning "pnpm not found. Using npm instead..."
  fi
  
  # Fallback to npm if pnpm fails or is not available
  if npm install --legacy-peer-deps; then
    print_message "Project dependencies installed successfully with npm!"
    return 0
  else
    print_error "Failed to install project dependencies. Please check the error messages above."
    return 1
  fi
}

# Main function
main() {
  print_message "=== DevOps Journey Setup ==="
  print_message "This script will install all required dependencies for the DevOps Journey project."
  
  # Detect OS
  detect_os
  print_message "Detected OS: $OS"
  
  # Install Node.js and npm
  install_node
  
  # Install pnpm (primary package manager)
  install_pnpm
  
  # Install project dependencies
  install_project_dependencies
  
  print_message "=== Setup Complete ==="
  print_message "You can now run 'make dev' to start the development server."
  print_message "The project uses pnpm as the primary package manager."
}

# Run the main function
main
