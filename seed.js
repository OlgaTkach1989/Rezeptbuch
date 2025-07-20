const { pool } = require('./db');


let rezepte = [
  {
        name: "Spaghetti Carbonara",
        bild_url: "https://img.chefkoch-cdn.de/rezepte/1298241234947062/bilder/1590571/crop-960x540/carbonara-wie-bei-der-mamma-in-rom.jpg",
        zutaten: ["200g Spaghetti", "100g Pancetta", "2 Eigelb", "50g Parmesan"],
        anleitung: "1. Nudeln kochen. 2. Pancetta anbraten. 3. Eigelb und Käse mischen. 4. Alles vermengen.",
        zeit: "20 Min",
        schwierigkeit: "leicht",
        bewertung: 5
    },
    {
        name: "Pfannkuchen",
        bild_url: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=2070",
        zutaten: ["250g Mehl", "2 Eier", "500ml Milch", "1 Prise Salz"],
        anleitung: "1. Alle Zutaten zu einem glatten Teig verrühren. 2. In einer heißen Pfanne goldbraun ausbacken.",
        zeit: "40 Min",
        schwierigkeit: "leicht",
        bewertung: 4
    },
    {
        name: "Bester Pizzateig",
        bild_url: "https://img.chefkoch-cdn.de/rezepte/4199371675773502/bilder/1494915/crop-642x428/bester-pizzateig.jpg",
        zutaten: ["500 g	Weizenmehl Type 405 oder 550", "300 g	Wasser, lauwarmes", "13 g	Salz", "20 g	Frischhefe oder 7 g Trockenhefe", "13 g	Olivenöl", "5 g	Zucker"],
        anleitung: "1. Wiege 300 g lauwarmes Wasser in einer großen Schüssel ab. 2. Löse die Hefe und den Zucker im Wasser auf. 3. Gib ca. 1/3 der gesamten Mehlmenge dazu und rühre mit der Hand. Die Konsistenz soll ähnlich einem Pancake-Teig sein. Eine dickflüssige Creme. Das Mehl schützt die Hefe vor der Salzzugabe im nächsten Schritt. 4. Gib das Salz zum noch flüssigen Teig und löse es auf. 5. Arbeite nach und nach das restliche Mehl ein. Bitte nicht alles auf einmal dazugeben. Wirklich langsam, Schritt für Schritt einarbeiten. Das Mehl benötigt Zeit, um das Wasser zu absorbieren. 6.Wenn das komplette Mehl eingearbeitet ist, gib 12 g Öl dazu und arbeite es ein. 7. Wenn alle Zutaten vermengt sind, solltest du einen groben, leicht klebrigen Teig erhalten. Keine Sorge, das soll so sein! Deck die Schüssel mit Klarsichtfolie luftdicht ab und lass den Teig 15 Minuten ruhen. 8. Nimm den Teig aus der Schüssel und lege ihn auf eine saubere und trockene Arbeitsfläche. Nun knete bzw. massiere den Teig für 1 - 2 Minuten ganz leicht mit Gefühl und forme eine große Kugel. Du solltest spüren, dass der Teig durch das leichte Kneten steifer und schön glatt wird. 9. Streiche den Teig mit etwas Olivenöl ein und decke ihn vollständig mit Frischhaltefolie ab (nicht mit einem feuchten Tuch!). 10. Lass den Teig als Gesamtmasse ca. 30 - 50 % im Volumen zugedeckt wachsen. Das dauert ca. 30 - 60 Minuten, je nach Raumtemperatur. Während diese Ruhe- und Wachstumsphase entwickelt der Teig Stabilität und Geschmack.",
        zeit: "30 Min",
        schwierigkeit: "leicht",
        bewertung: 3
    },

     {
        name: "Kartoffel-Hack-Auflauf mit Speckkruste",
        bild_url: "https://img.chefkoch-cdn.de/rezepte/1665531274697031/bilder/1075318/crop-642x428/kartoffel-hack-auflauf-mit-speckkruste.jpg",
        zutaten: ["2 große	Zwiebel(n)", "400 g	Hackfleisch, gemischt", "1 EL Tomatenmark", "Salz und Pfeffer, schwarzer", "200 g	Frühstücksspeck, in dünnen Scheiben", "750 g Kartoffel(n)", "2 EL	Mehl", "6 Scheibe/n	Raclettekäse", "evtl. Majoran zum Garnieren"],
        anleitung: "1. Die Zwiebeln schälen und grob raspeln. 1/3 mit Hack, Tomatenmark, Salz und Pfeffer verkneten. Eine Auflaufform (ca. 30 cm lang) mit den Speckscheiben auslegen, dabei 3 cm über den Rand hängen lassen. 2. Die Kartoffeln schälen, waschen und grob raspeln. Die Kartoffeln gut ausdrücken. Den Rest der Zwiebeln und das Mehl untermischen, würzen. 3. Die Hälfte der Kartoffelmasse in der Form verteilen. Den Käse entrinden. 4 Scheiben auf die Kartoffeln legen, die Hackfleischmasse darauf verteilen, leicht andrücken. Den Rest der Kartoffeln darüber verteilen. Die überstehenden Speckscheiben darüber klappen. Die restlichen Käsescheiben in Streifen schneiden und darüber streuen. 4. Im vorgeheizten Ofen auf der mittleren Schiene (Ober-/Unterhitze: 200° C, Umluft: 175°C, Gas: Stufe 3) in 45 - 50 Minuten goldbraun backen. 5. Mit Majoran garnieren. Dazu schmeckt ein grüner Salat.",
        zeit: "45 Min",
        schwierigkeit: "leicht",
        bewertung: 5
    },

     {
        name: "Sauerkrautsuppe mit Paprika und Kasseler",
        bild_url: "https://img.chefkoch-cdn.de/images/crop-958x539/content/f/270734/42429a4d69/ck0317_fitgesund_sauerkrautsuppe.jpg",
        zutaten: ["etwas	Öl", "3	Frühlingszwiebel(n) oder 1 Zwiebel", "1	Paprikaschote(n), rote", "300 g	Kasseler ohne Knochen (Vegetarier können ohne Probleme das Kasseler weglassen!)", "500 g	Sauerkraut", "1 Liter	Gemüsebrühe", "200 g	Crème fraîche", "1 TL	Kräuter der Provence, getrocknet", "Salz und Pfeffer"],
        anleitung: "1. Das Öl in einem Kochtopf erhitzen und die klein geschnittenen Frühlingszwiebeln darin anbraten. Die Paprikaschote in kleine Würfel schneiden und hinzugeben. Auch das Kasseler in Würfel schneiden, in den Topf geben und gelegentlich umrühren. Jetzt das Sauerkraut kreuzweise sehr fein schneiden (ca. 1 - 2 cm Streifen) und mit den anderen Zutaten anschwitzen. Die Gemüsebrühe angießen, aufkochen lassen und bei geschlossenem Deckel die Suppe etwa 20 Minuten köcheln lassen. 2. Danach von der Kochstelle nehmen, die Kräuter und die Crème fraîche unterrühren und die Suppe mit Salz und Pfeffer abschmecken.",
        zeit: "40 Min",
        schwierigkeit: "mittelschwer",
        bewertung: 4
    },

     {
        name: "Antipasti - Nudelsalat",
        bild_url: "https://img.chefkoch-cdn.de/images/crop-958x539/content/f/270734/1200x675/34e8172887/antipasti_nudelsalat.jpg",
        zutaten: ["250 g	Nudeln, vorzugsweise kurze (Penne, Rigatoni, Farfalle....) oder auch bunte Nudeln", "350 g	Gemüse (Antipasti - Gemüse) in Öl eingelegte, abgetropfte, gemischt wie z. B.", "Artischocke(n)", "Paprikaschote(n), (geröstete)", "Tomate(n), getrocknete", "1	Knoblauchzehe(n), zerdrückt (optional), evtl. mehr", "2 TL	Kapern", "15	Oliven ohne Stein, grün und schwarz. evtl. mehr", "4 EL	Kräuter, frische (Basilikum, Petersilie, Minze...)", "2 EL	Essig, evtl. 3 (Weißweinessig und Balsamico (weiß) gemischt)", "2 TL	Pesto (Basilikumpesto, Bärlauchpesto...)", "1 TL, gestr. Salz", "Pfeffer, aus der Mühle", "Cayennepfeffer oder", "Chili, aus der Mühle oder", "Paprikapulver, scharf", "etwas	Zucker", "etwas	Zitronensaft"],
        anleitung: "1. Die Nudeln al dente kochen, die Antipasti/Gemüse in die gewünschte Größe schneiden und alles mit Essig, Kräutern, Pesto, evtl. Knoblauch und Gewürzen vermischen. Ölzugabe ist nicht mehr unbedingt nötig. Wichtig ist, dass der Salat etwa 1/2 Stunde durchziehen kann, danach noch einmal abschmecken, besonders beim Essig kann ein Nachwürzen nötig sein, je nachdem, was die Antipasti schon mitbringen. (Es gibt sie übrigens offen zu kaufen auf Märkten oder im Supermarkt, oder auch in Gläsern). 2. Welche Gemüse man nimmt, ist absolut beliebig (auch eingelegte Zucchini, Champignons oder Auberginen passen natürlich). Auch die Mengenangabe für das Gemüse ist nur ein Anhaltspunkt - man kann mehr oder auch weniger davon nehmen, Knoblauch oder Kapern weglassen etc. Auch das Pesto ist kein 'Muss', es geht auch nur mit Kräutern. Der Fantasie sind hier keine Grenzen gesetzt. 3. Der Salat schmeckt nur mit Gemüse sehr gut, man kann ihn aber auch noch mit Mozzarella, Schafskäse oder kleingeschnittener italienischer Salami, sogar mit eingelegtem Tintenfisch oder Tunfisch anreichern (bei Mozzarella etwas kräftiger würzen, bei Schafskäse evtl. mit dem Salz vorsichtiger sein!) 4. Wer will, kann auch noch geröstete Pinienkerne über den Salat geben und noch mal Pfeffer darüber mahlen. Parmesanspäne habe ich auch probiert, fand aber die Kombination mit dem Essig nicht so gelungen. Viel Spaß beim Experimentieren! Ich gebe zum Schluss auf dem Teller immer noch etwas (weißen) Balsamico aus dem Essigsprüher darüber. Die gleiche Zubereitungsart funktioniert auch sehr gut mit Couscous statt mit Nudeln.",
        zeit: "20 Min",
        schwierigkeit: "leicht",
        bewertung: 5
    },

     {
        name: "Spaghetti aglio, olio e peperoncino",
        bild_url: "https://img.chefkoch-cdn.de/images/crop-958x539/content/f/270734/1200x675/753648acba/spaghetti_aglio_olio.jpg",
        zutaten: ["300 g	Spaghetti", "4	Knoblauchzehe(n)", "½ Bund	Petersilie, glatte", "3	Chilischote(n), getrocknete", "1	Bio-Zitrone(n)", "6 EL	Olivenöl", "etwas	Meersalz und Pfeffer, bunter, aus der Mühle"],
        anleitung: "1. Die Spaghetti in Salzwasser bissfest kochen. 2. Inzwischen die Knoblauchzehen abziehen und in Scheiben schneiden. Die Petersilie waschen, trocken schütteln und die Blättchen abzupfen. Die Chilischoten zerstoßen. Die Zitrone heiß waschen und in Scheiben schneiden. 3. Die Spaghetti abgießen und abtropfen lassen. 4. In einer großen Pfanne das Olivenöl erhitzen. Knoblauch, Petersilienblättchen und Chili kurz darin anbraten, die Zitronenscheiben dazugeben und mitbraten. Die Spaghetti dazugeben und darin schwenken. Mit Meersalz und Pfeffer würzen. 5. Vor dem Servieren die Zitronenscheiben herausnehmen.",
        zeit: "10 Min",
        schwierigkeit: "leicht",
        bewertung: 5
    },

     {
        name: "15 Minuten Gemüse-Nudel-Suppe",
        bild_url: "https://img.chefkoch-cdn.de/images/crop-958x539/content/f/270734/1200x675/4bc4c46c35/15-minuten-gemuese-nudel-suppe.jpg",
        zutaten: ["1,4 Liter	Gemüsebouillon, selbstgemacht oder Brühwürfel", "100 g	Nudeln", "1 kleine	Zwiebel(n)", "2	Möhre(n)", "1 m.-große	Zucchini", "1	Paprikaschote(n), gelbe", "4	Tomate(n), reife", "etwas	Pfeffer und weitere Gewürze nach Belieben und Geschmack", "etwas	Schnittlauch, fein geschnitten", "etwas	Petersilie, fein geschnitten", "etwas	Öl zum Braten"],
        anleitung: "1. In einem Topf etwas Öl erhitzen. Zwiebel pellen, klein schneiden und im heißen Öl ca. 3 Min. anschwitzen. Gemüsebrühe hineingießen und aufkochen lassen. 2. In der Zwischenzeit Möhren schälen, Zucchini waschen und beides in dünne Scheiben schneiden. Paprikaschote waschen, entkernen und in kleine Würfel schneiden. Tomaten waschen, entstielen und grob hacken. 3.Möhrenscheiben in die kochende Brühe geben und ca. 2 Min. kochen. Dann Zucchini und Nudeln hinzugeben und in ca. 7 - 10 Min. bei mittlerer Hitze bissfest kochen. Nach ca. 5 Min. die Paprika- und Tomatenwürfel hineingeben und mit Gewürzen abschmecken. 4. Die Suppe in tiefen Tellern anrichten und mit fein gehacktem Schnittlauch und Petersilie garnieren. 5. Zubereitungs-Tipp: Während die Brühe aufkocht, die Möhren direkt über dem Topf in Scheiben hobeln. Dann die Zucchini waschen und ebenfalls direkt über dem Topf hobeln. Nudeln hinzufügen und bevor die Paprika- und Tomatenwürfel rein kommen, kann z. B. schnell der Tisch gedeckt werden oder ein Teil vom Rüstgeschirr aufgeräumt werden. 6.Lecker-Schmecker-Tipp: Mit Sojasauce abschmecken. Oder Wurst oder Cervelat in Scheiben schneiden und kurz vor dem Servieren in die Suppe geben. Oder geraspelten Käse dazu servieren.",
        zeit: "15 Min",
        schwierigkeit: "mittelschwer",
        bewertung: 3
    },

     {
        name: "Pestofisch im Backofen",
        bild_url: "https://img.chefkoch-cdn.de/images/crop-958x539/content/f/270734/7d714e5d30/h5_mf_pestofisch_im_backofen.jpg",
        zutaten: ["4	Fischfilet(s) (beliebiger Seefisch, z.B. Rotbarsch)", "Zitronensaft", "1 Glas	Pesto", "100 g	Schafskäse", "13 g	Olivenöl", "3 EL	Crème fraîche", "3 EL	Emmentaler, geriebener", "1 EL	Olivenöl", "1 Bund	Petersilie", "1	Knoblauchzehe(n)", "500 g	Kartoffel(n), gegart und in Würfel geschnitten", "Thymian", "Olivenöl", "Salz", "Fett für die Form", "evtl.	Weißwein"],
        anleitung: "Achtung: Bei diesem Rezept zuerst die Kartoffeln kochen oder gekochte Reste vom Vortag verwenden. 1. Die Fischfilets nebeneinander in eine große, gefettete Form legen, mit Zitrone beträufeln und salzen. 2. Eine Paste aus Pesto, Schafskäse, Crème fraîche, Emmentaler, Olivenöl, Knoblauch und Petersilie zubereiten (geht gut im Mixer, kann aber auch von Hand fein geschnitten bzw. gehackt werden). Die Paste vorsichtig abschmecken. Salz ist meist keines mehr nötig. 3. Den Fisch mit der Paste bestreichen. In den Zwischenräumen die Kartoffelstücke verteilen, mit wenig Olivenöl beträufeln und mit Thymian bestreuen. Bei 200 °C Ober-/Unterhitze ca. 20 - 30 Minuten im Ofen braten. Sollte sich zu wenig Flüssigkeit bilden, etwas Weißwein angießen.",
        zeit: "30 Min",
        schwierigkeit: "leicht",
        bewertung: 4
    },
];


async function seed() {
  const conn = await pool.getConnection();

  try {
    for (const rezept of rezepte) {
      const [rezeptResult] = await conn.query(
        `INSERT INTO rezepte (name, bild_url, anleitung, zeit, schwierigkeit, bewertung)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [rezept.name, rezept.bild_url, rezept.anleitung, rezept.zeit, rezept.schwierigkeit, rezept.bewertung]
      );

      const rezeptId = rezeptResult.insertId;

      for (const zutat of rezept.zutaten) {
        await conn.query(
          `INSERT INTO zutaten (name, rezept_id) VALUES (?, ?)`,
          [zutat, rezeptId]
        );
      }

      console.log(`✅ Hinzugefügt: ${rezept.name}`);
    }

    console.log("🎉 Alle Rezepte erfolgreich eingefügt!");
  } catch (err) {
    console.error("❌ Fehler beim Einfügen:", err);
  } finally {
    conn.release();
    process.exit();
  }
}

seed();