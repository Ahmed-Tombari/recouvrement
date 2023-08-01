var nomDossier = args.nomDossier;
var results = null;
var fraisprecontent = [];

if(nomDossier){
results = search.query(
  {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary//*' AND cm:name:'"+nomDossier+"'"  ,
      sort: [{
              column: 'cm:name',
              ascending: true
          }]
  });
  var resv = results[0].childByNamePath("08-FRAISPRECONTENT").children;
  
} 

  for each(var result in resv) {

    var datedeffdesir = result.properties["drc:datedeffdesir"];

    if(datedeffdesir == null){
      datedeffdesir = "";
    }

    var date = result.properties["drc:datedeffdesir"];
   var stringDateD = "";

   if(date != null){
    var dateD = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    var hoursD = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var fullDate = dateD+' '+hoursD;
    stringDateD = fullDate;
  }
    

    fraisprecontent.push({
                           "nomfrais":result.properties["cm:name"],
                           "naturefrais":result.properties["drc:natureFrais"],
                           "typefrais":result.properties["drc:typeFrais"],
                           "tiers":result.properties["drc:tiers"],
                           "referencePvFacture":result.properties["drc:referencePvFacture"],
                           "montants":result.properties["drc:montants"],
                           "HT":result.properties["drc:HT"],
                           "TVA":result.properties["drc:TVA"],
                           "debours":result.properties["drc:debours"],
                           "datedeffdesir":stringDateD,
                    });
}

  model.fraisprecontent = fraisprecontent;
  model.nomDossier = nomDossier;
  model.statut = "Liste Dossiers";
