auth.runAsSystem();
var nomsaisine = json.get("nomsaisine")+"";
var region = json.get("region")+"";
var typeDeTiers = json.get("typeDeTiers")+"";
var nomDeTiers = json.get("nomDeTiers")+"";
var piecejointe = json.get("piecejointe")+"";
var nomSaisine = args.nomSaisine;
var nomDossier = args.nomDossier;

if (nomDossier) {
  results = search.query(
    {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/*/*' AND cm:name:'" + nomSaisine + "'",
      sort: [{
        column: 'cm:name',
        ascending: true
      }]
    });

    results[0].properties["drc:nomSaisine"]=nomsaisine;
    results[0].properties["drc:region"]=region;
    results[0].properties["drc:typeDeTiers"]=typeDeTiers;
    results[0].properties["drc:nomDeTiers"]=nomDeTiers;
    results[0].properties["drc:piecejointe"]=piecejointe; 
    results[0].save();
  }


  model.nomsaisine = nomsaisine;
  model.region = region;
  model.typeDeTiers = typeDeTiers;
  model.nomDeTiers = nomDeTiers;
  model.piecejointe = piecejointe;
  model.statut = "saisine a ete modifiee avec succes";