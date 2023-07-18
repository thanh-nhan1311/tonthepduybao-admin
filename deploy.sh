#!/bin/bash

# Stop bash when failer occur
set -e

# Constant
PM2_INSTANCE_NAME="tonthepduybao-admin"
PORT=7900

read -p "Build branch: " branch
read -p "Build env: " env


# Script
START_TIME=$(date +%s)
echo "\n+++ Start +++"

echo "\n-- Switch to ${branch}"
git checkout $branch

echo "\n-- Pulling from ${branch}..."
git pull

echo "\n-- Installing..."
rm -rf node_modules
yarn install
cp env.properties .env

echo "\n-- Building at [${env}] environment..."
NODE_ENV=$env yarn build
pm2 delete $PM2_INSTANCE_NAME
pm2 serve --spa dist/ --port $PORT --name $PM2_INSTANCE_NAME

END_TIME=$(date +%s)
EXEC_TIME=$(($END_TIME-$START_TIME))
echo "\n\n+++ Finish at $EXEC_TIME seconds +++\n"
