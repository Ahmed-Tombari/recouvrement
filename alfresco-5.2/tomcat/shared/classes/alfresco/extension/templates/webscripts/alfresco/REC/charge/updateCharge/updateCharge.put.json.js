 //  var nomchargee = json.get("")+"";
   var disponibilite = json.get("disponibilite")+"";
   var dateDeLaProchaineDisponibilite = json.get("dateDeLaProchaineDisponibilite")+"";
   var gouvernoratchargee = json.get("gouvernoratchargee")+"";
   var nomchargee = args.nomchargee;
  // to do : test for null
  if(nomchargee){
    results = search.query(
      {
          language: "fts-alfresco",
          query:"PATH:'/app:company_home/app:dictionary/cm:charge/*' AND cm:name:'"+nomchargee+"'",
          sort: [{
                  column: 'cm:name',
                  ascending: true
              }]
      });
 
      // results.properties["chm:nomchargee"]=nomchargee;
      results.properties["chm:disponibilite"]=disponibilite;
      results.properties["chm:dateDeLaProchaineDisponibilite"]=dateDeLaProchaineDisponibilite;
      results.properties["chm:gouvernoratchargee"]=gouvernoratchargee;
      
      results.save();
  } 
   
    model.nomchargee = nomchargee;
    model.disponibilite = disponibilite;
    model.dateDeLaProchaineDisponibilite = dateDeLaProchaineDisponibilite;
    model.gouvernoratchargee = gouvernoratchargee;
    model.statut = "succees";