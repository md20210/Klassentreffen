#!/bin/bash
# Vollautomatisches Deployment Script
# Erstellt GitHub Repo und pusht Code

set -e

echo "🚀 Klassentreffen - Vollautomatisches Deployment"
echo "================================================="
echo ""

GITHUB_USER="md20210"
REPO_NAME="Klassentreffen"
REPO_URL="git@github.com:${GITHUB_USER}/${REPO_NAME}.git"

# Schritt 1: GitHub Repository erstellen (Browser-basiert)
echo "📝 Schritt 1: GitHub Repository erstellen"
echo ""
echo "Öffne in deinem Browser:"
echo "  https://github.com/new?name=Klassentreffen&description=40-jähriges+Abi-Treffen+vom+Ratsgymnasium+-+E-Mail-Sammlung"
echo ""
echo "Einstellungen:"
echo "  ✓ Repository name: Klassentreffen"
echo "  ✓ Description: 40-jähriges Abi-Treffen vom Ratsgymnasium - E-Mail-Sammlung"
echo "  ✓ Public"
echo "  ✗ KEIN README, .gitignore oder License"
echo ""

# Öffne Browser automatisch (falls möglich)
if command -v xdg-open &> /dev/null; then
    xdg-open "https://github.com/new?name=Klassentreffen&description=40-jähriges+Abi-Treffen+vom+Ratsgymnasium+-+E-Mail-Sammlung" 2>/dev/null &
elif command -v open &> /dev/null; then
    open "https://github.com/new?name=Klassentreffen&description=40-jähriges+Abi-Treffen+vom+Ratsgymnasium+-+E-Mail-Sammlung" 2>/dev/null &
else
    echo "💡 Kopiere den Link oben in deinen Browser"
fi

echo ""
read -p "Repository erstellt? Drücke ENTER wenn fertig..."

# Schritt 2: Git Remote konfigurieren
echo ""
echo "🔗 Schritt 2: Git Remote konfigurieren"

# Entferne alte Remote falls vorhanden
git remote remove origin 2>/dev/null || true

# Füge neue Remote hinzu
git remote add origin "$REPO_URL"

echo "✅ Remote hinzugefügt: $REPO_URL"

# Schritt 3: Push zu GitHub
echo ""
echo "📤 Schritt 3: Push zu GitHub"
echo ""

if git push -u origin master; then
    echo ""
    echo "✅ GitHub Push erfolgreich!"
else
    echo ""
    echo "❌ Push fehlgeschlagen. Versuche HTTPS statt SSH..."
    git remote remove origin
    git remote add origin "https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
    git push -u origin master
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ DEPLOYMENT ERFOLGREICH!"
echo ""
echo "📍 Deine URLs:"
echo "  🌐 Strato:  https://www.dabrock.info/Klassentreffen"
echo "  📦 GitHub:  https://github.com/${GITHUB_USER}/${REPO_NAME}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Railway Deployment (optional)
echo "🚂 Railway Deployment (PostgreSQL Backend)"
echo ""
echo "Möchtest du jetzt auch das Backend auf Railway deployen?"
read -p "(y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Öffne Railway in deinem Browser:"
    echo "  https://railway.app/new"
    echo ""
    echo "Schritte:"
    echo "  1. Login mit GitHub"
    echo "  2. 'Deploy from GitHub repo'"
    echo "  3. Wähle: ${GITHUB_USER}/${REPO_NAME}"
    echo "  4. 'New' → 'Database' → 'PostgreSQL'"
    echo "  5. Service Settings → Start Command:"
    echo "     cd backend && npm run start:postgres"
    echo ""

    if command -v xdg-open &> /dev/null; then
        xdg-open "https://railway.app/new" 2>/dev/null &
    elif command -v open &> /dev/null; then
        open "https://railway.app/new" 2>/dev/null &
    fi

    echo ""
    read -p "Drücke ENTER wenn Railway Setup abgeschlossen..."
    echo ""
    echo "✅ Backend Deployment abgeschlossen!"
fi

echo ""
echo "🎉 Alles fertig!"
echo ""
echo "Die Klassentreffen-Seite ist jetzt live:"
echo "  👉 https://www.dabrock.info/Klassentreffen"
echo ""
