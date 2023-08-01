var nomDossier = args.nomDossier;
var results = null;
var fraisjudic = [];


//Recherche fraisjudiciare avec Solar
if(nomDossier){
results = search.query(
  {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary//*' AND cm:name:'"+nomDossier+"'"  ,
      sort: [{
              column: 'cm:name',
              ascending: true
          }]
  });
  var fraisjdc = results[0].childByNamePath("11-FRAISJUDICIARE").children;
  
} 
//Retourner de tout les Modeles de fraisjudiciare
  for each(var result in fraisjdc) {
  
    fraisjudic.push({ "nomfrjdc":result.properties["cm:name"],
                     "nom":result.properties["drc:nomjudic"],
                     "prenom":result.properties["drc:prenomjudic"],
                     "typedeTiers":result.properties["drc:typedeTiers"],
                     "facturation":result.properties["drc:facturation"],
                     "paiment":result.properties["drc:paiment"],
                     "typedeSaisine":result.properties["drc:typedeSaisine"],
                    });
}

  model.fraisjudic = fraisjudic;
  model.nomDossier = nomDossier;
  model.statut = "Liste Dossiers";
