#!/bin/bash
# save as validate-package.sh

echo "🧹 Cleaning..."
yarn clean

echo "📦 Installing dependencies..."
yarn install

echo "✨ Linting..."
yarn lint

echo "🧪 Running tests..."
yarn test

echo "🏗️ Building package..."
yarn prepack

echo "📋 Checking package contents..."
npm pack --dry-run

echo "🍎 Validating iOS podspec..."
pod lib lint react-native-appstance.podspec --allow-warnings --skip-import-validation

echo "✅ All checks passed! Ready to publish."