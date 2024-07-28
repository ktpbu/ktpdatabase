#!/bin/bash

# stops if any command fails
set -e

# checks if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "docker-compose could not be found - please install it first"
    exit 1
fi

# runs the scrapers in containers
docker-compose -f ./scrapers/docker-compose.yaml up --build

# stops and removes the containers
docker-compose -f ./scrapers/docker-compose.yaml down