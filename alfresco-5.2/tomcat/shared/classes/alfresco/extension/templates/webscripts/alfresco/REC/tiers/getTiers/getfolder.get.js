// Get Tiers
 var tiersNom = args.tiersNom;
 var tiers = [];
 var results = null;
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
   } else {
    results = search.query(
      {
          language: "fts-alfresco",
          query:"PATH:'/app:company_home/app:dictionary/cm:tiers/*/*'",
          sort: [{
                  column: 'cm:name',
                  ascending: true
              }]
      });
   }
   for each(var result in results){
    tiers.push({ "nom":result.properties["trec:tiersNom"],
                 "prenom":result.properties["trec:tiersPrenom"],
                 "adresse":result.properties["trec:tiersAdresse"],
                 "telephone":result.properties["trec:tiersTelephone"],
                 "numeroFax":result.properties["trec:tiersNumeroFax"],
                 "numeroFix":result.properties["trec:tiersNumeroFix"],
                 "cin":result.properties["trec:tiersCin"],
                 "tierType":result.properties["trec:tiersType"],
                 "email":result.properties["trec:tierseEmail"],
                 "codePostale":result.properties["trec:tiersCodePostale"],
                 "gouvernorat":result.properties["trec:tiersGouvernorat"],
                 "ville":result.properties["trec:tiersVille"]
                 
    });
   }
    
   model.tiers = tiers;
   model.statut = "Liste Tiers";

   
 