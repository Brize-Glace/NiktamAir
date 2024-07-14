function verifierTrajet() {
    const from = document.getElementById('provenance').value.trim();
    const to = document.getElementById('destination').value.trim();
    fetch('assets/bdd/flights.json')
    .then(response => response.json())
    .then(data => {
        const validTrip = data.filter(trajet => {
            const fromMatches = (trajet.from.toLowerCase() === from.toLowerCase() || trajet.ICAO_from.toLowerCase() === from.toLowerCase());
            const toMatches = (trajet.to.toLowerCase() === to.toLowerCase() || trajet.ICAO_to.toLowerCase() === to.toLowerCase());
            return fromMatches && toMatches;
        });
        const result = document.getElementById('results');
        result.innerHTML = ''; // Clear previous results

        if (validTrip.length > 0) {
            validTrip.forEach(trajet => {
                const card = document.createElement('div');
                const date = new Date(trajet.DateAndTime * 1000);
                const humanDate = date.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
                
                card.className = 'card';
                card.style.display = 'flex';

                card.innerHTML = `
                    <h3>Provenance</h3>
                    <p>${trajet.from} ${trajet.name_from} (${trajet.ICAO_from})</p>
                    <h3>Destination</h3>
                    <p>${trajet.to} ${trajet.name_to} (${trajet.ICAO_to})</p>
                    <h3>Date et heure</h3>
                    <p>${humanDate}</p>
                    <h3>Prix</h3>
                    <p>${trajet.price} €</p>
                    <a href="https://pre-save.romyle.fr" target="_blank">
                        <button>Reserver</button>
                    </a>
                `;

                result.appendChild(card);
            });
        } else {
            result.innerHTML = 'Trajet invalide';
        }
    })
    .catch(error => console.error('Erreur:', error));
}