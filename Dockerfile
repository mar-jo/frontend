# ---- Base Node ----
FROM node:18 AS build

# Set working directory
WORKDIR /src

# Copy project file
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all files from current directory to working dir in image
COPY . .

# Build application
RUN npm run build

# ---- Serve ----
# nginx state for serving content
FROM node:18

# EXPOSE Port 5173 to allow communication to/from server
EXPOSE 5173

# Set working directory to nginx asset directory
WORKDIR /app

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static build directory from builder stage
COPY --from=build /src /app

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["npm", "run", "dev", "--", "--host"]