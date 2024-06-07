#!/bin/bash

# Build the Docker image
docker build -t backend-vente-app .

# Run the Docker container
docker run -p 3000:3000  --name backend-vente-app backend-vente-app


