auth.runAsSystem();
var naturefrais = json.get("naturefrais")+"";
var typefrais = json.get("typefrais")+"";
var tiers = json.get("tiers")+"";
var referencePvFacture = json.get("referencePvFacture")+"";
var montants = json.get("montants")+"";
var HT = json.get("HT")+"";
var TVA = json.get("TVA")+"";
var debours = json.get("debours")+"";
var datedeffdesir = json.get("datedeffdesir")+"";
var nomFraisPrec = args.nomFraisPrec;
var nomDossier = args.nomDossier;

if (nomDossier) {
  results = search.query(
    {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/*/*' AND cm:name:'" + nomFraisPrec + "'",
      sort: [{
        column: 'cm:name',
        ascending: true
      }]
    });

    results[0].properties["drc:natureFrais"] = naturefrais;
    results[0].properties["drc:typeFrais"] = typefrais;
    results[0].properties["drc:tiers"] = tiers;
    results[0].properties["drc:referencePvFacture"] = referencePvFacture;
    results[0].properties["drc:montants"] = montants;
    results[0].properties["drc:HT"] = HT;
    results[0].properties["drc:TVA"] = TVA;
    results[0].properties["drc:debours"] = debours;
    results[0].properties["drc:datedeffdesir"] = datedeffdesir;
    results[0].save();
}



model.nomDossier = nomDossier;
model.naturefrais = naturefrais;
model.typefrais = typefrais;
model.tiers = tiers;
model.referencePvFacture = referencePvFacture;
model.montants = montants;
model.HT = HT;
model.TVA = TVA;
model.debours = debours;
if(datedeffdesir == null){
  datedeffdesir = "";
}
model.datedeffdesir = datedeffdesir;
model.statut = "frais precontent a ete modifiee avec succes";