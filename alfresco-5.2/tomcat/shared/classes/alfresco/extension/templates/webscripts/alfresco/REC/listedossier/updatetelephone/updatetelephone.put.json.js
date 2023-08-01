auth.runAsSystem();
//Données Entreé Type JSON 

var telephone = json.get("telephone") + "";
logger.system.out(telephone + "");


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

      
      results[0].properties["drct:telephone"]=telephone;
      results[0].save();
 
    

   model.telephone = telephone;
 
   model.statut = "Telephone modifiee avec succees";