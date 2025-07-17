export function ajoutListenersAvis() {

    const piecesElements = document.querySelectorAll(".fiches article button");


    for (let i = 0; i < piecesElements.length; i++) {

      piecesElements[i].addEventListener("click", async function (event) {

        const id = event.target.dataset.id;
        const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
        const avis = await reponse.json();

        const piece = event.target.parentElement;
        
        const avisElement = document.createElement("p");
        
        for (let i = 0; i < avis.length; i++) {
            avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].commentaire} <br>`;
        }

        piece.appendChild(avisElement);
      });

    }

}


export function ajoutListenerEnvoyerAvis() {

  const formulaireAvis = document.querySelector(".formulaire-avis");

  formulaireAvis.addEventListener("submit", function (event) {
    event.preventDefault();
    const avis = {
      pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
      utilisateur: event.target.querySelector("[name=utilisateur").value,
      commentaire: event.target.querySelector("[name=commentaire]").value,
   };
    const chargeUtile = JSON.stringify(avis);

    fetch("http://localhost:8081/avis", {

      method: "POST",
  
      headers: { "Content-Type": "application/json" },
  
      body: chargeUtile
  
  });
  });

}