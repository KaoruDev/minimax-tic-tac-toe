#!/usr/bin/env bash

# Builds the Docker Image
docker build -tunbeatable-tic-tac-toe:latest .

# Runs a Docker Container and forwards traffic from localhost:3000 to the container's 3000 port.
docker run -it --rm -p3000:3000 unbeatable-tic-tac-toe:latest

