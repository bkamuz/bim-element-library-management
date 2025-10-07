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

# Try to pull latest image from registry; if that fails fall back to building locally
echo "⬇️ Pulling latest image from GitHub Container Registry..."
if docker pull $IMAGE_NAME; then
    echo "✅ Pulled image: $IMAGE_NAME"
    RUNTIME_IMAGE="$IMAGE_NAME"
else
    echo "⚠️ Failed to pull $IMAGE_NAME. Will attempt to build image locally from the repository."

    # Ensure repo is present locally in home directory
    WORKDIR="$HOME/bim-element-library-management"
    if [ -d "$WORKDIR/.git" ]; then
        echo "🔄 Updating existing repository at $WORKDIR"
        git -C "$WORKDIR" fetch --all --prune
        git -C "$WORKDIR" reset --hard origin/main || git -C "$WORKDIR" pull
    else
        echo "📥 Cloning repository into $WORKDIR"
        git clone https://github.com/${GITHUB_USER}/${REPO_NAME}.git "$WORKDIR"
    fi

    # Build Docker image locally and tag as local image
    echo "⚙️ Building Docker image locally..."
    docker build -t ${CONTAINER_NAME}:local "$WORKDIR"
    RUNTIME_IMAGE="${CONTAINER_NAME}:local"
fi

# Run new container
echo "🐳 Starting new container using image: $RUNTIME_IMAGE"
docker run -d \
    --name $CONTAINER_NAME \
    --restart unless-stopped \
    -p $PORT:80 \
    $RUNTIME_IMAGE

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