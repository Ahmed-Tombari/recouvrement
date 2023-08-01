// var tiersNom = url.extention;
var tiersNom = args.tiersNom;
  // delete Tiers
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
    
    results[0].remove();

model.statut = "OK";
