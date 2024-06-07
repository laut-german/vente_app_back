#!/bin/bash

# Stop and remove the container
container_id=$(docker ps -q --filter ancestor=backend-vente-app)
if [ -n "$container_id" ]; then
  echo "Stopping container..."
  docker stop $container_id

  echo "Removing container..."
  docker rm $container_id
else
  echo "No running container found for backend-vente-app"
fi

# Remove the image
image_id=$(docker images -q backend-vente-app)
if [ -n "$image_id" ]; then
  echo "Removing image..."
  docker rmi $image_id
else
  echo "No image found for backend-vente-app"
fi
