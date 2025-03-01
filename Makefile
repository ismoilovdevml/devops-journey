# DevOps Journey Makefile
# This Makefile provides shortcuts for common development tasks

.PHONY: help setup install dev build start lint docker-build docker-run docker-stop clean all

# Default target when just running `make`
.DEFAULT_GOAL := help

# Colors for terminal output
YELLOW := \033[1;33m
GREEN := \033[1;32m
NC := \033[0m # No Color

# Project variables
PROJECT_NAME := devops-journey
DOCKER_IMAGE := $(PROJECT_NAME):latest
DOCKER_PORT := 3000:3000

# Use npm as the default package manager
PKG_MANAGER := pnpm

help: ## Display this help message
	@echo "$(GREEN)DevOps Journey$(NC) - Makefile commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'

install: ## Install dependencies
	@echo "$(GREEN)Installing dependencies using $(PKG_MANAGER)...$(NC)"
	$(PKG_MANAGER) install

dev: ## Start development server
	@echo "$(GREEN)Starting development server...$(NC)"
	$(PKG_MANAGER) run dev

build: ## Build the project for production
	@echo "$(GREEN)Building for production...$(NC)"
	$(PKG_MANAGER) run build

start: ## Start the production server
	@echo "$(GREEN)Starting production server...$(NC)"
	$(PKG_MANAGER) run start

lint: ## Run linting
	@echo "$(GREEN)Running linter...$(NC)"
	$(PKG_MANAGER) run lint



docker-build: ## Build Docker image
	@echo "$(GREEN)Building Docker image...$(NC)"
	docker build -t $(DOCKER_IMAGE) .

docker-run: ## Run the application in Docker
	@echo "$(GREEN)Running Docker container...$(NC)"
	docker run -p $(DOCKER_PORT) --name $(PROJECT_NAME) $(DOCKER_IMAGE)

docker-stop: ## Stop Docker container
	@echo "$(GREEN)Stopping Docker container...$(NC)"
	docker stop $(PROJECT_NAME) || true
	docker rm $(PROJECT_NAME) || true

clean: ## Clean build artifacts and node_modules
	@echo "$(GREEN)Cleaning project...$(NC)"
	rm -rf .next out node_modules
	@echo "$(GREEN)Project cleaned!$(NC)"



setup: ## Install system requirements (Node.js, npm, pnpm)
	@echo "$(GREEN)Setting up system requirements...$(NC)"
	./setup.sh

setup-dev: install ## Complete development environment setup
	@echo "$(GREEN)Setting up development environment...$(NC)"
	@echo "$(GREEN)✓ Dependencies installed with pnpm$(NC)"
	@echo "$(GREEN)✓ Development environment ready!$(NC)"
	@echo ""
	@echo "$(YELLOW)Next steps:$(NC)"
	@echo "  - Run '$(YELLOW)make dev$(NC)' to start the development server"
	@echo "  - Run '$(YELLOW)make help$(NC)' to see all available commands"

all: clean install build ## Clean, install dependencies and build

# Check if Docker is installed
docker-check:
	@which docker > /dev/null || (echo "$(YELLOW)Docker is not installed. Please install Docker first.$(NC)" && exit 1)

# Check if pnpm is installed
pnpm-check:
	@which pnpm > /dev/null || (echo "$(YELLOW)pnpm is not installed. Please install pnpm first.$(NC)" && exit 1)

# Prerequisites checks
docker-build: docker-check
docker-run: docker-check
docker-stop: docker-check
docker-cleanup: docker-check
install: pnpm-check
dev: pnpm-check
build: pnpm-check
