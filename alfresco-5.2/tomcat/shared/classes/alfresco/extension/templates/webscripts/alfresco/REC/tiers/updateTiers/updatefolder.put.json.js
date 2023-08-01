auth.runAsSystem();
   // Create Tiers

   var nom = json.get("nom")+"";
   var prenom = json.get("prenom")+"";
   var adresse = json.get("adresse")+"";
   var telephone = json.get("telephone")+"";
   var numeroFax = json.get("numeroFax")+"";
   var numeroFix = json.get("numeroFix")+"";
   var cin = json.get("cin")+"";
   var tiersType = json.get("type")+"";
   var email = json.get("email")+"";
   var codePostale = json.get("codePostale")+"";
   var gouvernorat = json.get("gouvernorat")+"";
   var ville = json.get("ville")+"";
   var tiersNom = args.tiersNom;
  // update Tiers
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
 
      results[0].properties["trec:tiersNom"]=nom;
      results[0].properties["trec:tiersPrenom"]=prenom;
      results[0].properties["trec:tiersAdresse"]=adresse;
      results[0].properties["trec:tiersTelephone"]=telephone;
      results[0].properties["trec:tiersNumeroFax"]=numeroFax;
      results[0].properties["trec:tiersNumeroFix"]=numeroFix;
      results[0].properties["trec:tiersCin"]=cin;
      results[0].properties["trec:tiersType"]=tiersType;
      results[0].properties["trec:tierseEmail"]=email;
      results[0].properties["trec:tiersCodePostale"]=codePostale;
      results[0].properties["trec:tiersGouvernorat"]=gouvernorat;
      results[0].properties["trec:tiersVille"]=ville;
      results[0].save();
  } 
   
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
    model.statut = "succees";