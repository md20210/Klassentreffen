# 40-jähriges Abi-Treffen vom Ratsgymnasium
## E-Mail-Sammlung für Organisation und Einladung

Eine Webseite zur Sammlung von E-Mail-Adressen für das 40-jährige Abitur-Jubiläum.

## Features

- Motivierende Webseite mit modernem Design
- 133 vordefinierte Namen aus der Klassenliste
- E-Mail-Adresse für jeden Namen individuell änderbar
- Automatisches Speichern im Browser (LocalStorage)
- Download als Word-Dokument (.doc)
- Download als Excel-Datei (.csv)
- Live-Anzeige der Teilnehmerzahl
- Vollständig statisch - kein Backend erforderlich
- Mobile-optimiert

## Zwei Versionen verfügbar

### Version 1: Statische Version (empfohlen für Strato)
**Datei:** `index-static.html`

Diese Version:
- Speichert alle Daten im Browser (LocalStorage)
- Benötigt kein Backend oder Datenbank
- Funktioniert auf jedem Webhosting
- Jeder Besucher hat seine eigene lokale Kopie
- Perfekt für einfaches Deployment auf Strato

### Version 2: Backend-Version
**Dateien:** `index.html` + `backend/server.js`

Diese Version:
- Zentrale Datenbank (SQLite)
- Node.js Backend erforderlich
- Alle Teilnehmer sehen dieselben Daten
- RESTful API

## Deployment auf Strato

### Statische Version deployen (empfohlen):

```bash
# Deploy-Script ausführen
chmod +x deploy.sh
./deploy.sh
```

Oder manuell via SFTP:
- Server: `5018735097.ssh.w2.strato.hosting`
- User: `su403214`
- Passwort: `deutz15!2000`
- Zielverzeichnis: `dabrock-info/Klassentreffen/`
- Datei hochladen: `index-static.html` → umbenennen zu `index.html`

Die Seite ist dann erreichbar unter: `https://www.dabrock.info/Klassentreffen`

## Backend-Version (lokal testen)

```bash
cd backend
npm install
npm start
```

Die Webseite ist dann unter `http://localhost:3000` erreichbar.

### API Endpunkte

- `POST /api/klassentreffen/register` - E-Mail-Adresse registrieren
- `GET /api/klassentreffen/count` - Anzahl registrierter Teilnehmer
- `GET /api/klassentreffen/participants` - Alle Teilnehmer (Admin)
- `GET /api/klassentreffen/registered` - Nur registrierte Teilnehmer

## Verwendung

1. Öffne die Webseite: `https://www.dabrock.info/Klassentreffen`
2. Trage E-Mail-Adressen direkt in der Tabelle ein
3. Änderungen werden automatisch gespeichert
4. Download-Buttons für Word oder Excel nutzen

## Technologie-Stack

### Statische Version:
- HTML5, CSS3, JavaScript
- LocalStorage für Datenspeicherung
- Keine Server-Anforderungen

### Backend-Version:
- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express
- Datenbank: SQLite
- Hosting: Strato (Frontend) / Beliebig (Backend)

## Struktur

```
Klassentreffen/
├── index-static.html          # Statische Version (für Strato)
├── index.html                 # Backend-Version (Frontend)
├── backend/
│   ├── server.js             # Express Server
│   ├── package.json          # Dependencies
│   └── klassentreffen.db     # SQLite Datenbank (auto-generiert)
├── deploy.sh                  # Deployment-Script für Strato
├── .gitignore
└── README.md
```

## Autor

Michael Dabrock

---

**Projekt:** 40-jähriges Abi-Treffen vom Ratsgymnasium
**URL:** https://www.dabrock.info/Klassentreffen
