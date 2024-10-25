document.addEventListener("DOMContentLoaded", () => {
  // const id = "7520231115202905611"; // Remplace ça par la logique pour obtenir l'ID dynamique
  const apiUrl = `http://localhost:3000/api/cotisation/${id}`; // Utiliser l'ID dans l'URL

  axios
    .get(apiUrl)
    .then((response) => {
      console.log("API response:", response.data);
      displayData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Afficher un message d'erreur à l'utilisateur, si souhaité
    });
});

function displayData(data) {
  const titre = document.getElementById("titre");
  const description = document.getElementById("description");
  const montant = document.getElementById("montant");
  const total = document.getElementById("total");
  const frais = document.getElementById("frais");

  titre.textContent = data.sTitre || "Pas de titre";
  description.textContent = data.sDescription || "Pas de description";

  // Vérifie si le montant est défini
  if (data.moMontant !== undefined) {
    const moMontant = Math.floor(data.moMontant); // Arrondi à l'inférieur
    montant.textContent = `Montant: ${moMontant}`;

    // Calcul des frais opérateur
    const rFraisOperateur = Math.floor(moMontant * 0.035); // Arrondi à l'inférieur
    
    // Vérification des frais
    if (rFraisOperateur === 0) {
      frais.textContent = "Frais non exigé";
      total.textContent = `Total: ${moMontant}`;
    } else {
      frais.textContent = `Frais: ${rFraisOperateur}`;
      total.textContent = `Total: ${moMontant + rFraisOperateur}`;
    }
  } else {
    montant.textContent = "Montant: Non disponible";
    frais.textContent = "Frais non disponible";
    total.textContent = "Total: Non disponible";
  }

}
document.addEventListener('DOMContentLoaded', function() {
  const montantInput = document.querySelector('input[type="number"]'); // Le champ de saisie du montant
  const montantDisplay = document.getElementById('montant'); // L'élément où le montant est affiché

  montantInput.addEventListener('input', function() {
    const montant = Math.floor(montantInput.value) || 0; // Arrondi à l'inférieur
    montantDisplay.textContent = `Montant : ${montant} XAF`; // Mise à jour de l'affichage
    updateFraisAndTotal(montant); // Met à jour les frais et le total
  });

  function updateFraisAndTotal(montant) {
    const fraisDisplay = document.getElementById('frais');
    const totalDisplay = document.getElementById('total');

    const rFraisOperateur = Math.floor(montant * 0.035); // Calcul des frais
    fraisDisplay.textContent = `Frais 3.5% : ${rFraisOperateur > 0 ? rFraisOperateur + ' XAF' : 'Aucun frais'}`; // Affichage des frais

    const total = montant + rFraisOperateur; // Calcul du total
    totalDisplay.textContent = `Total Net: ${total} XAF`; // Mise à jour de l'affichage du total
  }
});
