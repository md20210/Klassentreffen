# Quick Deploy - GitHub & Railway

## ✅ Status

- [x] Code fertig
- [x] Git committed (3 commits ready)
- [x] Strato deployed ✅ https://www.dabrock.info/Klassentreffen
- [x] Git remote configured (git@github.com:md20210/Klassentreffen.git)
- [ ] GitHub Repository erstellen
- [ ] Push to GitHub
- [ ] Railway Deployment

## Schritt 1: GitHub Repository erstellen (30 Sekunden)

**Klicke auf diesen Link:**
https://github.com/new?name=Klassentreffen&description=40-j%C3%A4hriges%20Abi-Treffen%20vom%20Ratsgymnasium%20-%20E-Mail-Sammlung&visibility=public

**Dann:**
1. ✓ Name ist schon eingetragen: `Klassentreffen`
2. ✓ Description ist schon eingetragen
3. ✓ Public ist ausgewählt
4. ✗ **WICHTIG:** KEIN README, .gitignore oder License hinzufügen
5. Klicke "Create repository"

## Schritt 2: Push to GitHub (10 Sekunden)

Sobald das Repository erstellt ist, führe aus:

```bash
cd /home/micha/Klassentreffen
git push -u origin master
```

Fertig! Code ist auf GitHub.

## Schritt 3: Railway Deployment (2 Minuten) - Optional

Für PostgreSQL Backend:

**Klicke auf:**
https://railway.app/new

**Dann:**
1. Login mit GitHub
2. "Deploy from GitHub repo"
3. Wähle: `md20210/Klassentreffen`
4. Warte bis deployed
5. Klicke "+ New" → "Database" → "PostgreSQL"
6. Im Service → "Settings" → "Deploy":
   - Start Command: `cd backend && npm run start:postgres`
7. Speichern

Fertig! Backend ist live.

## Alternative: Ohne Railway (Nur statische Version)

Die statische Version auf Strato funktioniert bereits komplett ohne Backend:
✅ https://www.dabrock.info/Klassentreffen

Features:
- Alle 133 Namen
- E-Mail-Adressen editierbar
- Download als Word & Excel
- LocalStorage (jeder Nutzer hat seine eigene Kopie)

---

## One-Liner für GitHub Push

Nachdem Repository auf GitHub erstellt wurde:

```bash
cd /home/micha/Klassentreffen && git push -u origin master
```

Das war's! 🎉
