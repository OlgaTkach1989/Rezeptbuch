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
    const response = await fetch('/api/rezepte');
    rezepte = await response.json();
    renderRezepte();
  } catch (error) {
    console.error('Fehler beim Laden der Rezepte:', error);
  }
}

ladeRezepte();

async function ladeRezepte(zutat = '') {
  try {
    const url = zutat ? `/api/rezepte?zutat=${encodeURIComponent(zutat)}` : '/api/rezepte';
    const response = await fetch(url);
    rezepte = await response.json();
    zeigeRezepte(); 
  } catch (error) {
    console.error('Fehler beim Laden der Rezepte:', error);
  }
}


document.getElementById('filter-button').addEventListener('click', () => {
  const zutat = document.getElementById('zutat-input').value;
  ladeRezepte(zutat);
});


// Schritt 3: Funktion, die die Rezept-Karten anzeigt.
function renderRezepte() {
  const rezeptGalerie = document.getElementById('rezept-container');
  rezeptGalerie.innerHTML = '';

  rezepte.forEach(rezept => {
    const rezeptKarteHTML = `
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100" style="cursor: pointer;" onclick="zeigeRezeptDetails('${rezept._id || rezept.id}')">
          <img src="${rezept.bild_url}" class="card-img-top" alt="${rezept.name}" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${rezept.name}</h5>
            <button class="btn btn-danger btn-sm loeschen-button" data-id="${rezept._id || rezept.id}">Löschen</button>
          </div>
        </div>
      </div>
    `;
    rezeptGalerie.innerHTML += rezeptKarteHTML;
  });


  document.querySelectorAll('.loeschen-button').forEach(button => {
    button.addEventListener('click', async function (event) {
      event.stopPropagation(); 
      const id = this.dataset.id;
      bestaetigungsModal.show();
      try {
        const response = await fetch(`/api/rezepte/${id}`, { method: 'DELETE' });
        if (response.ok) {
          rezepte = rezepte.filter(r => (r._id || r.id) !== id);
          renderRezepte();
        } else {
          alert('Fehler beim Löschen.');
        }
      } catch (error) {
        alert('Netzwerkfehler beim Löschen.');
      }
    });
  });
}

  


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
        <p><strong>Zubereitungszeit:</strong> ${rezept.zeit}</p>
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

        rezeptKarte.querySelector('.loeschen-button').addEventListener('click', async function () {
            const id = parseInt(this.dataset.id);
            try {
                const response = await fetch(`/api/rezepte/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    rezepte = rezepte.filter(r => r.id !== id);
                    zeigeRezepte();
                } else {
                    alert('Fehler beim Löschen.');
                }
            } catch (error) {
                alert('Netzwerkfehler beim Löschen.');
            }
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
        zubereitungszeit: document.getElementById('zubereitungszeit').value,
        schwierigkeit: document.getElementById('schwierigkeit').value,
        bewertung: parseInt(document.getElementById('bewertung').value)
    };

    try {
        const response = await fetch('/api/rezepte', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(neuesRezept)
        });

        

        if (!response.ok) throw new Error('Fehler beim Hinzufügen');

        // Formular zurücksetzen
        e.target.reset();
        rezepte.push(neuesRezept);
        renderRezepte();

    } catch (err) {
        console.error('Fehler beim Speichern des Rezepts:', err);
    }
});

fetch('/api/rezepte/1/rate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ rating: 5 })
})
.then(res => res.json())
.then(data => console.log(data));

fetch('/api/rezepte?zutat=Spagetti')
  .then(res => res.json())
  .then(data => console.log(data));

// Initialer Aufruf
renderRezepte();


bestaetigenLoeschenButton.addEventListener('click', async () => {
  console.log("Klick auf JA – zu löschende ID:", zuLoeschendeRezeptId);

  if (!zuLoeschendeRezeptId) return;

  try {
    const response = await fetch(`/api/rezepte/${zuLoeschendeRezeptId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      rezepte = rezepte.filter(r => (r._id || r.id) !== zuLoeschendeRezeptId);
      renderRezepte(rezepte);
      bestaetigungsModal.hide();
    } else {
      alert('Fehler beim Löschen.');
    }
  } catch (error) {
    alert('Netzwerkfehler beim Löschen.');
  }

  zuLoeschendeRezeptId = null;
});


