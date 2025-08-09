# Single stage build - mais simples e confiável
FROM node:18-alpine

# Install wget for healthcheck
RUN apk add --no-cache wget

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Create package-lock.json clean
RUN npm install --package-lock-only

# Install all dependencies first
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build argument for API URL
ARG VITE_api_form=https://470187c48f0a4640803d23a0491ae11b-a421d35e00a9431bb90c3d034.fly.dev/api/leads
ENV VITE_api_form=$VITE_api_form

# Build the application
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --omit=dev

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 80

# Set environment variables
ENV NODE_ENV=production
ENV PORT=80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80 || exit 1

# Start the application directly with node
CMD ["node", "dist/server/node-build.mjs"]
