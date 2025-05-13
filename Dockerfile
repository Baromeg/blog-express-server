# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy all project files into the container
COPY . .

# Install pnpm globally and project dependencies
RUN npm install -g pnpm && pnpm install

# Build TypeScript project
RUN pnpm build

# Expose the port your app runs on
EXPOSE 3000

# Build the app
CMD ["pnpm", "start:dev"]
