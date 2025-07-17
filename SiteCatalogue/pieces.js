import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "./avis.js";

const reponse = await fetch('http://localhost:8081/pieces/');
const pieces = await reponse.json();

function placePiece(pieces){
    for (let i =0; i < pieces.length; i++){

        const produit = pieces[i];
    
        const section = document.querySelector(".fiches");

        const articles = document.createElement("article");
        const titre = document.createElement("h1");
    
        const prix = document.createElement("p");
        const categ = document.createElement("p");
        const img = document.createElement("img");
        const description = document.createElement("p");
        const dispo = document.createElement("p");

        const avisBtn = document.createElement("button");
    
        titre.innerHTML = produit.nom;
        prix.innerHTML = `Prix : ${produit.prix} € (${produit.prix < 35 ? "€" : "€€€"})`;
        categ.innerHTML = produit.categorie;
        img.src = produit.image;
        description.innerHTML = produit.description;
        dispo.innerHTML = produit.disponibilite ? "En stock" : "rupture de stock";
        avisBtn.dataset.id = produit.id;
        avisBtn.textContent = "Afficher les avis";
    
        articles.appendChild(titre);
        articles.appendChild(prix);
        articles.appendChild(categ);
        articles.appendChild(img);
        articles.appendChild(description);
        articles.appendChild(dispo);
        articles.appendChild(avisBtn);
        section.appendChild(articles);

    }
    ajoutListenerEnvoyerAvis()
    ajoutListenersAvis();
}

placePiece(pieces);


const btnTrie = document.querySelector(".btn-trier");
const btnFiltre = document.querySelector(".btn-filtrer");
const btnDec = document.querySelector(".btn-decroissant");
const btnFiltreNoDesc = document.querySelector(".btn-nodesc");


btnTrie.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort(function (a,b) {return a.prix - b.prix;} )
    document.querySelector(".fiches").innerHTML = '';
    placePiece(piecesOrdonnees);

    console.log(piecesOrdonnees);
});


btnFiltre.addEventListener("click", function () {
    const piecesFiltre = piecesFiltre.filter(function (pieces) {  
        return pieces.prix <= 35;
    })
})


btnDec.addEventListener("click", function (){
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a,b) {return b.prix - a.prix})

    document.querySelector(".fiches").innerHTML = '';
    placePiece(piecesOrdonnees);
})


const noms = pieces.map(pieces => pieces.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1)
    }
}

const abordableElts = document.createElement('ul');

for(let i =0; i < noms.length;i++){
    const nomElment = document.createElement('li');
    nomElment.innerHTML = noms[i];
    abordableElts.appendChild(nomElment);
}

document.querySelector('.abordables').appendChild(abordableElts)

