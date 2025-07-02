#!/bin/bash

# Start
printf ">>>>> Starting \n"
START_TIME=$(date +%s)

# Constant

BUILD_DIR=dist
TARGET_DIR=/var/www/html/tonthepduybao.com/

printf "\n>>>>> Fetching\n"
git fetch && git pull

printf "\n\n>>>>> Building\n"
yarn build
sudo rm -rf $TARGET_DIR/*
sudo cp -Rvp $BUILD_DIR/* $TARGET_DIR
sudo rm -rf $BUILD_DIR

# End"
END_TIME=$(date +%s)
EXEC_TIME=$(($END_TIME-$START_TIME))
printf "\n\n>>>>> Finished at $EXEC_TIME secs\n"
