# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Add pnpm to path
ENV PNPM_HOME=/usr/local/bin

# Install pnpm - use exact version for reproducibility
RUN npm install -g pnpm@8.15.4 \
    && pnpm config set store-dir /.pnpm-store

# Copy package.json and lockfile
COPY package.json pnpm-lock.yaml* .npmrc* ./

# Install dependencies with cache optimization
RUN --mount=type=cache,id=pnpm,target=/.pnpm-store \
    pnpm install --frozen-lockfile --prod=false

# Copy application code
COPY . .

# Build application
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production \
    PNPM_HOME=/usr/local/bin

# Add a non-root user to run the application
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    && npm install -g pnpm@8.15.4

# Copy only necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Install production dependencies and necessary dev dependencies
RUN --mount=type=cache,id=pnpm,target=/.pnpm-store \
    pnpm install --frozen-lockfile --prod --no-optional \
    && pnpm add -D @next/bundle-analyzer

# Set proper permissions
RUN chmod -R 755 /app

# Switch to non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Define healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Run the application
CMD ["pnpm", "start"]