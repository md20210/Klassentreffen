#!/bin/bash
# Deployment Script für Klassentreffen
# Usage: ./deploy.sh

set -e  # Exit on error

echo "🚀 Starting deployment to Strato (www.dabrock.info/Klassentreffen)..."

# SFTP Credentials
SFTP_USER="su403214"
SFTP_PASS='deutz15!2000'
SFTP_HOST="5018735097.ssh.w2.strato.hosting"
SFTP_PATH="dabrock-info/Klassentreffen"

# Check if index-static.html exists
if [ ! -f "index-static.html" ]; then
  echo "❌ Error: index-static.html not found."
  exit 1
fi

echo "📦 Files to deploy:"
echo "  - index-static.html (will be uploaded as index.html)"

# Function to upload file with proper error handling
upload_file() {
  local LOCAL=$1
  local REMOTE=$2
  local DESC=$3

  echo "  📤 Uploading $DESC..."

  if curl -T "$LOCAL" \
       -u "$SFTP_USER:$SFTP_PASS" \
       "sftp://$SFTP_HOST/$SFTP_PATH/$REMOTE" \
       --insecure \
       --connect-timeout 30 \
       --max-time 120 \
       --ftp-create-dirs \
       2>&1 | tee /tmp/curl_output.txt | grep -q "curl: (67)"; then
    echo "  ❌ Failed to upload $DESC (authentication error)"
    cat /tmp/curl_output.txt
    return 1
  else
    echo "  ✅ Uploaded $DESC"
    return 0
  fi
}

# Upload index-static.html as index.html
upload_file "index-static.html" "index.html" "Klassentreffen webpage (static version)" || exit 1

echo ""
echo "✅ Deployment completed!"
echo "🌐 Visit: https://www.dabrock.info/Klassentreffen"
echo ""
echo "ℹ️  The static version uses LocalStorage for data persistence."
echo "   Each visitor has their own local copy of email addresses."
