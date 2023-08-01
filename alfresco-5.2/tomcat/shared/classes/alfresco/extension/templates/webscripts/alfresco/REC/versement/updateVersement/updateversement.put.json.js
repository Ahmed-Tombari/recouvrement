auth.runAsSystem();
var referenceVersement = json.get("referenceVersement") + "";
var dateVersement = json.get("dateVersement") + "";
var montantVersement = json.get("montantVersement") + "";
var modeReglement = json.get("modeReglement") + "";
var typeVersement = json.get("typeVersement") + "";
var affectaion = json.get("affectaion") + "";
var nomVersement = args.nomVersement;
var nomDossier = args.nomDossier;

if (nomVersement) {
  results = search.query(
    {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/*/*' AND cm:name:'" + nomVersement + "'",
      sort: [{
        column: 'cm:name',
        ascending: true
      }]
    });

  results[0].properties["drc:referenceVersement"] = referenceVersement;
  results[0].properties["drc:dateVersement"] = dateVersement;
  results[0].properties["drc:montantVersement"] = montantVersement;
  results[0].properties["drc:modeReglement"] = modeReglement;
  results[0].properties["drc:typeVersement"] = typeVersement;
  results[0].properties["drc:affectaion"] = affectaion;
  results[0].save();
}

model.referenceVersement = referenceVersement;
model.dateVersement = dateVersement;
model.montantVersement = montantVersement;
model.modeReglement = modeReglement;
model.typeVersement = typeVersement;
model.affectaion = affectaion;
model.statut = "succees";