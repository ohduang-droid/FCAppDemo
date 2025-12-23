# Docker Setup Guide

## Overview
This project uses a multi-stage Docker build with Node.js to create a simple production image for the React + Vite demo application.

## Files Created

### 1. `Dockerfile`
- **Stage 1 (Builder)**: Uses Node.js 20 Alpine to build the application
- **Stage 2 (Production)**: Uses Node.js 20 Alpine with `serve` package to serve static files
- Simple setup perfect for demo projects
- Optimized for small image size and fast builds

### 2. `.dockerignore`
Excludes unnecessary files from the Docker build context:
- `node_modules` (will be installed fresh in container)
- Build artifacts
- Development files
- Documentation

### 3. `nginx.conf` (Optional - not used in current setup)
If you want to switch to nginx later, this configuration file is available with:
- SPA routing support (all routes redirect to index.html)
- Gzip compression for better performance
- Static asset caching (1 year for immutable assets)
- Security headers
- No caching for index.html (ensures users get latest version)

## Usage

### Build the Docker Image
```bash
docker build -t fcappdemo:latest .
```

### Run the Container
```bash
docker run -d -p 3000:3000 --name fcappdemo fcappdemo:latest
```

Access the application at: http://localhost:3000

### Stop and Remove Container
```bash
docker stop fcappdemo
docker rm fcappdemo
```

### Development Mode (Local)
The development server is already running on:
- Local: http://localhost:8080/
- Network: http://192.168.8.29:8080/

To start development server manually:
```bash
npm run dev
```

## Docker Commands Reference

### View Running Containers
```bash
docker ps
```

### View Container Logs
```bash
docker logs fcappdemo
```

### Execute Commands in Container
```bash
docker exec -it fcappdemo sh
```

### Remove Image
```bash
docker rmi fcappdemo:latest
```

## Production Deployment

For production deployment, you can:

1. **Push to Docker Registry**
   ```bash
   docker tag fcappdemo:latest your-registry/fcappdemo:latest
   docker push your-registry/fcappdemo:latest
   ```

2. **Use Docker Compose** (create docker-compose.yml if needed)
   ```yaml
   version: '3.8'
   services:
     web:
       build: .
       ports:
         - "80:80"
       restart: unless-stopped
   ```

3. **Deploy to Cloud Platforms**
   - AWS ECS/Fargate
   - Google Cloud Run
   - Azure Container Instances
   - DigitalOcean App Platform

## Environment Variables

If you need to add environment variables:

1. Create `.env` file (already in .dockerignore)
2. Update Dockerfile to pass build-time variables:
   ```dockerfile
   ARG VITE_API_URL
   ENV VITE_API_URL=$VITE_API_URL
   ```
3. Build with args:
   ```bash
   docker build --build-arg VITE_API_URL=https://api.example.com -t fcappdemo:latest .
   ```

## Optimization Tips

The current setup already includes:
- ✅ Multi-stage build (reduces final image size)
- ✅ Alpine Linux (minimal base image)
- ✅ Nginx for efficient static file serving
- ✅ Gzip compression
- ✅ Asset caching
- ✅ Security headers

## Troubleshooting

### Build Fails
- Check that all dependencies in package.json are correct
- Ensure you have enough disk space
- Try: `docker system prune` to clean up

### Container Won't Start
- Check logs: `docker logs fcappdemo`
- Verify port 80 is not already in use
- Try different port: `docker run -p 8080:80 fcappdemo:latest`

### Application Not Loading
- Verify nginx configuration is correct
- Check browser console for errors
- Ensure build completed successfully
