var nomDossier = args.nomDossier;
var results = null;
var creance = [];


//Recherche nomVersement avec Solar
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
  var cre = results[0].childByNamePath("06-CREANCE").children;
  
} 
//Retourner de tout les Modeles de Versement
  for each(var result in cre) {
    
    creance.push({ 
                     "nomdossiercrean":result.properties["cm:name"],
                     "nomcreance":result.properties["drc:nomcreance"],
                     "montant":result.properties["drc:detailmontant"],
                     "nature":result.properties["drc:nature"],
                     "datedeffdesir":result.properties["drc:dateDeffIr"],
                     
                    });
  }
  model.creance = creance;
  model.nomDossier = nomDossier;
  model.statut = "Liste creance";
