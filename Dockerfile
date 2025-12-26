# Oven Framework - Docker Image
# Using official Bun image

# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Production stage
FROM oven/bun:1-slim AS production

WORKDIR /app

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/app ./app
COPY --from=builder /app/bin ./bin
COPY --from=builder /app/oven.config.ts ./
COPY --from=builder /app/tsconfig.json ./

# Copy public folder (create empty if not exists)
COPY --from=builder /app/public* ./public/

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Run the app
CMD ["bun", "run", "bin/oven.js", "start"]
