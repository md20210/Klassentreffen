const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Datenbank initialisieren
const db = new sqlite3.Database('./klassentreffen.db', (err) => {
    if (err) {
        console.error('Fehler beim Öffnen der Datenbank:', err.message);
    } else {
        console.log('Verbunden mit der SQLite-Datenbank.');
        initDatabase();
    }
});

// Datenbank-Tabellen erstellen
function initDatabase() {
    // Tabelle für Teilnehmer
    db.run(`
        CREATE TABLE IF NOT EXISTS participants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            email TEXT,
            registered_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Fehler beim Erstellen der Tabelle participants:', err.message);
        } else {
            console.log('Tabelle participants ist bereit.');
            insertInitialNames();
        }
    });
}

// Alle Namen in die Datenbank einfügen
function insertInitialNames() {
    const names = [
        "Carsten Dobschall",
        "Michael Dütting",
        "Ansgar Ellermann",
        "Irene Etmann (jetzt: Bils)",
        "Klaus Gunnemann",
        "Stefan Hille",
        "Peter Hoppe",
        "Martina Höptner (jetzt: Hecker)",
        "Stephan Horstmann",
        "Ralf Huihsen",
        "Stephan Kappen",
        "Klaus Klöker",
        "Bernd Kottmann",
        "Klaus Loskant",
        "Sabine Lünnemann (jetzt: Vortkamp)",
        "Andreas Menke",
        "Stephan Quiel",
        "Roland Rietkoetter",
        "Olaf Saphörster",
        "Annette Schwarte",
        "Andre Sickmann",
        "Thomas Siebert",
        "Eike Silvester Wiemann",
        "Magnus Wolke",
        "Heinz Wöstmann",
        "Gernot Becker",
        "Christiane Buck (jetzt: Schmidt)",
        "Michael Dabrock",
        "Jochen Dahm",
        "Melanie Dörholt",
        "Birgit Dohmen (jetzt: Decker)",
        "Patric Droste zu Senden",
        "Roman Feil",
        "Georg Fels",
        "Andreas Golf",
        "Klaus Günther",
        "Volker Hahn",
        "Karin Harnisch",
        "Frank Kloppenburg",
        "Dirk Köwener",
        "Harald Kröger",
        "Peter Lahrkamp",
        "Bernd Lehmann",
        "Katrin Lumma",
        "Mechthild Lütke Kleimann",
        "Silke Mersmann (jetzt: Born)",
        "Dirk Neufelder",
        "Ursula Neumann",
        "Josef Niehoff",
        "Stefan Niggemeyer",
        "Gerhard Nowak",
        "Madueke Okegwo",
        "Renate Ostermeyer",
        "Bettina Otto",
        "Mechthild Rickert",
        "Axel Ritter",
        "Eva Sandhage (jetzt: Wehmeyer-Sandhage)",
        "Ralf Schupp",
        "Bettina Seidensticker",
        "Martin Sommermeyer",
        "Peter Sperling",
        "Wolfgang Spille",
        "Benedikt Sudbrock",
        "Thomas Terrahe",
        "Volker Welp",
        "Susanne Wettwer",
        "Uwe Wilme",
        "Reinhold Albrecht",
        "Peter Alt-Epping",
        "Konstanze Bader",
        "Michael Beneke",
        "Marc Böddecker",
        "Georg Bratke",
        "Carsten Brüning",
        "Andreas Döpp",
        "Jürgen Dorgeist",
        "Oliver Dütschke",
        "Dirk Eberhardt",
        "Reinhild Erling",
        "Marie-Luise Ernst (jetzt: Terrahe)",
        "Mathias Eßing",
        "Karsten Evers",
        "Christian Fischer",
        "Sabine Gädeke",
        "Veronica Gohl",
        "Anne Grewe (jetzt: Vetter)",
        "Monika Haye (jetzt: Gaedeke)",
        "Jörg Hecker",
        "Andrea Heller",
        "Ingo Hentschel",
        "Jörg Hesselink",
        "Annegret Hobbeling",
        "Markus Hock",
        "Thomas Hörnemann",
        "Bettina Horstmann",
        "Volker Hund",
        "Marcus Janotta",
        "Stephan Kehr",
        "Renate Kellers (jetzt:? Herzog)",
        "Martin Kintrup",
        "Annette Knirim",
        "Bernd Korves",
        "Michael Laermann",
        "Petra Lindner (jetzt: Hubeny-Lindner)",
        "Dominik Löer",
        "Friedrich Lührmann",
        "Arno Lutz",
        "David Lützenkirchen",
        "Henning Meißner",
        "Frank Mense",
        "Thomas Mertens",
        "Matthias Michalczyk",
        "Oliver Müllmann",
        "Anja Neumann-Wedekindt",
        "Jürgen Proch",
        "David Rehmann",
        "Katrin Richter",
        "Barbara Sauer",
        "Fabian Sauerwald",
        "Tobias Sauerwald",
        "Klaus Schaphorn",
        "Thomas Schleicher",
        "Anne Schlummer",
        "Frank Schulte",
        "Ludger Schwarte",
        "Harald Siegmund",
        "Andreas Südbeck",
        "Helmut Südmersen",
        "Wolfgang Thomas",
        "Clarus von der Horst",
        "Kai Wengler",
        "Melanie Wessels",
        "Roland Wilmes"
    ];

    const stmt = db.prepare('INSERT OR IGNORE INTO participants (name) VALUES (?)');

    names.forEach(name => {
        stmt.run(name, (err) => {
            if (err && !err.message.includes('UNIQUE constraint')) {
                console.error('Fehler beim Einfügen von', name, ':', err.message);
            }
        });
    });

    stmt.finalize(() => {
        console.log('Alle Namen wurden in die Datenbank eingefügt.');
    });
}

// API Endpunkte

// E-Mail-Adresse registrieren
app.post('/api/klassentreffen/register', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name und E-Mail sind erforderlich.' });
    }

    // E-Mail validieren
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
    }

    db.run(
        'UPDATE participants SET email = ?, registered_at = CURRENT_TIMESTAMP WHERE name = ?',
        [email, name],
        function(err) {
            if (err) {
                console.error('Fehler beim Aktualisieren:', err.message);
                return res.status(500).json({ error: 'Datenbankfehler.' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: 'Name nicht gefunden.' });
            }

            res.json({
                success: true,
                message: 'E-Mail erfolgreich registriert!',
                name: name,
                email: email
            });
        }
    );
});

// Anzahl der registrierten Teilnehmer abrufen
app.get('/api/klassentreffen/count', (req, res) => {
    db.get(
        'SELECT COUNT(*) as count FROM participants WHERE email IS NOT NULL',
        [],
        (err, row) => {
            if (err) {
                console.error('Fehler beim Abrufen der Anzahl:', err.message);
                return res.status(500).json({ error: 'Datenbankfehler.' });
            }

            res.json({ count: row.count });
        }
    );
});

// Alle Teilnehmer abrufen (für Admin)
app.get('/api/klassentreffen/participants', (req, res) => {
    db.all(
        'SELECT name, email, registered_at FROM participants ORDER BY name',
        [],
        (err, rows) => {
            if (err) {
                console.error('Fehler beim Abrufen der Teilnehmer:', err.message);
                return res.status(500).json({ error: 'Datenbankfehler.' });
            }

            res.json({ participants: rows });
        }
    );
});

// Registrierte Teilnehmer abrufen (nur mit E-Mail)
app.get('/api/klassentreffen/registered', (req, res) => {
    db.all(
        'SELECT name, email, registered_at FROM participants WHERE email IS NOT NULL ORDER BY registered_at DESC',
        [],
        (err, rows) => {
            if (err) {
                console.error('Fehler beim Abrufen der registrierten Teilnehmer:', err.message);
                return res.status(500).json({ error: 'Datenbankfehler.' });
            }

            res.json({ registered: rows });
        }
    );
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
    console.log(`Klassentreffen-Seite: http://localhost:${PORT}/index.html`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Fehler beim Schließen der Datenbank:', err.message);
        } else {
            console.log('Datenbankverbindung geschlossen.');
        }
        process.exit(0);
    });
});
