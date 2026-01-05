# GitHub Repository Setup

## Schritt 1: Repository auf GitHub erstellen

1. Gehe zu: https://github.com/new
2. Repository-Name: `Klassentreffen`
3. Description: `40-jähriges Abi-Treffen vom Ratsgymnasium - E-Mail-Sammlung`
4. Wähle: **Public** (oder Private, je nach Wunsch)
5. **NICHT** "Initialize with README" anklicken (wir haben bereits Dateien)
6. Klicke auf "Create repository"

## Schritt 2: Lokales Repository mit GitHub verbinden

Kopiere deine GitHub-URL (wird angezeigt nach Repository-Erstellung):

```bash
cd /home/micha/Klassentreffen

# Remote hinzufügen (ersetze USERNAME mit deinem GitHub-Benutzernamen)
git remote add origin https://github.com/USERNAME/Klassentreffen.git

# Oder mit SSH:
git remote add origin git@github.com:USERNAME/Klassentreffen.git

# Push to GitHub
git push -u origin master
```

## Schritt 3: Verify

Nach dem Push:
1. Gehe zu `https://github.com/USERNAME/Klassentreffen`
2. Du solltest alle Dateien sehen

## Was ist bereits committed:

✅ 3 Commits sind bereit zum Push:
- `ec8f717` Initial commit: Klassentreffen E-Mail-Sammlung
- `68238c1` Update: 40-jähriges Abi-Treffen vom Ratsgymnasium
- `9fdfbc9` Add PostgreSQL support and deployment configs

## Nächste Schritte nach GitHub Push:

### Backend mit PostgreSQL auf Railway deployen:

1. Gehe zu https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Wähle `Klassentreffen` Repository
4. Railway erkennt automatisch Node.js
5. Füge PostgreSQL Datenbank hinzu: "New" → "Database" → "PostgreSQL"
6. Service Settings → Start Command: `cd backend && npm run start:postgres`
7. Railway deployed automatisch!

### Alternative: Render.com

1. Gehe zu https://render.com
2. "New +" → "Web Service"
3. Verbinde GitHub Repository
4. Build Command: `cd backend && npm install`
5. Start Command: `cd backend && npm run start:postgres`
6. Erstelle PostgreSQL Datenbank separat
7. Setze `DATABASE_URL` Environment Variable

## Aktueller Status:

✅ **Strato Deployment:** ERFOLGREICH
- URL: https://www.dabrock.info/Klassentreffen
- Version: Statische Version (LocalStorage)

⏳ **GitHub:** Bereit zum Push
⏳ **PostgreSQL Backend:** Bereit zum Deploy (nach GitHub Push)

## Fertig zum Push!

Führe aus:
```bash
cd /home/micha/Klassentreffen
git remote add origin https://github.com/DEIN_USERNAME/Klassentreffen.git
git push -u origin master
```
