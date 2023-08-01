var nomDossier = args.nomDossier;
var nomSaisine = args.nomSaisine;
var results = null;
  
if(nomDossier){
    results = search.query(
      {
          language: "fts-alfresco",
          query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/*/*' AND cm:name:'" + nomSaisine + "'",
          sort: [{
                  column: 'cm:name',
                  ascending: true
              }]
      });
   } 

   var resSaisine = results[0];
   var nom = resSaisine.properties["cm:name"];
   var nomsaisine = resSaisine.properties["drc:nomSaisine"];
   var region = resSaisine.properties["drc:region"];
   var typeDeTiers = resSaisine.properties["drc:typeDeTiers"];
   var nomDeTiers = resSaisine.properties["drc:nomDeTiers"];
   var piecejointe = resSaisine.properties["drc:piecejointe"];

  model.nom = nom;
  model.nomsaisine = nomsaisine;
  model.region = region;
  model.typeDeTiers = typeDeTiers;
  model.nomDeTiers = nomDeTiers;
  model.piecejointe = piecejointe;
  model.statut = "Liste saisine";
