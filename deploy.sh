#!/bin/bash

# BIM Element Library - Simple Deployment Script
# This script pulls the latest image from GitHub and deploys it

set -e

# Configuration
GITHUB_USER="bkamuz"
REPO_NAME="bim-element-library-management"
CONTAINER_NAME="bim-library"
IMAGE_NAME="ghcr.io/${GITHUB_USER}/${REPO_NAME}:latest"
PORT="80"

echo "🚀 Starting deployment of BIM Element Library..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    echo "✅ Docker installed. Please log out and back in, then run this script again."
    exit 1
fi

# Check if user is in docker group
if ! groups $USER | grep -q docker; then
    echo "❌ User is not in docker group. Adding user to docker group..."
    sudo usermod -aG docker $USER
    echo "✅ User added to docker group. Please log out and back in, then run this script again."
    exit 1
fi

# Stop and remove existing container if it exists
if docker ps -a --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "🛑 Stopping existing container..."
    docker stop $CONTAINER_NAME
    echo "🗑️ Removing existing container..."
    docker rm $CONTAINER_NAME
fi

# Remove old image to save space
if docker images --format 'table {{.Repository}}:{{.Tag}}' | grep -q "^${IMAGE_NAME}$"; then
    echo "🗑️ Removing old image..."
    docker rmi $IMAGE_NAME || true
fi

# Pull latest image
echo "⬇️ Pulling latest image from GitHub Container Registry..."
docker pull $IMAGE_NAME

# Run new container
echo "🐳 Starting new container..."
docker run -d \
    --name $CONTAINER_NAME \
    --restart unless-stopped \
    -p $PORT:80 \
    $IMAGE_NAME

# Wait a moment for container to start
sleep 5

# Check if container is running
if docker ps --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "✅ Container is running successfully!"
    
    # Get server IP
    SERVER_IP=$(hostname -I | awk '{print $1}')
    
    echo ""
    echo "🌐 Your BIM Element Library is now accessible at:"
    echo "   http://localhost:$PORT"
    echo "   http://$SERVER_IP:$PORT"
    echo ""
    echo "📊 Container status:"
    docker ps --filter name=$CONTAINER_NAME --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    echo ""
    echo "📋 To view logs: docker logs $CONTAINER_NAME"
    echo "🛑 To stop: docker stop $CONTAINER_NAME"
    echo "🔄 To restart: docker restart $CONTAINER_NAME"
else
    echo "❌ Container failed to start. Checking logs..."
    docker logs $CONTAINER_NAME
    exit 1
fi

echo ""
echo "🎉 Deployment completed successfully!"