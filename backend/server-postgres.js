const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// PostgreSQL Verbindung
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Datenbank-Tabellen erstellen
async function initDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS participants (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL UNIQUE,
                email TEXT,
                registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Tabelle participants ist bereit.');
        await insertInitialNames();
    } catch (err) {
        console.error('Fehler beim Erstellen der Tabelle:', err);
    }
}

// Alle Namen in die Datenbank einfügen
async function insertInitialNames() {
    const names = [
        "Carsten Dobschall", "Michael Dütting", "Ansgar Ellermann", "Irene Etmann (jetzt: Bils)",
        "Klaus Gunnemann", "Stefan Hille", "Peter Hoppe", "Martina Höptner (jetzt: Hecker)",
        "Stephan Horstmann", "Ralf Huihsen", "Stephan Kappen", "Klaus Klöker",
        "Bernd Kottmann", "Klaus Loskant", "Sabine Lünnemann (jetzt: Vortkamp)", "Andreas Menke",
        "Stephan Quiel", "Roland Rietkoetter", "Olaf Saphörster", "Annette Schwarte",
        "Andre Sickmann", "Thomas Siebert", "Eike Silvester Wiemann", "Magnus Wolke",
        "Heinz Wöstmann", "Gernot Becker", "Christiane Buck (jetzt: Schmidt)", "Michael Dabrock",
        "Jochen Dahm", "Melanie Dörholt", "Birgit Dohmen (jetzt: Decker)", "Patric Droste zu Senden",
        "Roman Feil", "Georg Fels", "Andreas Golf", "Klaus Günther",
        "Volker Hahn", "Karin Harnisch", "Frank Kloppenburg", "Dirk Köwener",
        "Harald Kröger", "Peter Lahrkamp", "Bernd Lehmann", "Katrin Lumma",
        "Mechthild Lütke Kleimann", "Silke Mersmann (jetzt: Born)", "Dirk Neufelder", "Ursula Neumann",
        "Josef Niehoff", "Stefan Niggemeyer", "Gerhard Nowak", "Madueke Okegwo",
        "Renate Ostermeyer", "Bettina Otto", "Mechthild Rickert", "Axel Ritter",
        "Eva Sandhage (jetzt: Wehmeyer-Sandhage)", "Ralf Schupp", "Bettina Seidensticker", "Martin Sommermeyer",
        "Peter Sperling", "Wolfgang Spille", "Benedikt Sudbrock", "Thomas Terrahe",
        "Volker Welp", "Susanne Wettwer", "Uwe Wilme", "Reinhold Albrecht",
        "Peter Alt-Epping", "Konstanze Bader", "Michael Beneke", "Marc Böddecker",
        "Georg Bratke", "Carsten Brüning", "Andreas Döpp", "Jürgen Dorgeist",
        "Oliver Dütschke", "Dirk Eberhardt", "Reinhild Erling", "Marie-Luise Ernst (jetzt: Terrahe)",
        "Mathias Eßing", "Karsten Evers", "Christian Fischer", "Sabine Gädeke",
        "Veronica Gohl", "Anne Grewe (jetzt: Vetter)", "Monika Haye (jetzt: Gaedeke)", "Jörg Hecker",
        "Andrea Heller", "Ingo Hentschel", "Jörg Hesselink", "Annegret Hobbeling",
        "Markus Hock", "Thomas Hörnemann", "Bettina Horstmann", "Volker Hund",
        "Marcus Janotta", "Stephan Kehr", "Renate Kellers (jetzt:? Herzog)", "Martin Kintrup",
        "Annette Knirim", "Bernd Korves", "Michael Laermann", "Petra Lindner (jetzt: Hubeny-Lindner)",
        "Dominik Löer", "Friedrich Lührmann", "Arno Lutz", "David Lützenkirchen",
        "Henning Meißner", "Frank Mense", "Thomas Mertens", "Matthias Michalczyk",
        "Oliver Müllmann", "Anja Neumann-Wedekindt", "Jürgen Proch", "David Rehmann",
        "Katrin Richter", "Barbara Sauer", "Fabian Sauerwald", "Tobias Sauerwald",
        "Klaus Schaphorn", "Thomas Schleicher", "Anne Schlummer", "Frank Schulte",
        "Ludger Schwarte", "Harald Siegmund", "Andreas Südbeck", "Helmut Südmersen",
        "Wolfgang Thomas", "Clarus von der Horst", "Kai Wengler", "Melanie Wessels",
        "Roland Wilmes"
    ];

    try {
        for (const name of names) {
            await pool.query(
                'INSERT INTO participants (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
                [name]
            );
        }
        console.log('Alle Namen wurden in die Datenbank eingefügt.');
    } catch (err) {
        console.error('Fehler beim Einfügen der Namen:', err);
    }
}

// API Endpunkte

// E-Mail-Adresse registrieren
app.post('/api/klassentreffen/register', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name und E-Mail sind erforderlich.' });
    }

    // E-Mail validieren
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
    }

    try {
        const result = await pool.query(
            'UPDATE participants SET email = $1, registered_at = CURRENT_TIMESTAMP WHERE name = $2 RETURNING *',
            [email, name]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Name nicht gefunden.' });
        }

        res.json({
            success: true,
            message: 'E-Mail erfolgreich registriert!',
            name: name,
            email: email
        });
    } catch (err) {
        console.error('Fehler beim Aktualisieren:', err);
        res.status(500).json({ error: 'Datenbankfehler.' });
    }
});

// Anzahl der registrierten Teilnehmer abrufen
app.get('/api/klassentreffen/count', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT COUNT(*) as count FROM participants WHERE email IS NOT NULL'
        );
        res.json({ count: parseInt(result.rows[0].count) });
    } catch (err) {
        console.error('Fehler beim Abrufen der Anzahl:', err);
        res.status(500).json({ error: 'Datenbankfehler.' });
    }
});

// Alle Teilnehmer abrufen (für Admin)
app.get('/api/klassentreffen/participants', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT name, email, registered_at FROM participants ORDER BY name'
        );
        res.json({ participants: result.rows });
    } catch (err) {
        console.error('Fehler beim Abrufen der Teilnehmer:', err);
        res.status(500).json({ error: 'Datenbankfehler.' });
    }
});

// Registrierte Teilnehmer abrufen (nur mit E-Mail)
app.get('/api/klassentreffen/registered', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT name, email, registered_at FROM participants WHERE email IS NOT NULL ORDER BY registered_at DESC'
        );
        res.json({ registered: result.rows });
    } catch (err) {
        console.error('Fehler beim Abrufen der registrierten Teilnehmer:', err);
        res.status(500).json({ error: 'Datenbankfehler.' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Datenbank initialisieren und Server starten
initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server läuft auf Port ${PORT}`);
        console.log(`Klassentreffen-Seite: http://localhost:${PORT}/index.html`);
    });
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await pool.end();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Shutting down gracefully...');
    await pool.end();
    process.exit(0);
});
