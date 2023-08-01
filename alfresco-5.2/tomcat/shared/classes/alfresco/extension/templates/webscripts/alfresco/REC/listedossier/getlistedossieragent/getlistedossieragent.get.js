//Recherche nomDossier avec Solar
var results = null;
var dossiers = [];
nomAgent = args.nomAgent;
if(nomAgent){
  results = search.query(
    {
        language: "fts-alfresco",
        query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/*' AND drccf:agent:'" + nomAgent + "'" ,
        sort: [{
                column: 'cm:name',
                ascending: true
            }]
    });
  
  } else {
    results = search.query(
      {
          language: "fts-alfresco",
          query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/*' AND cm:name:'Dossier_Recouvrement-*'",
          sort: [{
                  column: 'cm:name',
                  ascending: true
              }]
      });
   }
      //Verifier Si Not Null
  
      if(results.length > 0)
  
      {
        var res = results;
      }
      
      //Retourner de tout les Modeles d'un dossier
      for each(var result in res) {
      
      //Changer Type Date To String
        var date = result.properties["drct:date"];
        var created = result.properties["cm:created"];
        var modified = result.properties["cm:modified"];
       
    
        var stringDateD = "";
        var stringDateC = "";
        var stringDateM = "";
       
       // logger.system.out("-----> " + d);
    
        if(date != null){
          var dateD = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
          var hoursD = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
          var fullDate = dateD+' '+hoursD;
          stringDateD = fullDate;
        }
    
        if(created != null){
          var create = created.getFullYear()+'-'+(created.getMonth()+1)+'-'+created.getDate();
          var hoursC = created.getHours() + ":" + created.getMinutes() + ":" + created.getSeconds();
          var fullDate = create+' '+hoursC;
          stringDateC = fullDate;
        }
    
        if(modified != null){
          var modif = modified.getFullYear()+'-'+(modified.getMonth()+1)+'-'+modified.getDate();
          var hoursM = modified.getHours() + ":" + modified.getMinutes() + ":" + modified.getSeconds();
          var fullDate = modif+' '+hoursM;
          stringDateM = fullDate;
        }
    
      
        dossiers.push({ "nomDossier":result.properties["cm:name"],
                        "nom":result.properties["drct:nom"],
                        "prenom":result.properties["drct:prenom"],
                        "adresse":result.properties["drct:adresse"],
                        "telephone":result.properties["drct:telephone"],
                        "cin":result.properties["drct:cin"],
                        "gouvernorat":result.properties["drct:gouvernorat"],
                        "etat":result.properties["drccf:etat"],
                        "statusAmiable":result.properties["drccf:statusAmiable"],
                        "statusContentieuse":result.properties["drccf:statusContentieuse"],
                        "statusPrecontentieuse":result.properties["drccf:statusPrecontentieuse"],
                        "date":stringDateD,
                        "phase":result.properties["drccf:phase"],
                        "created":stringDateC,
                        "modified":stringDateM,
                        "agent":result.properties["drccf:agent"],
                        "montant":result.properties["drct:montantDeCreance"],
                        "typeRelance":result.properties["drccf:typeRelance"],
                        "nombreMessageDeRappel":result.properties["drccf:nombreMessageDeRappel"],
                        "nombreAppel":result.properties["drccf:nombreAppel"],
  
                      });
    }
    
      model.dossiers = dossiers;
      model.statut = "Liste Dossiers";