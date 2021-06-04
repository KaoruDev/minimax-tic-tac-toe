#!/usr/bin/env bash

docker build -tunbeatable-tic-tac-toe:latest .
docker run -it --rm -p3000:3000 unbeatable-tic-tac-toe:latest

