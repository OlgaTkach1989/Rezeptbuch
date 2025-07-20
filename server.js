const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const { pool } = require('./db');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.get('/api/rezepte', async (req, res) => {
    const { zutat, name } = req.query;
    try {
        let sql = `
            SELECT rezepte.id, rezepte.name, rezepte.bild_url, rezepte.anleitung, rezepte.bewertung,
                rezepte.zeit, rezepte.schwierigkeit,
                zutaten.name AS zutat
            FROM rezepte
            LEFT JOIN zutaten ON rezepte.id = zutaten.rezept_id
        `;

        const [rows] = await pool.query(sql);

        const rezepteMap = new Map();

        for (const row of rows) {
            if (!rezepteMap.has(row.id)) {
               rezepteMap.set(row.id, {
                id: row.id,
                name: row.name,
                bild_url: row.bild_url,
                anleitung: row.anleitung,
                bewertung: row.bewertung,
                zeit: row.zeit,
                schwierigkeit: row.schwierigkeit,
                zutaten: [],
            });
            }
            if (row.zutat) {
                rezepteMap.get(row.id).zutaten.push(row.zutat);
            }
        }

     
        let result = Array.from(rezepteMap.values());
        if (name) {
            result = result.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
        }
        if (zutat) {
            result = result.filter(r =>
                r.zutaten.some(z => z.toLowerCase().includes(zutat.toLowerCase()))
            );
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Fehler beim Abrufen der Rezepte' });
    }
});


app.post("/api/rezepte", async (req, res) => {
    const { name, bild_url, anleitung, bewertung, zeit, schwierigkeit, zutaten } = req.body;

    try {
       
        const [result] = await pool.query(
            `INSERT INTO rezepte (name, bild_url, anleitung, bewertung, zeit, schwierigkeit)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [name, bild_url, anleitung, bewertung, zeit, schwierigkeit]
        );

        const rezeptId = result.insertId;

        
        if (zutaten && Array.isArray(zutaten)) {
            for (const zutat of zutaten) {
                await pool.query(
                    `INSERT INTO zutaten (name, rezept_id) VALUES (?, ?)`,
                    [zutat, rezeptId]
                );
            }
        }

        res.status(201).json({ message: "Rezept gespeichert", id: rezeptId, name, bild_url, anleitung, bewertung, zeit, schwierigkeit, zutaten});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fehler beim Speichern des Rezepts" });
    }
});


// app.post('/api/rezepte/:id/rate', async (req, res) => {
//     const rezeptId = req.params.id;
//     const { rating } = req.body;

//     if (!rating || rating < 1 || rating > 5) {
//         return res.status(400).json({ error: 'Bewertung muss zwischen 1 und 5 sein' });
//     }

//     try {
//         const [result] = await pool.execute(
//             'UPDATE rezepte SET bewertung = ? WHERE id = ?',
//             [rating, rezeptId]
//         );
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: 'Rezept nicht gefunden' });
//         }

//         res.status(200).json({ message: 'Bewertung aktualisiert' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Fehler beim Aktualisieren der Bewertung' });
//     }
// });

// Bewertung eines Rezepts aktualisieren
app.post("/api/rezepte/:id/rate", async (req, res) => {
    const rezeptId = req.params.id;
    const { bewertung } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE rezepte SET bewertung = ? WHERE id = ?`,
            [bewertung, rezeptId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Rezept nicht gefunden" });
        }

        res.status(200).json({ message: "Bewertung aktualisiert" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fehler beim Aktualisieren der Bewertung" });
    }
});

app.delete('/api/rezepte/:id', async (req, res) => {
    const rezeptId = req.params.id;
    try {
        await pool.execute('DELETE FROM rezepte WHERE id = ?', [rezeptId]);
        res.status(200).json({ message: 'Rezept gelöscht' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Fehler beim Löschen des Rezepts' });
    }
});

app.listen(port, () => {
    console.log(`✅ Backend läuft unter http://localhost:${port}`);
});
