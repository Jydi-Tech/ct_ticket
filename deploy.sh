#!/bin/bash
PASSWORD=$(cat ~/password.txt)
DEPLOY_DIR="/svr/html/ct_ticket_dist"
BUILD_DIR="/srv/http/ct_ticket/dist/ct_ticket/browser"

# Ensure destination exists
echo $PASSWORD | sudo -S mkdir -p "$DEPLOY_DIR"

# Give current user temporary permissions
echo $PASSWORD | sudo -S chown -R $USER:$USER "$DEPLOY_DIR"

# Build and Copy Files
echo "Building Angular project..."
ng build --configuration=apache
cp -R "$BUILD_DIR"/* "$DEPLOY_DIR"

# Restore Apache ownership
echo $PASSWORD | sudo -S chown -R http:http "$DEPLOY_DIR"

echo "Deployment complete."