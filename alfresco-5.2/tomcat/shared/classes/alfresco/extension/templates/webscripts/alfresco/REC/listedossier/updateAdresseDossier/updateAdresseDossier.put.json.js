auth.runAsSystem();
//Données Entreé Type JSON 
var gouvernorat = json.get("gouvernorat")+"";
var ville = json.get("ville")+"";
var codepostale = json.get("codepostale")+"";


var nomDossier = args.nomDossier;
var results = null;


//Recherche nomDossier avec Solar
if(nomDossier){
results = search.query(
  {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/*' AND cm:name:'"+nomDossier+"'" ,
      sort: [{
              column: 'cm:name',
              ascending: true
          }]
  });
} 
      results[0].properties["drct:gouvernorat"]=gouvernorat;
      results[0].properties["drct:ville"]=ville;
      results[0].properties["drct:codepostale"]=codepostale;
      results[0].save();
 
  model.gouvernorat = gouvernorat;
  model.ville = ville;
  model.codepostale = codepostale;
   
 
   model.statut = "Adresse modifiee avec succees";