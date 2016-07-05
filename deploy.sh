#!/bin/bash

cd _output
git init
git config user.name "travis-ci"
git config user.email "contact@travis-ci.com"
git add .
git commit -m "Deploy to GitHub Pages via Travis CI"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git" master > /dev/null 2>&1

cfcli purgecache -k $CLOUDFLARE_TOKEN -e $EMAIL_USERNAME -d benedfit.com
