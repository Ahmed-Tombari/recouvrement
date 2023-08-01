auth.runAsSystem();
   var nomsaisine = json.get("nomsaisine")+"";
   var region = json.get("region")+"";
   var typeDeTiers = json.get("typeDeTiers")+"";
   var nomDeTiers = json.get("nomDeTiers")+"";
   var piecejointe = json.get("piecejointe")+"";
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
  


   
    var destsaisine = results[0].childByNamePath("10-SAISINE");
    if(!destsaisine.hasAspect("drccf:increment")){
   
      destsaisine.addAspect("drccf:increment");
      destsaisine.properties["drccf:increment"] = 0;
      destsaisine.save();
    }
    var i = destsaisine.properties["drccf:increment"] + 1;
    var saisine = destsaisine.createFolder("SAISINE-" + i);
    destsaisine.properties["drccf:increment"] = i;
    destsaisine.save();

    saisine.properties["drc:nomSaisine"]=nomsaisine;
    saisine.properties["drc:region"]=region;
    saisine.properties["drc:typeDeTiers"]=typeDeTiers;
    saisine.properties["drc:nomDeTiers"]=nomDeTiers;
    saisine.properties["drc:piecejointe"]=piecejointe;
    saisine.save();

  } 
   model.nomsaisine = nomsaisine;
   model.region = region;
   model.typeDeTiers = typeDeTiers;
   model.nomDeTiers = nomDeTiers;
   model.piecejointe = piecejointe;
   model.statut = "saisine a ete cree avec succes";


