# Deployment Anleitung

## 1. GitHub Repository erstellen

```bash
# Auf GitHub.com gehen und neues Repository erstellen:
# Name: Klassentreffen
# Description: 40-jähriges Abi-Treffen vom Ratsgymnasium - E-Mail-Sammlung
# Public oder Private nach Wahl

# Dann lokal:
cd /home/micha/Klassentreffen
git remote add origin https://github.com/IHR_USERNAME/Klassentreffen.git
git push -u origin master
```

## 2. Statische Version auf Strato deployen

```bash
# Deploy-Script ausführen:
./deploy.sh
```

Die statische Version wird hochgeladen nach: `https://www.dabrock.info/Klassentreffen`

**Hinweis:** Die statische Version speichert Daten lokal im Browser (LocalStorage).

## 3. Backend mit PostgreSQL deployen (Railway.app)

### Option A: Automatisches Deployment via Railway

1. Gehe zu [Railway.app](https://railway.app)
2. Melde dich an (GitHub OAuth empfohlen)
3. Klicke auf "New Project"
4. Wähle "Deploy from GitHub repo"
5. Wähle dein `Klassentreffen` Repository
6. Railway erkennt automatisch Node.js

### PostgreSQL Datenbank hinzufügen:

1. Im Railway Dashboard: Klicke auf "New" → "Database" → "PostgreSQL"
2. Railway erstellt automatisch die `DATABASE_URL` Umgebungsvariable
3. Im Service Settings:
   - Start Command: `cd backend && npm run start:postgres`
   - Root Directory: `/`

### Umgebungsvariablen setzen:

Railway setzt `DATABASE_URL` automatisch. Optional:
- `NODE_ENV=production`
- `PORT=3000` (Railway überschreibt dies automatisch)

### Deploy:

Railway deployed automatisch bei jedem Git Push!

## 4. Backend mit PostgreSQL deployen (Render.com)

### Alternative zu Railway:

1. Gehe zu [Render.com](https://render.com)
2. Erstelle neuen "Web Service"
3. Verbinde mit GitHub Repository
4. Einstellungen:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm run start:postgres`
   - **Environment:** `Node`

### PostgreSQL Datenbank:

1. Erstelle neue "PostgreSQL" Datenbank
2. Kopiere die "Internal Database URL"
3. Im Web Service → Environment:
   - `DATABASE_URL` = [Database URL]
   - `NODE_ENV=production`

## 5. Backend mit PostgreSQL deployen (Heroku)

```bash
# Heroku CLI installieren und einloggen
heroku login

# App erstellen
heroku create klassentreffen-abi

# PostgreSQL hinzufügen
heroku addons:create heroku-postgresql:essential-0

# Deploy
git push heroku master

# Logs ansehen
heroku logs --tail
```

## 6. Frontend mit Backend verbinden

Wenn Backend deployed ist, aktualisiere die API-URLs in `index.html`:

```javascript
// Ersetze:
fetch('/api/klassentreffen/register', ...)

// Mit:
fetch('https://deine-backend-url.railway.app/api/klassentreffen/register', ...)
```

## Empfohlene Deployment-Strategie

### Für einfache Nutzung (empfohlen):
- **Strato:** Statische Version (`index-static.html`)
- Jeder Nutzer hat seine eigene lokale Kopie
- Kein Backend erforderlich

### Für zentrale Datenverwaltung:
- **Strato:** Nur Frontend (`index.html`)
- **Railway/Render:** Backend + PostgreSQL
- Alle Nutzer sehen dieselben Daten

## URLs

- **Frontend (Strato):** https://www.dabrock.info/Klassentreffen
- **Backend (Railway):** https://klassentreffen-production-xxxx.up.railway.app
- **GitHub:** https://github.com/IHR_USERNAME/Klassentreffen

## Testen

### Lokal testen (SQLite):
```bash
cd backend
npm install
npm start
```

### Lokal testen (PostgreSQL):
```bash
cd backend
npm install
export DATABASE_URL="postgresql://localhost/klassentreffen"
npm run start:postgres
```

## Troubleshooting

### Backend startet nicht:
- Prüfe `DATABASE_URL` Umgebungsvariable
- Prüfe Logs: `railway logs` oder `heroku logs --tail`

### Statische Version Daten weg:
- LocalStorage wurde gelöscht (Browser Cache geleert)
- Lösung: Regelmäßig Word/Excel Download machen

### CORS Fehler:
- Backend CORS ist bereits konfiguriert
- Prüfe ob Frontend die richtige Backend-URL verwendet
