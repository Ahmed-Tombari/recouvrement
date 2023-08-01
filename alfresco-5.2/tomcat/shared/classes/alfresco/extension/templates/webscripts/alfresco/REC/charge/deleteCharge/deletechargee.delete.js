auth.runAsSystem();
 var tiers = [];
 var statut ="KO";
 var tiersNom = args.tiersNom;
 if(tiersNom){
   tiers[0] = tiersNom;
 }
 else if(json.get("tiers") + ""){
  tiers=new Array();
  tiersN = json.get("tiers") + "";
  tiers = JSON.parse(tiersN);
 }
 for (i = 0; i < tiers.length; i++) {
 
   var tiersNom = tiers[i];
        

for each(var tiersNom in tiersNom) {
  // delete 
  if(tiersNom){
    results = search.query(
      {
          language: "fts-alfresco",
          query:"PATH:'/app:company_home/app:dictionary/cm:tiers/*/*' AND cm:name:'"+tiersNom+"'",
          sort: [{
                  column: 'cm:name',
                  ascending: true
              }]
      });
    
    }
    
   if(results.length > 0) {

    results[0].remove();
    statut = "OK";

   } 
  }
}

model.statut = statut;
