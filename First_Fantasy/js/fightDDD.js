const bottoniMossa = document.querySelectorAll(".bottone_mossa");
const pulsanteAvanza = document.querySelector(".pulsante");
const combattenteNemico = document.querySelector(".battaglia .combattente:first-child");
const combattenteGiocatore = document.querySelector(".battaglia .combattente:last-child");

let dialogues = [];
let attacchi = [];
let i = -1;
let battagliaAttiva = false;
let viteGiocatore = viteInizialiGiocatore;
let viteNemico = viteInizialiNemico;

//rende non clicabili i bottoni
bottoniMossa.forEach(bottone => {
    bottone.style.pointerEvents = "none";
});

//caricamento testi dialoghi
fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
        dialogues = data.dialogues;
    })
    .catch(error => {
        console.error('Errore nel caricamento dei testi', error);
    });

//caricamento testi attacchi
fetch("../../txt/attacchi.json")
    .then(response => response.json())
    .then(data => {
        attacchi = data.attacchi;
    })
    .catch(error => {
        console.error('Errore nel caricamento dei testi', error);
    });

//quando clicchi scorre i dialoghi(se presenti) altrimenti riattiva i bottoni
document.body.addEventListener("click", () => {
    if (i < dialoghiIniziali - 1) {
        i++;
        dialogueText.innerHTML = dialogues[i];
    } else if (i === dialoghiIniziali - 1) {
        dialogueText.innerHTML = "";
        battagliaAttiva = true;
        bottoniMossa.forEach(bottone => { //riattiva i bottoni
            bottone.style.pointerEvents = "auto";
        });
    } else if (!battagliaAttiva && i < dialogues.length - 1) {
        i++;
        dialogueText.innerHTML = dialogues[i];
    }
});

//Quando uno dei bottoni degli attacchi viene premuto esegue quella mossa

document.querySelector(".spada").addEventListener("click", (e) => {
    e.stopPropagation();
    eseguiMossa("spada");
});

document.querySelector(".scudo").addEventListener("click", (e) => {
    e.stopPropagation();
    eseguiMossa("scudo");
});

document.querySelector(".arco").addEventListener("click", (e) => {
    e.stopPropagation();
    eseguiMossa("arco");
});


//funzione del turno
function eseguiMossa(mossaGiocatore) {
    if (!battagliaAttiva) return; //se la battaglia non è incorso interrompe la funzione
    
    const mosse = ["spada", "scudo", "arco"];
    const mossaNemico = mosse[Math.floor(Math.random() * mosse.length)]; //genera la mossa del nemico
    const risultato = vincitore(mossaGiocatore, mossaNemico); //richiama la funzione per determinare il vincitore
    
    //controlla il vincitore e abbassa la vita al perdente, controllando se le avesse finite
    
    if (risultato === "giocatore") {
        viteInizialiNemico--;
        
        if (viteInizialiNemico === 0) {
            aggiornaVite("nemico", 0);
            finePartita();
        }
    } else if (risultato === "nemico") {
        viteGiocatore--;
        aggiornaVite("giocatore", viteGiocatore);
        
        if (viteGiocatore === 0) {
            sconfittaGiocatore();
        }
    } else if(risultato === "entrambi"){
        viteGiocatore--;
        aggiornaVite("giocatore", viteGiocatore);
        
        if (viteGiocatore === 0) {
            sconfittaGiocatore();
            return;
        }

        viteInizialiNemico--;
        
        if (viteInizialiNemico === 0) {
            aggiornaVite("nemico", 0);
            finePartita();
        }
    }
}

function vincitore(mossaGiocatore, mossaNemico) {
    //spada batte arco e viene battuta da scudo, due spade che si scontrano prendono entrambi danno
    //scudo batte spada e viene battuto da arco, due scudi che si scontrano nesusno prende danno
    //arco batte scudo e viene battuto da spada, due archi che si scontrano uno dei due a caso prende danno
    if (mossaGiocatore === "spada"){
        if(mossaNemico === "spada"){
            dialogueText.innerHTML = attacchi[0];
            return "entrambi";
        } else if(mossaNemico === "scudo") {
            dialogueText.innerHTML = attacchi[1];
            return "nemico";
        } else {
            dialogueText.innerHTML = attacchi[2];
            return "giocatore";
        }
    } else if(mossaGiocatore === "scudo") {
        if(mossaNemico === "spada"){
            dialogueText.innerHTML = attacchi[3];
            return "giocatore";
        } else if(mossaNemico === "scudo") {
            dialogueText.innerHTML = attacchi[4];
            return "pareggio";
        } else {
            dialogueText.innerHTML = attacchi[5];
            return "nemico";
        }
    } else {
        if(mossaNemico === "spada"){
            dialogueText.innerHTML = attacchi[6];
            return "nemico";
        } else if(mossaNemico === "scudo") {
            dialogueText.innerHTML = attacchi[7];
            return "giocatore";
        } else {
            dialogueText.innerHTML = attacchi[8];
            return Math.random() < 0.5 ? "nemico" : "giocatore";
        }
    }
}

function aggiornaVite(tipo, nuoveVite) {
    const maxVite = tipo === "giocatore" ? viteInizialiGiocatore : viteInizialiNemico; //controlla di chi è la vita
    for (let j = 1; j <= maxVite; j++) { //cicla per tutte le vite
        const vita = document.getElementById(`vita${j}_${tipo}`); //prende l'immagine della vita
        if (vita) { //se c'è controlla se deve rimpiazzarlo con l'immagine del cuore vuoto
            if (j > nuoveVite) {
                vita.src = "../../img/GUI/morta.png";
            }
        }
    }
}

//funzione di vittoria
function finePartita() {
    battagliaAttiva = false;
    dialogueText.innerHTML = "Hai vinto!";
    combattenteNemico.classList.add("invisible");
    
    //rende non premibili le mosse
    bottoniMossa.forEach(bottone => {
        bottone.style.pointerEvents = "none";
    });
    
    textBox.classList.remove("invisible");
    i = dialoghiIniziali - 1;
    
    i++;
    dialogueText.innerHTML = dialogues[i];
    
    //se ci sono altri dialoghi aspetta per far apparrire il tasto continua
    if (i < dialogues.length - 1) {
        document.body.addEventListener("click", mostraDialogoSuccessivo);
    } else {
        pulsanteAvanza.classList.remove("hidden");
    }
}

//funzione che scorre i dialoghi
function mostraDialogoSuccessivo(e) {
    
    //non fa scorrere i dialoghi se stai premendo altro
    if (e.target.closest('.bottone_mossa') || e.target.closest('.pulsante')) {
        return;
    }
    
    if (i < dialogues.length - 1) {
        i++;
        dialogueText.innerHTML = dialogues[i];
    } else {
        pulsanteAvanza.classList.remove("hidden");
        textBox.classList.add("button-box");
        document.body.removeEventListener("click", mostraDialogoSuccessivo);
    }
}

function sconfittaGiocatore() {
    battagliaAttiva = false;
    dialogueText.innerHTML = "Sei morto!";
    combattenteGiocatore.classList.add("invisible");//fa sparire il giocatore
    bottoniMossa.forEach(bottone => { //rende non cliccabili i bottoni delle mosse
        bottone.style.pointerEvents = "none";
    });

    document.body.addEventListener("click", finaleEroe); //fa si che dal prossimo click avvi la funzione pagina morte
}

//manda alla pagina del finale
function finaleEroe() {
    window.location.href = "../../html/endings/hero_ending.html";
}