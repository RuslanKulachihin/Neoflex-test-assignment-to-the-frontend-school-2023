#! /usr/bin/env bash

main() {
  cd server || exit 1

  npm install

  node index.js

  exit 0
}

main
