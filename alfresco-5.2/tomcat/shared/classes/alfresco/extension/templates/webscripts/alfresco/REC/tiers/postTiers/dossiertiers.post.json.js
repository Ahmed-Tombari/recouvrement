
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
   
  // Create Avocat
    if(tiersType == "Avocat"){
    var destAvocats = companyhome.childrenByXPath("/app:company_home/app:dictionary/cm:tiers/cm:Avocat")[0];
    var tiers = destAvocats.createFolder(nom +""+ prenom);
   
    tiers.addAspect("trec:tiersListe");
    tiers.properties["trec:tiersNom"]=nom;
    tiers.properties["trec:tiersPrenom"]=prenom;
    tiers.properties["trec:tiersAdresse"]=adresse;
    tiers.properties["trec:tiersTelephone"]=telephone;
    tiers.properties["trec:tiersNumeroFax"]=numeroFax;
    tiers.properties["trec:tiersNumeroFix"]=numeroFix;
    tiers.properties["trec:tiersCin"]=cin;
    tiers.properties["trec:tiersType"]=tiersType;
    tiers.properties["trec:tierseEmail"]=email;
    tiers.properties["trec:tiersCodePostale"]=codePostale;
    tiers.properties["trec:tiersGouvernorat"]=gouvernorat;
    tiers.properties["trec:tiersVille"]=ville;
    tiers.save();
   
  // Create Huissier
   } else if(tiersType == "Huissier"){
    var destHuissier = companyhome.childrenByXPath("/app:company_home/app:dictionary/cm:tiers/cm:Huissier")[0];
    var tiers = destHuissier.createFolder(nom +""+ prenom);

    tiers.addAspect("trec:tiersListe");
    tiers.properties["trec:tiersNom"]=nom;
    tiers.properties["trec:tiersPrenom"]=prenom;
    tiers.properties["trec:tiersAdresse"]=adresse;
    tiers.properties["trec:tiersTelephone"]=telephone;
    tiers.properties["trec:tiersNumeroFax"]=numeroFax;
    tiers.properties["trec:tiersNumeroFix"]=numeroFix;
    tiers.properties["trec:tiersCin"]=cin;
    tiers.properties["trec:tiersType"]=tiersType;
    tiers.properties["trec:tierseEmail"]=email;
    tiers.properties["trec:tiersCodePostale"]=codePostale;
    tiers.properties["trec:tiersGouvernorat"]=gouvernorat;
    tiers.properties["trec:tiersVille"]=ville;
    tiers.save();

  // Create Expert
   } else {
    var destExpert = companyhome.childrenByXPath("/app:company_home/app:dictionary/cm:tiers/cm:Expert")[0];
    var tiers = destExpert.createFolder(nom +""+ prenom);

    tiers.addAspect("trec:tiersListe");
    tiers.properties["trec:tiersNom"]=nom;
    tiers.properties["trec:tiersPrenom"]=prenom;
    tiers.properties["trec:tiersAdresse"]=adresse;
    tiers.properties["trec:tiersTelephone"]=telephone;
    tiers.properties["trec:tiersNumeroFax"]=numeroFax;
    tiers.properties["trec:tiersNumeroFix"]=numeroFix;
    tiers.properties["trec:tiersCin"]=cin;
    tiers.properties["trec:tiersType"]=tiersType;
    tiers.properties["trec:tierseEmail"]=email;
    tiers.properties["trec:tiersCodePostale"]=codePostale;
    tiers.properties["trec:tiersGouvernorat"]=gouvernorat;
    tiers.properties["trec:tiersVille"]=ville;
    tiers.save();

   }

  // model Tiers
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
   model.statut = "tiers a ete cree avec succes";