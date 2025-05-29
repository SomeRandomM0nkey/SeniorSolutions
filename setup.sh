#!/bin/bash

echo "Setting up CareConnect Senior Care Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo "Node.js is installed: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm"
    exit 1
fi

echo "npm is installed: $(npm --version)"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "Failed to install dependencies"
    exit 1
fi

echo ""
echo "Setup complete!"
echo ""
echo "To start the development server, run:"
echo "npm run dev"
echo ""
echo "The application will be available at http://localhost:5000"