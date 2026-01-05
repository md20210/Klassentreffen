# 🚂 Railway Deployment - PostgreSQL Backend

## ✅ Voraussetzungen (bereits erledigt!)

- [x] Code auf GitHub: https://github.com/md20210/Klassentreffen ✅
- [x] PostgreSQL-fähiger Backend-Code: `backend/server-postgres.js` ✅
- [x] Railway-Konfiguration: `railway.json` ✅

---

## 🚀 Deployment in 5 Minuten

### Schritt 1: Railway Account erstellen

Öffne: **https://railway.app**

1. Klicke **"Start a New Project"** oder **"Login"**
2. Wähle **"Login with GitHub"**
3. Autorisiere Railway für GitHub

### Schritt 2: Projekt von GitHub deployen

1. Klicke **"New Project"**
2. Wähle **"Deploy from GitHub repo"**
3. Suche und wähle: **`md20210/Klassentreffen`**
4. Railway startet automatisch das Deployment

⏱️ Warte ca. 1-2 Minuten...

### Schritt 3: PostgreSQL Datenbank hinzufügen

1. In deinem Railway Project Dashboard
2. Klicke **"+ New"**
3. Wähle **"Database"**
4. Wähle **"Add PostgreSQL"**

✅ Railway verbindet automatisch die Datenbank mit deinem Service!

Die Umgebungsvariable `DATABASE_URL` wird automatisch gesetzt.

### Schritt 4: Start Command konfigurieren

1. Klicke auf deinen **Klassentreffen Service** (nicht die Datenbank)
2. Gehe zu **"Settings"**
3. Scrolle zu **"Deploy"** Section
4. Bei **"Start Command"** trage ein:
   ```
   cd backend && npm run start:postgres
   ```
5. Klicke **"Deploy"** (oben rechts)

### Schritt 5: Domain aufrufen

1. Im Service Dashboard, gehe zu **"Settings"**
2. Scrolle zu **"Networking"**
3. Klicke **"Generate Domain"**

Deine Backend-URL sieht dann so aus:
```
https://klassentreffen-production-xxxx.up.railway.app
```

---

## 🧪 Testen

### Health Check
Öffne in deinem Browser:
```
https://DEINE-RAILWAY-URL.up.railway.app/health
```

Sollte zurückgeben:
```json
{"status":"ok","timestamp":"2026-01-05T..."}
```

### API Endpunkte testen

```bash
# Teilnehmeranzahl
curl https://DEINE-RAILWAY-URL.up.railway.app/api/klassentreffen/count

# Alle Teilnehmer
curl https://DEINE-RAILWAY-URL.up.railway.app/api/klassentreffen/participants

# E-Mail registrieren
curl -X POST https://DEINE-RAILWAY-URL.up.railway.app/api/klassentreffen/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Michael Dabrock","email":"test@example.com"}'
```

---

## 🔗 Frontend mit Backend verbinden (Optional)

Falls du die Backend-Version nutzen möchtest:

### Option 1: Neue Version auf Strato

1. Öffne `index.html`
2. Ersetze alle `/api/` URLs mit deiner Railway-URL:
   ```javascript
   // Vorher:
   fetch('/api/klassentreffen/register', ...)

   // Nachher:
   fetch('https://DEINE-RAILWAY-URL.up.railway.app/api/klassentreffen/register', ...)
   ```
3. Deploye zu Strato:
   ```bash
   ./deploy.sh
   ```

### Option 2: Behalte statische Version

Die aktuelle Version auf Strato (`index-static.html`) funktioniert perfekt ohne Backend:
- ✅ LocalStorage Speicherung
- ✅ Word & Excel Download
- ✅ Komplett kostenlos
- ⚠️ Jeder Nutzer hat eigene Kopie

---

## 📊 Railway Dashboard

Nach dem Deployment kannst du im Railway Dashboard sehen:

- **Logs:** Echtzeit-Logs deines Backends
- **Metrics:** CPU, Memory, Network Usage
- **Variables:** Umgebungsvariablen (inkl. DATABASE_URL)
- **Deployments:** Deployment-Historie

---

## 💰 Kosten

Railway bietet:
- **$5 kostenlos pro Monat** (Starter Plan)
- Danach: **$0.000463 / GB-sec Memory + $0.000231 / vCPU-sec**

Für dieses Projekt (low traffic):
- Geschätzt: **~$2-5 pro Monat**
- Für 133 Klassenkameraden völlig ausreichend

---

## 🆘 Troubleshooting

### Backend startet nicht?

**Logs prüfen:**
1. Railway Dashboard → Dein Service
2. Klicke auf "Deployments"
3. Wähle letztes Deployment
4. Siehe Logs

**Häufige Fehler:**

1. **"DATABASE_URL not found"**
   - Lösung: PostgreSQL Datenbank noch nicht hinzugefügt
   - Füge PostgreSQL hinzu wie in Schritt 3

2. **"Cannot find module 'pg'"**
   - Lösung: package.json nicht richtig geladen
   - Sollte nicht passieren (bereits gefixt)

3. **"Port already in use"**
   - Lösung: Railway setzt PORT automatisch
   - Kein Problem, ignorieren

### Verbindung schlägt fehl?

**CORS prüfen:**
Backend hat bereits CORS aktiviert für alle Domains.

**URL prüfen:**
Stelle sicher, dass du `https://` verwendest, nicht `http://`

---

## 🎯 Alternative: Render.com

Falls Railway nicht funktioniert:

1. **https://render.com**
2. "New" → "Web Service"
3. Connect GitHub: `md20210/Klassentreffen`
4. **Build Command:** `cd backend && npm install`
5. **Start Command:** `cd backend && npm run start:postgres`
6. "New" → "PostgreSQL" (separate)
7. Add Environment Variable: `DATABASE_URL` = [DB URL]

---

## ✅ Fertig!

Nach diesem Setup hast du:

| Component | URL | Features |
|-----------|-----|----------|
| **Frontend (Strato)** | www.dabrock.info/Klassentreffen | Statisch, LocalStorage |
| **Backend (Railway)** | Auto-generiert | PostgreSQL, API |
| **GitHub** | github.com/md20210/Klassentreffen | Source Code |
| **Database** | Railway PostgreSQL | 133 Namen, E-Mails |

**Aktueller Status:**
Die statische Version funktioniert bereits perfekt ohne Railway! Railway ist nur nötig, wenn du zentrale Datenspeicherung möchtest.

---

**Viel Erfolg! 🎉**
