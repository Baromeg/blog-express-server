start: ## Start all services in background
	docker-compose up -d --build

dev: ## Start app in live-reload mode
	docker-compose up

stop: ## Stop and remove containers
	docker-compose down

seed:
	docker-compose exec api pnpm run seed

test: ## Run unit tests
	docker-compose exec api pnpm test

teste2e: ## Run end-to-end tests
	docker-compose exec api pnpm test:e2e
