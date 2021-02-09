#!/bin/bash
set -e

DOCKER_IMAGE="hsldevcom/digitransit-site"
DOCKER_TAG=${DOCKER_BASE_TAG:-latest}

COMMIT_HASH=$(git rev-parse --short "$GITHUB_SHA")

DOCKER_TAG_LONG=$DOCKER_TAG-$(date +"%Y-%m-%dT%H.%M.%S")-$COMMIT_HASH
DOCKER_IMAGE_TAG=$DOCKER_IMAGE:$DOCKER_TAG
DOCKER_IMAGE_TAG_LONG=$DOCKER_IMAGE:$DOCKER_TAG_LONG

# Build image
echo "Building digitransit-site"
docker build --tag=$DOCKER_IMAGE_TAG_LONG .

docker login -u $DOCKER_USER -p $DOCKER_AUTH
echo "Pushing $DOCKER_TAG image"
docker push $DOCKER_IMAGE_TAG_LONG
docker tag $DOCKER_IMAGE_TAG_LONG $DOCKER_IMAGE_TAG
docker push $DOCKER_IMAGE_TAG

echo Build completed
