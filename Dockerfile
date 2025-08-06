# Use the official Node.js 18 LTS image as base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Install TypeScript globally for building
RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Build the TypeScript application
RUN npm run build

# Create uploads directory with proper permissions
RUN mkdir -p uploads && chmod 755 uploads

# Create a non-root user to run the application
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Change ownership of the app directory to the nodejs user
RUN chown -R nextjs:nodejs /app

# Switch to the non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable for production
ENV NODE_ENV=production

# Health check to ensure the container is running properly
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start the application
CMD ["npm", "start"]
