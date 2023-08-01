auth.runAsSystem();
   var nomcreance = json.get("nomcreance")+"";
   var montant = json.get("montant")+"";
   var nature = json.get("nature")+"";
   var datedeffdesir = json.get("datedeffdesir")+"";
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
 var destcreance = results[0].childByNamePath("06-CREANCE");
    if(!destcreance.hasAspect("drccf:increment")){
   
      destcreance.addAspect("drccf:increment");
      destcreance.properties["drccf:increment"] = 0;
      destcreance.save();
    }
    var i = destcreance.properties["drccf:increment"] + 1;
    var creance = destcreance.createFolder("CREANCE-" + i);
    destcreance.properties["drccf:increment"] = i;
    destcreance.save();

    creance.properties["drc:nomcreance"]=nomcreance;
    creance.properties["drc:detailmontant"]=montant;
    creance.properties["drc:nature"]=nature;
    creance.properties["drc:dateDeffIr"]=datedeffdesir;
    creance.save();

  }
  // model Creance 
   model.nomcreance = nomcreance;
   model.montant = montant;
   model.nature = nature;
   model.datedeffdesir = datedeffdesir;
   model.statut = "creance a ete cree avec succes";


