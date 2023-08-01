var tiersNom = args.tiersNom;
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
   } 

   var restiersNom = results[0];
   var nom = restiersNom.properties["trec:tiersNom"];
   var prenom = restiersNom.properties["trec:tiersPrenom"];
   var adresse = restiersNom.properties["trec:tiersAdresse"];
   var telephone = restiersNom.properties["trec:tiersTelephone"];
   var numeroFax = restiersNom.properties["trec:tiersNumeroFax"];
   var numeroFix = restiersNom.properties["trec:tiersNumeroFix"];
   var cin = restiersNom.properties["trec:tiersCin"];
   var tiersType = restiersNom.properties["trec:tiersType"];
   var email = restiersNom.properties["trec:tierseEmail"];
   var codePostale = restiersNom.properties["trec:tiersCodePostale"];
   var gouvernorat = restiersNom.properties["trec:tiersGouvernorat"];
   var ville = restiersNom.properties["trec:tiersVille"];
    
   model.nom = nom;
   model.prenom = prenom;
   model.adresse = adresse;
   model.telephone = telephone;
   model.numeroFax = numeroFax;
   model.numeroFix = numeroFix;
   model.cin = cin;
   model.tiersType = tiersType;
   model.email = email;
   model.codePostale = codePostale;
   model.gouvernorat = gouvernorat;
   model.ville = ville;
   model.statut = "Liste Tiers";

   
 