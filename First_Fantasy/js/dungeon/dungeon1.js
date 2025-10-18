let monologues = [];
const textBox = document.getElementById("dungeon1_text");
let i;

fetch('../../txt/dungeon/dungeon1.json')
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
    
    }
    });