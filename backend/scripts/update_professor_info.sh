#!/bin/bash

# stops if any command fails
set -e

# checks if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "docker-compose could not be found - please install it first"
    exit 1
fi

# builds the professor scraper container
docker-compose -f ./scrapers/docker-compose.yaml build professor_scraper

# runs the professor scraper with the update flag
docker-compose -f ./scrapers/docker-compose.yaml run --rm professor_scraper python professor_scraper.py --update