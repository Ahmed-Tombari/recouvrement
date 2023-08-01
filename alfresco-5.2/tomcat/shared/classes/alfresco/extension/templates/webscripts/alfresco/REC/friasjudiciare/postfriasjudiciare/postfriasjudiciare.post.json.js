auth.runAsSystem();
   var nom = json.get("nom")+"";
   var prenom = json.get("prenom")+"";
   var typedeTiers = json.get("typedeTiers")+"";
   var facturation = json.get("facturation")+"";
   var paiment = json.get("paiment")+"";
   var typedeSaisine = json.get("typedeSaisine")+"";
   var nomDossier = args.nomDossier;
   
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
  


   
    var destfraisjdc = results[0].childByNamePath("11-FRAISJUDICIARE");
    if(!destfraisjdc.hasAspect("drccf:increment")){
   
      destfraisjdc.addAspect("drccf:increment");
      destfraisjdc.properties["drccf:increment"] = 0;
      destfraisjdc.save();
    }
    var i = destfraisjdc.properties["drccf:increment"] + 1;
    var fraisjdc = destfraisjdc.createFolder("FRAISJUDICIARE-" + i);
    destfraisjdc.properties["drccf:increment"] = i;
    destfraisjdc.save();

    
    fraisjdc.properties["drc:nomjudic"]=nom;
    fraisjdc.properties["drc:prenomjudic"]=prenom;
    fraisjdc.properties["drc:typedeTiers"]=typedeTiers;
    fraisjdc.properties["drc:facturation"]=facturation;
    fraisjdc.properties["drc:paiment"]=paiment;
    fraisjdc.properties["drc:typedeSaisine"]=typedeSaisine;
    fraisjdc.save();
  } 
   model.nom = nom;
   model.prenom = prenom;
   model.typedeTiers = typedeTiers;
   model.facturation = facturation;
   model.paiment = paiment;
   model.typedeSaisine = typedeSaisine;
   model.statut = "frais judiciare a ete cree avec succes";


