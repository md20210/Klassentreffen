# Klassentreffen E-Mail-Sammlung

Eine Webseite zur Sammlung von E-Mail-Adressen für ein Klassentreffen.

## Features

- Motivierende Webseite mit modernem Design
- 133 vordefinierte Namen aus der Klassenliste
- E-Mail-Registrierung mit Validierung
- SQLite-Datenbank zur Speicherung
- Live-Anzeige der Teilnehmerzahl
- RESTful API

## Installation

### Lokal

```bash
cd backend
npm install
npm start
```

Die Webseite ist dann unter `http://localhost:3000` erreichbar.

### Entwicklungsmodus

```bash
cd backend
npm run dev
```

## API Endpunkte

- `POST /api/klassentreffen/register` - E-Mail-Adresse registrieren
- `GET /api/klassentreffen/count` - Anzahl registrierter Teilnehmer
- `GET /api/klassentreffen/participants` - Alle Teilnehmer (Admin)
- `GET /api/klassentreffen/registered` - Nur registrierte Teilnehmer

## Deployment auf Strato

Die Seite wird unter `www.dabrock.info/Klassentreffen` bereitgestellt.

## Technologie-Stack

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express
- Datenbank: SQLite
- Hosting: Strato

## Autor

Michael Dabrock
