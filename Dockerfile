# Development stage
FROM node:22-alpine AS dev

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY . .

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "start:dev"]


# Build stage
FROM node:22-alpine AS build

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile && pnpm build


# Production stage
FROM node:20-alpine AS prod

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 3000

CMD ["node", "dist/index.js"]
