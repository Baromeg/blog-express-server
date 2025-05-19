start: ## Run production build
	docker build --target prod -t express-server-api .
	docker-compose up -d api db

dev: ## Run development build with live reload
	docker build --target dev -t express-server-api .
	docker-compose up api db

stop: ## Stop all running services
	docker-compose down

seed: ## Seed the database
	docker-compose exec api pnpm run seed

test: ## Run unit tests
	docker-compose exec api pnpm run test
