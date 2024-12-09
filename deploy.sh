#!/bin/bash

# Exit on any error
set -e

# Print commands
set -x

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build production version
npm run build

# Optional: Deploy to specific hosting platform
# Replace with your specific deployment commands
# For example, for Netlify:
# netlify deploy --prod

# Or for Vercel:
# vercel --prod

echo "Deployment completed successfully!"
