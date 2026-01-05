#!/bin/bash
# Erstelle GitHub Repository über GitHub CLI oder API

echo "🔍 Prüfe GitHub CLI Installation..."

# Versuche gh CLI zu installieren (falls möglich)
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) nicht gefunden."
    echo ""
    echo "Manuelle Schritte erforderlich:"
    echo ""
    echo "1. Gehe zu: https://github.com/new"
    echo "2. Repository name: Klassentreffen"
    echo "3. Description: 40-jähriges Abi-Treffen vom Ratsgymnasium - E-Mail-Sammlung"
    echo "4. Wähle: Public"
    echo "5. KEIN README, .gitignore oder License hinzufügen"
    echo "6. Klicke 'Create repository'"
    echo ""
    echo "Dann führe aus:"
    echo "  cd /home/micha/Klassentreffen"
    echo "  git remote add origin git@github.com:md20210/Klassentreffen.git"
    echo "  git push -u origin master"
    echo ""
    exit 1
fi

echo "✓ GitHub CLI gefunden"
echo ""

# Prüfe ob eingeloggt
if ! gh auth status &> /dev/null; then
    echo "❌ Nicht bei GitHub eingeloggt."
    echo ""
    echo "Führe aus: gh auth login"
    exit 1
fi

echo "✓ Bei GitHub eingeloggt"
echo ""

# Erstelle Repository
echo "📝 Erstelle GitHub Repository..."
gh repo create Klassentreffen \
    --public \
    --source=. \
    --description="40-jähriges Abi-Treffen vom Ratsgymnasium - E-Mail-Sammlung" \
    --push

echo ""
echo "✅ Repository erstellt und gepusht!"
echo "🌐 URL: https://github.com/md20210/Klassentreffen"
