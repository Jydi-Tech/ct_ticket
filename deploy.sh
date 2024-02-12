#!/bin/bash

DEPLOY_DIR="/var/www/html/ct_ticket_dist"

mkdir "$DEPLOY_DIR"

# Change ownership to the current user for copying
sudo chmod 777 "$DEPLOY_DIR"
sudo chown -R $USER:$USER "$DEPLOY_DIR"

# Build and Copy Files
echo "Building Angular project..."
ng build --configuration=apache
cp -R dist/ct_ticket/browser/* "$DEPLOY_DIR"

# Change ownership back to the web server user
#sudo chown -R www-data:www-data "$DEPLOY_DIR"

echo "Deployment complete."


