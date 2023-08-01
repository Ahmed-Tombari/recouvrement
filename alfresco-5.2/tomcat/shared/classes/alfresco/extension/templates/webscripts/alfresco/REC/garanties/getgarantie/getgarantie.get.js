var nomDossier = args.nomDossier;
var results = null;
var garantie = [];


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
  var gar = results[0].childByNamePath("09-GARANTIE").children;
  
}
//Retourner de tout les Modeles de garantie
  for each(var result in gar) {
  
    garantie.push({ 
                   "nomgarantie":result.properties["cm:name"],
                   "typeGar":result.properties["drc:typeGar"],
                   "natureHypotheque":result.properties["drc:natureHypotheque"],
                   "rang":result.properties["drc:rang"],
                   "immatriculation":result.properties["drc:immatriculation"],
                   "dateFinDeLHypotheque":result.properties["drc:datefinhypotheque"],
                   "montantDeLHypotheque":result.properties["drc:montanthypotheque"],
                   "valeurestimee":result.properties["drc:valeurestimee"],
                   "hypothequebanque":result.properties["drc:hypothequebanque"],
                   "beneficiairehypotheque":result.properties["drc:beneficiairehypotheque"],
                    });
}

  model.garantie = garantie;
  model.nomDossier = nomDossier;
  model.statut = "Liste Dossiers";
