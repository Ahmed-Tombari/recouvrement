auth.runAsSystem();
var nomcreance = json.get("nomcreance")+"";
var montant = json.get("montant")+"";
var nature = json.get("nature")+"";
var datedeffdesir = json.get("datedeffdesir")+"";
var nomCreance = args.nomCreance;
var nomDossier = args.nomDossier;

if (nomDossier) {
  results = search.query(
    {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/*/*' AND cm:name:'" + nomCreance + "'",
      sort: [{
        column: 'cm:name',
        ascending: true
      }]
    });

    results[0].properties["drc:nomcreance"]=nomcreance;
    results[0].properties["drc:detailmontant"]=montant;
    results[0].properties["drc:nature"]=nature;
    results[0].properties["drc:dateDeffIr"]=datedeffdesir;
    results[0].save();
  }

   model.nomcreance = nomcreance;
   model.montant = montant;
   model.nature = nature;
   model.datedeffdesir = datedeffdesir;
   model.statut = "creance a ete modifiee avec succes";