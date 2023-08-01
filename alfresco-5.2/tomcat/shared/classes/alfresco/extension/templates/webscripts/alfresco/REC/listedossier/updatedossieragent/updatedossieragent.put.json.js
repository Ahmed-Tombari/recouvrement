auth.runAsSystem();
//Données Entreé Type JSON 

var agent = json.get("agent")+"";


var nomDossier = args.nomDossier;
var results = null;
var dossiers = [];

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

      results[0].properties["drccf:agent"]=agent;
      results[0].save();

 
   model.agent = agent;
   model.statut = "agent remplacer avec succees";