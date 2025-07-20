// Schritt 1: Elemente aus dem HTML "greifen".
const rezeptGalerie = document.getElementById('rezept-galerie');
const rezeptModalTitel = document.getElementById('rezept-modal-title');
const rezeptModalBody = document.getElementById('rezept-modal-body');
const rezeptModal = new bootstrap.Modal(document.getElementById('rezept-modal'));


let zuLoeschendeRezeptId = null;
const bestaetigungsModal = new bootstrap.Modal(document.getElementById('bestaetigungsModal'));
const bestaetigenLoeschenButton = document.getElementById('bestaetigenLoeschenButton');

let rezepte = [];

async function ladeRezepte() {
  try {
    const response = await fetch('http://localhost:3000/api/rezepte');
    rezepte = await response.json();
    zeigeRezepte();
  } catch (error) {
    console.error('Fehler beim Laden der Rezepte:', error);
  }
}

ladeRezepte();

async function ladeRezepte(zutat = '') {
  try {
    const url = zutat ? `http://localhost:3000/api/rezepte?zutat=${encodeURIComponent(zutat)}` : 'http://localhost:3000/api/rezepte';
    const response = await fetch(url);
    rezepte = await response.json();
    zeigeRezepte(); 
  } catch (error) {
    console.error('Fehler beim Laden der Rezepte:', error);
  }
}

let suchTimeout = null;

document.getElementById('zutat-input').addEventListener('input', () => {
  clearTimeout(suchTimeout);

  suchTimeout = setTimeout(() => {
    const zutat = document.getElementById('zutat-input').value.trim();
    ladeRezepte(zutat);
  }, 300); // 300ms "debounce"
});


// Schritt 3: Funktion, die die Rezept-Karten anzeigt.

  


// Schritt 4: Funktion, die die Details eines Rezepts im Modal anzeigt.
// function zeigeRezeptDetails(rezeptId) {
//     const rezept = rezepte.find(r => r.id === rezeptId);
//     rezeptModalTitel.innerText = rezept.name;
//     let zutatenHTML = '<h6>Zutaten:</h6><ul>';
//     rezept.zutaten.forEach(zutat => { zutatenHTML += `<li>${zutat}</li>`; });
//     zutatenHTML += '</ul>';
//     const anleitungHTML = `<h6>Anleitung:</h6><p>${rezept.anleitung}</p>`;
//     rezeptModalBody.innerHTML = zutatenHTML + '<hr>' + anleitungHTML;
//     rezeptModal.show();
// }

function zeigeRezeptDetails(rezeptId) {
    const rezept = rezepte.find(r => r.id === rezeptId);
    console.log('Rezept-Daten:', rezept);
    rezeptModalTitel.innerText = rezept.name;

    // Checkliste für Zutaten
    let zutatenHTML = '<h6>Zutaten:</h6><ul class="list-unstyled">';
    rezept.zutaten.forEach((zutat, index) => {
        zutatenHTML += `
            <li>
                <input type="checkbox" id="zutat-${index}" class="form-check-input me-2">
                <label for="zutat-${index}" class="form-check-label">${zutat}</label>
            </li>`;
    });
    zutatenHTML += '</ul>';

    // Sternebewertung
    const sterne = '★'.repeat(rezept.bewertung) + '☆'.repeat(5 - rezept.bewertung);
    const infoHTML = `
        <p><strong>Zubereitungszeit:</strong> ${rezept.zubereitungszeit}</p>
        <p><strong>Schwierigkeit:</strong> ${rezept.schwierigkeit}</p>
        <p><strong>Bewertung:</strong> <span style="color: gold;">${sterne}</span></p>
    `;

    const anleitungHTML = `<h6>Anleitung:</h6><p>${rezept.anleitung}</p>`;

    rezeptModalBody.innerHTML = infoHTML + zutatenHTML + '<hr>' + anleitungHTML;

    rezeptModal.show();
}



function zeigeRezepte() {
    const rezeptContainer = document.getElementById('rezept-container')
    rezeptContainer.innerHTML = '';
    rezepte.forEach(rezept => {
        console.log('Bild-URL:', rezept.bild_url);
        const rezeptKarte = document.createElement('div');
        rezeptKarte.className = 'col-md-4 mb-4';
        rezeptKarte.innerHTML = `
            <div class="card rezept-karte h-100" data-id="${rezept.id}" style="cursor: pointer;">
                <img src="${rezept.bild_url}" class="card-img-top" alt="${rezept.name}">
                <div class="card-body">
                    <h5 class="card-title">${rezept.name}</h5>
                    <button class="btn btn-danger btn-sm loeschen-button" data-id="${rezept.id}">Löschen</button>
                </div>
            </div>
        `;

        rezeptKarte.querySelector('.card').addEventListener('click', function (e) {
            if (e.target.classList.contains('loeschen-button')) return;
            zeigeRezeptDetails(rezept.id);
        });

        rezeptKarte.querySelector('.loeschen-button').addEventListener('click', function (event) {
        event.stopPropagation(); 
        zuLoeschendeRezeptId = this.dataset.id;
        bestaetigungsModal.show();
     });

        rezeptContainer.appendChild(rezeptKarte);
    });
}


document.getElementById('neuesRezeptForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const neuesRezept = {
        name: document.getElementById('name').value,
        bild_url: document.getElementById('bild_url').value,
        zutaten: document.getElementById('zutaten').value.split(',').map(z => z.trim()),
        anleitung: document.getElementById('anleitung').value,
        zeit: document.getElementById('zubereitungszeit').value,
        schwierigkeit: document.getElementById('schwierigkeit').value,
        bewertung: parseInt(document.getElementById('bewertung').value)
    };

    try {
        console.log('Abzuschickendes Rezept:', neuesRezept);
        const response = await fetch('http://localhost:3000/api/rezepte', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(neuesRezept)
        });

        

        if (!response.ok) throw new Error('Fehler beim Hinzufügen');

        // Formular zurücksetzen
        e.target.reset();
        const gespeichertesRezept = await response.json();
        rezepte.push(gespeichertesRezept);
        zeigeRezepte();

    } catch (err) {
        console.error('Fehler beim Speichern des Rezepts:', err);
    }
});

fetch('http://localhost:3000/api/rezepte/8/rate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ bewertung: 5 })
})
.then(res => res.json())
.then(data => console.log(data));

fetch('http://localhost:3000/api/rezepte?zutat=Spagetti')
  .then(res => res.json())
  .then(data => console.log(data));





bestaetigenLoeschenButton.addEventListener('click', async () => {
  if (!zuLoeschendeRezeptId) return;

  try {
    const response = await fetch(`http://localhost:3000/api/rezepte/${zuLoeschendeRezeptId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      // Rezept aus dem Array entfernen
      rezepte = rezepte.filter(r => (r._id || r.id) !== parseInt(zuLoeschendeRezeptId));

      
      zeigeRezepte();  

      // Modal schließen
      bestaetigungsModal.hide();
    } else {
      alert('Fehler beim Löschen.');
    }
  } catch (err) {
    alert('Netzwerkfehler beim Löschen.');
  }

  zuLoeschendeRezeptId = null;
});