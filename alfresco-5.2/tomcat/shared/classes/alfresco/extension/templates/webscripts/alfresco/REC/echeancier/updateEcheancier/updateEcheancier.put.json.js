auth.runAsSystem();
// Create Echeancier

var periodicite = json.get("periodicite") + "";
var montant = json.get("montant") + "";
var datePremiereEcheancier = json.get("datePremiereEcheancier");
var nomEcheancier = args.nomEcheancier;
var nomDossier = args.nomDossier;
//var nomEcheancier = "ECHEANCIER-1";
//var nomdossier = "Dossier_Recouvrement-1";

if (nomEcheancier) {
results = search.query(
  {
    language: "fts-alfresco",
    query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/*/*' AND cm:name:'" + nomEcheancier + "'",
    sort: [{
      column: 'cm:name',
      ascending: true
    }]
  });
  
  results[0].properties["drc:periodicite"] = periodicite;
  results[0].properties["drc:montantecheancier"] = montant;
  results[0].properties["drc:datePremiereEcheancier"] = new Date(datePremiereEcheancier);
  results[0].save();
}

model.periodicite = periodicite;
model.montant = montant;
model.datePremiereEcheancier = datePremiereEcheancier;
model.statut = "succees";