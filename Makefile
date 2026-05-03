# Makefile for Podcast Platform Monorepo

.PHONY: help dev test lint clean docker-build docker-up docker-down migrate propto

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

### Development Commands

dev: ## Start local development environment
	docker-compose -f deploy/compose/docker-compose.local.yml up -d
	@echo "Starting services..."
	@cd apps/web && pnpm dev &
	@cd apps/creator-studio && pnpm dev &
	@cd apps/admin-console && pnpm dev &
	@echo "Web apps starting at:"
	@echo "  - Consumer: http://localhost:3000"
	@echo "  - Creator: http://localhost:3001"
	@echo "  - Admin: http://localhost:3002"

test: ## Run all tests
	@echo "Running Go tests..."
	@for service in services/*/; do \
		echo "Testing $$service..."; \
		cd $$service && go test ./... -v -cover && cd ../..; \
	done
	@echo "Running Frontend tests..."
	@cd apps/web && pnpm test
	@cd apps/creator-studio && pnpm test
	@cd apps/admin-console && pnpm test

lint: ## Run all linters
	@echo "Linting Go services..."
	@gofmt -l services/
	@go vet services/...
	@echo "Linting Frontend apps..."
	@cd apps/web && pnpm lint
	@cd apps/creator-studio && pnpm lint
	@cd apps/admin-console && pnpm lint
	@echo "Linting Protobuf..."
	@cd contracts/proto && buf lint

### Code Generation

proto: ## Generate code from protobuf files
	@cd contracts/proto && buf generate
	@echo "Protobuf code generated."

proto-check: ## Check for breaking changes in protobuf
	@cd contracts/proto && buf breaking --against '.git#branch=main'

### Database Commands

migrate: ## Run all database migrations
	@echo "Running migrations..."
	@for service in services/*/; do \
		if [ -d "$$service/migrations" ]; then \
			echo "Migrating $$service..."; \
			cd $$service && migrate -path migrations -database "$$DATABASE_URL" up && cd ../..; \
		fi \
	done

migrate-create: ## Create a new migration (usage: make migrate-create service=auth-service name=create_users)
	@if [ -z "$(service)" ] || [ -z "$(name)" ]; then \
		echo "Usage: make migrate-create service=<service> name=<migration_name>"; \
		exit 1; \
	fi
	@cd services/$(service) && migrate create -ext sql -dir migrations $(name)

### Docker Commands

docker-build: ## Build all Docker images
	@echo "Building service images..."
	@for service in services/*/; do \
		service_name=$$(basename $$service); \
		echo "Building $$service_name..."; \
		docker build -t podcast/$$service_name:latest -f deploy/docker/go-service.Dockerfile $$service; \
	done
	@echo "Building frontend images..."
	@docker build -t podcast/web:latest -f deploy/docker/nextjs.Dockerfile apps/web
	@docker build -t podcast/creator-studio:latest -f deploy/docker/nextjs.Dockerfile apps/creator-studio
	@docker build -t podcast/admin-console:latest -f deploy/docker/nextjs.Dockerfile apps/admin-console

docker-up: ## Start all services with Docker Compose
	docker-compose -f deploy/compose/docker-compose.local.yml up -d

docker-down: ## Stop all services
	docker-compose -f deploy/compose/docker-compose.local.yml down

docker-logs: ## View logs from all services
	docker-compose -f deploy/compose/docker-compose.local.yml logs -f

### Infrastructure Commands

terraform-init: ## Initialize Terraform
	@cd infra/terraform/environments/dev && terraform init

terraform-plan: ## Plan Terraform changes
	@cd infra/terraform/environments/dev && terraform plan

terraform-apply: ## Apply Terraform changes
	@cd infra/terraform/environments/dev && terraform apply

k8s-deploy: ## Deploy to Kubernetes (usage: make k8s-deploy env=dev)
	@if [ -z "$(env)" ]; then \
		echo "Usage: make k8s-deploy env=<dev|staging|prod>"; \
		exit 1; \
	fi
	@cd infra/kubernetes/overlays/$(env) && kubectl apply -k .

### Utility Commands

clean: ## Clean build artifacts
	@echo "Cleaning..."
	@find . -name "*.o" -delete
	@find . -name "*.test" -delete
	@find . -name "coverage.out" -delete
	@cd apps/web && rm -rf .next
	@cd apps/creator-studio && rm -rf .next
	@cd apps/admin-console && rm -rf .next

deps-update: ## Update all dependencies
	@echo "Updating Go modules..."
	@for service in services/*/; do \
		cd $$service && go get -u ./... && go mod tidy && cd ../..; \
	done
	@echo "Updating Node packages..."
	@cd apps/web && pnpm update
	@cd apps/creator-studio && pnpm update
	@cd apps/admin-console && pnpm update
	@cd packages/ui && pnpm update

generate: ## Run all code generation
	@make proto
	@echo "Running TypeScript code generation..."
	@cd packages/web-api-client && pnpm run generate

### Local Setup

setup: ## Initial setup for new developers
	@echo "Setting up development environment..."
	@cp .env.example .env
	@echo "Installing Go dependencies..."
	@for service in services/*/; do cd $$service && go mod download && cd ../..; done
	@echo "Installing Node dependencies..."
	@pnpm install
	@cd apps/web && pnpm install
	@cd apps/creator-studio && pnpm install
	@cd apps/admin-console && pnpm install
	@echo "Starting Docker services..."
	@make docker-up
	@echo "Running migrations..."
	@make migrate
	@echo "Setup complete! Run 'make dev' to start development."

### Pipeline Commands

ci-test: ## CI test command
	@make lint
	@make test
	@make proto-check

ci-build: ## CI build command
	@make docker-build

### Load Testing

load-test: ## Run load tests (usage: make load-test target=playback)
	k6 run tools/load-test/$(target).js

### Security

security-scan: ## Run security scans
	@echo "Scanning Go dependencies..."
	@govulncheck ./services/...
	@echo "Scanning Node dependencies..."
	@cd apps/web && pnpm audit
	@cd apps/creator-studio && pnpm audit
	@cd apps/admin-console && pnpm audit

.DEFAULT_GOAL: help
