const porte = document.querySelectorAll(".porta");
let monologues = [];
let i=-1;

porte.forEach(porta => {
    porta.style.pointerEvents = "none";
});

fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
        monologues = data.monologues;
    })
    .catch(error => {
        console.error('Errore nel caricamento dei testi', error);
    });

document.body.addEventListener("click", () => { 
    i++;
    if (i < monologues.length) {
        monologueText.textContent = monologues[i];
    } else {
        personaggio.classList.add("invisible");
        porte.forEach(porta => {
            porta.style.pointerEvents = "auto";
        });
    }
});