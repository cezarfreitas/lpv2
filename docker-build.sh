#!/bin/bash

# Script para build e teste do Docker

echo "🔨 Building Docker image..."
docker build -f Dockerfile.safe -t ecko-landing:test \
  --build-arg VITE_api_form=https://470187c48f0a4640803d23a0491ae11b-a421d35e00a9431bb90c3d034.fly.dev/api/leads \
  .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    echo "🚀 Starting container..."
    docker run -d \
      --name ecko-landing-test \
      -p 80:80 \
      -e NODE_ENV=production \
      -e PORT=80 \
      ecko-landing:test
    
    if [ $? -eq 0 ]; then
        echo "✅ Container started successfully!"
        echo "🌐 Application should be available at: http://localhost:80"
        echo ""
        echo "📝 To check logs: docker logs -f ecko-landing-test"
        echo "🛑 To stop: docker stop ecko-landing-test && docker rm ecko-landing-test"
        echo "🔍 To debug: docker exec -it ecko-landing-test sh"
    else
        echo "❌ Failed to start container"
        exit 1
    fi
else
    echo "❌ Build failed"
    exit 1
fi
