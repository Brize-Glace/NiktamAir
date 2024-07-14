// function getLevenshteinDistance(a, b) {
//     const matrix = [];

//     for (let i = 0; i <= b.length; i++) {
//         matrix[i] = [i];
//     }

//     for (let j = 0; j <= a.length; j++) {
//         matrix[0][j] = j;
//     }

//     for (let i = 1; i <= b.length; i++) {
//         for (let j = 1; j <= a.length; j++) {
//             if (b.charAt(i - 1) === a.charAt(j - 1)) {
//                 matrix[i][j] = matrix[i - 1][j - 1];
//             } else {
//                 matrix[i][j] = Math.min(
//                     matrix[i - 1][j - 1] + 1,
//                     matrix[i][j - 1] + 1,
//                     matrix[i - 1][j] + 1
//                 );
//             }
//         }
//     }

//     return matrix[b.length][a.length];
// }

function getLevenshteinDistance(a, b) {
    const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

function findClosestCity(input, cities) {
    let closestCity = cities[0];
    let minDistance = getLevenshteinDistance(input, cities[0].name);

    for (const city of cities) {
        const distance = getLevenshteinDistance(input, city.name);
        if (distance < minDistance) {
            closestCity = city;
            minDistance = distance;
        }
    }

    return closestCity;
}

function checkTrip() {
    const from = document.getElementById('provenance').value.trim();
    const to = document.getElementById('destination').value.trim();
    const results = document.getElementById('results');

    results.innerHTML = '';

    if (from === '' || to === '') {
        results.innerHTML = 'Veuillez renseigner une provenance et une destination.';
        return;
    }

    fetch('assets/bdd/flights.json')
        .then(response => response.json())
        .then(data => {
            const cities = data.map(trajet => ({
                name: trajet.from.toLowerCase(),
                ICAO: trajet.ICAO_from
            })).concat(data.map(trajet => ({
                name: trajet.to.toLowerCase(),
                ICAO: trajet.ICAO_to
            })));

            const closestFrom = findClosestCity(from.toLowerCase(), cities);
            const closestTo = findClosestCity(to.toLowerCase(), cities);

            const validTrip = data.filter(trajet => {
                const fromMatches = (trajet.from.toLowerCase().includes(from.toLowerCase()) || trajet.ICAO_from.toLowerCase() === from.toLowerCase());
                const toMatches = (trajet.to.toLowerCase().includes(to.toLowerCase()) || trajet.ICAO_to.toLowerCase() === to.toLowerCase());
                return fromMatches && toMatches;
            });

            if (validTrip.length > 0) {
                validTrip.forEach(trajet => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.style.display = 'flex';

                    const date = new Date(trajet.DateAndTime * 1000);
                    const humanDate = date.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

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
                            <button>Réserver</button>
                        </a>`

                        ;
                    results.appendChild(card);
                });
            }
            else if (closestFrom.name !== from.toLowerCase() || closestTo.name !== to.toLowerCase()) {
                results.innerHTML = `Aucun résultat correspondant a votre rechercher à été trouvé. Peut-être avez-vous voulu dire ‎ ` + `<span>${closestFrom.name} - ${closestTo.name}</span>? <br> Veillez à bien écrire le nom de la ville dans la langue de la ville ou essayez de chercher par le code ICAO de l'aéroport.`;
                spanLink = document.querySelector('span');
                spanLink.addEventListener('click', function () {
                    document.getElementById('provenance').value = closestFrom.name;
                    document.getElementById('destination').value = closestTo.name;
                    checkTrip();
                });
                spanLink.style.cursor = 'pointer';
                spanLink.style.textDecoration = 'underline';
                spanLink.style.color = '#0056b3'
                
            } else {
                results.innerHTML = 'Aucun trajet trouvé.';
            }
        })
        .catch(error => console.error('Erreur:', error));
}
