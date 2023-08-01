var nomDossier = args.nomDossier;
var results = null;
var saisine = [];

results = search.query(
  {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/cm:10-SAISINE/*'",
      sort: [{
              column: 'cm:name',
              ascending: true
          }]
  });

  if(versement.children.length > 0){

  for each(var saisine in results){
  
    saisines.push({   "nom":result.properties["cm:name"],
                     "nomsaisine":result.properties["drc:nomSaisine"],
                     "region":result.properties["drc:region"],
                     "typeDeTiers":result.properties["drc:typeDeTiers"],
                     "nomDeTiers":result.properties["drc:nomDeTiers"],
                     "piecejointe":result.properties["drc:piecejointe"],
                  });
   }
}

  model.saisine = saisines;
  model.nomDossier = nomDossier;
  model.statut = "Liste saisine";
