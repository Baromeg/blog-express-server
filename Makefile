start: ## Start all services in background
	docker-compose up -d --build

dev: ## Start app in live-reload mode
	docker-compose up

stop: ## Stop and remove containers
	docker-compose down

generate: ## Generate Prisma client
	docker-compose exec api pnpm prisma generate

migrate: ## Run initial Prisma migration
	docker-compose exec api pnpm prisma:migrate --name init

test: ## Run unit tests
	docker-compose exec api pnpm test

teste2e: ## Run end-to-end tests
	docker-compose exec api pnpm test:e2e
