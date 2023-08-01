auth.runAsSystem();
   var typeGar = json.get("typeGar")+"";
   var natureHypotheque = json.get("natureHypotheque")+"";
   var immatriculation = json.get("immatriculation")+"";
   var rang = json.get("rang")+"";
   var datefinhypotheque = json.get("datefinhypotheque")+"";
   var montanthypotheque = json.get("montanthypotheque")+"";
   var valeurestimee = json.get("valeurestimee")+"";
   var hypothequebanque = json.get("hypothequebanque")+"";
   var beneficiairehypotheque = json.get("beneficiairehypotheque")+"";
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
  


   
    var destgarantie = results[0].childByNamePath("09-GARANTIE");
    if(!destgarantie.hasAspect("drccf:increment")){
   
      destgarantie.addAspect("drccf:increment");
      destgarantie.properties["drccf:increment"] = 0;
      destgarantie.save();
    }
    var i = destgarantie.properties["drccf:increment"] + 1;
    var garantie = destgarantie.createFolder("GARANTIE-" + i);
    destgarantie.properties["drccf:increment"] = i;
    destgarantie.save();

    garantie.properties["drc:typeGar"]=typeGar;
    garantie.properties["drc:natureHypotheque"]=natureHypotheque;
    garantie.properties["drc:immatriculation"]=immatriculation;
    garantie.properties["drc:rang"]=rang;
    garantie.properties["drc:datefinhypotheque"]=datefinhypotheque;
    garantie.properties["drc:montanthypotheque"]=montanthypotheque;
    garantie.properties["drc:valeurestimee"]=valeurestimee;
    garantie.properties["drc:hypothequebanque"]=hypothequebanque;
    garantie.properties["drc:beneficiairehypotheque"]=beneficiairehypotheque;
    garantie.save();

  } 
   model.nomDossier = nomDossier;
   model.typeGar = typeGar;
   model.natureHypotheque = natureHypotheque;
   model.immatriculation = immatriculation;
   model.rang = rang;
   model.datefinhypotheque = datefinhypotheque;
   model.montanthypotheque = montanthypotheque;
   model.valeurestimee = valeurestimee;
   model.hypothequebanque = hypothequebanque;
   model.beneficiairehypotheque = beneficiairehypotheque;
   
   

   model.statut = "garantie a ete cree avec succes";


