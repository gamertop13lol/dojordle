// ààààààà``aàààààààà``a`a

document.addEventListener("keydown", input, false);
let dataset = [];
const validas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var ajogar = true;
var indice = 0;
var palavra = "";
var letrasempalavra = {"A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "I": 0, "J": 0, "K": 0, "L": 0, "M": 0, "N": 0, "O": 0, "P": 0, "Q": 0, "R": 0, "S": 0, "T": 0, "U": 0, "V": 0, "W": 0, "X": 0, "Y": 0, "Z": 0}

function colocarletra (letra) { // Colocar uma letra
    if (validas.includes(letra) && indice < 30 && ajogar) {
        document.getElementById(indice).textContent = letra;
        if (indice % 5 == 4) {
            if (!indataset(indice - 4, indice)) {
                apagarpalavra(indice - 4, indice);
                alert("Word not in dataset!");
            } else if (avaliar(indice - 4, indice)) {
                alert("YOU WIN EZ LOL GG");
                ajogar = false;
            } else if (indice == 29) {
                alert("YOU LOST F IN CHAT");
                ajogar = false;
            }
            
        }
        indice++;
    }
}

function input (event) { // Receber input e converter
    if (event.keyCode == 8 && indice % 5 != 0) {
        indice = indice - 1;
        colocarletra("");
        indice = indice - 1;
    } else {
        colocarletra(String.fromCharCode(event.keyCode)[0]);
    }
}

function apagarpalavra (inicio, fim) {
    for (let i = inicio; i<=fim; i++) {
        document.getElementById(i).textContent = "";
    }
    indice -= 5;
}

function avaliar (inicio, fim) { // Nega
    let resposta = "";
    var letrasempalavra_t = Object.assign({}, letrasempalavra);
    for (let i = inicio; i<=fim; i++) {
        let div = document.getElementById(i);
        let letra = div.textContent;
        if (letra == palavra[i - inicio] && letrasempalavra_t[letra] > 0) {
            div.classList.add("verde");
        } else if (palavra.includes(letra) && letrasempalavra_t[letra] > 0) {
            div.classList.add("amarelo");
        } else {
            div.classList.add("cinzento");
        }
        resposta += letra;
        letrasempalavra_t[letra]--;
    }
    return palavra == resposta;
}

function indataset (inicio, fim) {
    let palavrac = "";
    for (let i = inicio; i<=fim; i++) {
        let letra = document.getElementById(i).textContent;
        palavrac = palavrac + letra;
    }
    return dataset.includes(palavrac);
}

function buscardataset () { // Escolher uma palavra do dataset
    let request = new XMLHttpRequest();
    request.open("GET", "/dataset.txt", false);
    request.onreadystatechange = function () {
        if(request.readyState === 4)
        {
            if(request.status === 200 || request.status == 0)
            {
                dataset = request.responseText.split("\r\n");
                ajogar = true;
                palavra = dataset[Math.floor(Math.random() * dataset.length)];
            }
        }
    }
    request.send(null);
}

buscardataset();

for (let index = 0; index<=4; index++) { // Saber quantas letras há
    letrasempalavra[palavra.charAt(index)]++
}