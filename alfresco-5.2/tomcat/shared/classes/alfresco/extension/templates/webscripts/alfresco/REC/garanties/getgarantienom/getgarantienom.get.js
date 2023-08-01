var nomDossier = args.nomDossier;
var nomGarantie = args.nomGarantie;
var results = null;
  
if(nomDossier){
    results = search.query(
      {
          language: "fts-alfresco",
          query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/*/*' AND cm:name:'" + nomGarantie + "'",
          sort: [{
                  column: 'cm:name',
                  ascending: true
              }]
      });
   } 

   var resGarantie = results[0];
   var date = resGarantie.properties["drc:datefinhypotheque"];
   var stringDateD = "";

   if(date != null){
    var dateD = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    var hoursD = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var fullDate = dateD+' '+hoursD;
    stringDateD = fullDate;
  }

   var nomGarantie = resGarantie.properties["cm:name"];
   var typeGar = resGarantie.properties["drc:typeGar"];
   var natureHypotheque = resGarantie.properties["drc:natureHypotheque"];
   var immatriculation = resGarantie.properties["drc:immatriculation"];
   var rang = resGarantie.properties["drc:rang"];
   var datefinhypotheque = stringDateD;
   var montanthypotheque = resGarantie.properties["drc:montanthypotheque"];
   var valeurestimee = resGarantie.properties["drc:valeurestimee"];
   var hypothequebanque = resGarantie.properties["drc:hypothequebanque"];
   var beneficiairehypotheque = resGarantie.properties["drc:beneficiairehypotheque"];


  model.nomGarantie = nomGarantie;
  model.typeGar = typeGar;
  model.natureHypotheque = natureHypotheque;
  model.immatriculation = immatriculation;
  model.rang = rang;
  model.datefinhypotheque = datefinhypotheque;
  model.montanthypotheque = montanthypotheque;
  model.valeurestimee = valeurestimee;
  model.hypothequebanque = hypothequebanque;
  model.beneficiairehypotheque = beneficiairehypotheque;
  model.statut = "Liste Garantie";
