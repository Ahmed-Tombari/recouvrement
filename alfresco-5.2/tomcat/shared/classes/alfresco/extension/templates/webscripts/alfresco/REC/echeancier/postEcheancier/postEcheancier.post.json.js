auth.runAsSystem();
// Create Echeancier

var periodicite = json.get("periodicite") + "";
var montant = json.get("montant") + "";
var datePremiereEcheancier = json.get("datePremiereEcheancier");
var nomDossier = args.nomDossier;
var results = null;
// Create Echeancier

  results = search.query(
    {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/cm:_x0030_5-ECHEANCIER'",
      sort: [{
        column: 'cm:name',
        ascending: true
      }]
    });
 
  var destEcheancier = results[0];

  if (!destEcheancier.hasAspect("drccf:increment")) {

    destEcheancier.addAspect("drccf:increment");
    destEcheancier.properties["drccf:increment"] = 0;
    destEcheancier.save();

  }
  var i = destEcheancier.properties["drccf:increment"] + 1;
  var Echeancier = destEcheancier.createFolder("ECHEANCIER-" + i);
  destEcheancier.properties["drccf:increment"] = i;
  destEcheancier.save();

  Echeancier.properties["drc:periodicite"] = periodicite;
  Echeancier.properties["drc:montantecheancier"] = montant;
  Echeancier.properties["drc:datePremiereEcheancier"] = new Date(datePremiereEcheancier);
  Echeancier.save();

// model Echeancier
model.periodicite = periodicite;
model.montant = montant;
model.datePremiereEcheancier = datePremiereEcheancier;
model.statut = "Echeancier a ete cree avec succes";