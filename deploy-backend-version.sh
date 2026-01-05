#!/bin/bash
# Deploy Backend-Version (index.html) zu Strato
# Diese Version zeigt "Datenbank" im Text, auch wenn sie LocalStorage nutzt

set -e

echo "🚀 Starting deployment to Strato (Backend-Version mit Datenbank-Text)..."

# SFTP Credentials
SFTP_USER="su403214"
SFTP_PASS='deutz15!2000'
SFTP_HOST="5018735097.ssh.w2.strato.hosting"
SFTP_PATH="dabrock-info/Klassentreffen"

# Check if index.html exists
if [ ! -f "index.html" ]; then
  echo "❌ Error: index.html not found."
  exit 1
fi

echo "📦 Files to deploy:"
echo "  - index.html (Backend-Version)"

# Function to upload file
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

# Upload index.html
upload_file "index.html" "index.html" "Klassentreffen Backend-Version" || exit 1

echo ""
echo "✅ Deployment completed!"
echo "🌐 Visit: https://www.dabrock.info/Klassentreffen"
echo ""
echo "ℹ️  Backend-Version deployed (zeigt 'Datenbank' Text)"
echo "   Hinweis: Nutzt trotzdem noch Backend-API (nicht LocalStorage)"
