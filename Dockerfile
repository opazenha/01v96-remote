FROM node:18-alpine

# Install build dependencies for native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    linux-headers \
    udev \
    alsa-lib-dev \
    alsa-utils

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create config directory and set permissions
RUN mkdir -p config && chmod 777 config

# Expose ports
EXPOSE 1337 1338

# Set environment variables
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"]