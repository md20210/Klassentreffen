#!/bin/bash
# Automatisches GitHub Setup und Deployment Script

set -e

echo "🚀 GitHub Setup und Deployment für Klassentreffen"
echo "=================================================="
echo ""

# Farben
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# GitHub Username
GITHUB_USER="md20210"
REPO_NAME="Klassentreffen"

echo -e "${BLUE}GitHub User:${NC} $GITHUB_USER"
echo -e "${BLUE}Repository:${NC} $REPO_NAME"
echo ""

# Prüfe ob Repository bereits existiert
echo "📝 Schritt 1: GitHub Repository erstellen"
echo "   Bitte gehe zu: https://github.com/new"
echo "   - Repository name: Klassentreffen"
echo "   - Description: 40-jähriges Abi-Treffen vom Ratsgymnasium - E-Mail-Sammlung"
echo "   - Public"
echo "   - KEIN README, .gitignore oder Lizenz hinzufügen"
echo ""
read -p "Hast du das Repository erstellt? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Bitte erstelle zuerst das Repository und führe dann dieses Script erneut aus."
    exit 1
fi

echo ""
echo "🔗 Schritt 2: Git Remote konfigurieren"

# Remote hinzufügen (entferne alte falls vorhanden)
git remote remove origin 2>/dev/null || true

# SSH Remote hinzufügen
git remote add origin git@github.com:${GITHUB_USER}/${REPO_NAME}.git

echo -e "${GREEN}✓${NC} Remote hinzugefügt: git@github.com:${GITHUB_USER}/${REPO_NAME}.git"
echo ""

echo "📤 Schritt 3: Push zu GitHub"
git push -u origin master

echo ""
echo -e "${GREEN}✅ GitHub Deployment erfolgreich!${NC}"
echo ""
echo "🌐 Repository URL: https://github.com/${GITHUB_USER}/${REPO_NAME}"
echo ""

# Railway Setup
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚂 Schritt 4: Railway Deployment (Optional)"
echo ""
echo "Für PostgreSQL Backend Deployment:"
echo ""
echo "1. Gehe zu: https://railway.app"
echo "2. Login mit GitHub Account"
echo "3. 'New Project' → 'Deploy from GitHub repo'"
echo "4. Wähle: ${GITHUB_USER}/${REPO_NAME}"
echo "5. 'New' → 'Database' → 'PostgreSQL'"
echo "6. Service Settings:"
echo "   - Start Command: cd backend && npm run start:postgres"
echo ""
read -p "Railway Deployment später machen? (y/n) " -n 1 -r
echo
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo -e "${BLUE}ℹ️  Railway Deployment Guide:${NC} siehe DEPLOYMENT.md"
else
    echo "Railway Setup wird übersprungen."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}🎉 Setup abgeschlossen!${NC}"
echo ""
echo "Zusammenfassung:"
echo "  ✅ Strato:  https://www.dabrock.info/Klassentreffen"
echo "  ✅ GitHub:  https://github.com/${GITHUB_USER}/${REPO_NAME}"
echo "  ⏳ Railway: Siehe DEPLOYMENT.md für Anleitung"
echo ""
