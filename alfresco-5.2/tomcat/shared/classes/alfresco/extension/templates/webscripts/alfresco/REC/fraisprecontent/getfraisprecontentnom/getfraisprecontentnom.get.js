var nomDossier = args.nomDossier;
var nomFraisPrec = args.nomFraisPrec;
var results = null;
  
if(nomDossier){
    results = search.query(
      {
          language: "fts-alfresco",
          query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/*/*' AND cm:name:'" + nomFraisPrec + "'",
          sort: [{
                  column: 'cm:name',
                  ascending: true
              }]
      });
   }

   var  resFraisPrec = results[0];
   var date = resFraisPrec.properties["drc:datedeffdesir"];
   var stringDateD = "";

   if(date != null){
    var dateD = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    var hoursD = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var fullDate = dateD+' '+hoursD;
    stringDateD = fullDate;
  }

   var  nomfrais = resFraisPrec.properties["cm:name"];
   var  naturefrais = resFraisPrec.properties["drc:natureFrais"];
   var  typefrais = resFraisPrec.properties["drc:typeFrais"];
   var  tiers = resFraisPrec.properties["drc:tiers"];
   var  referencePvFacture = resFraisPrec.properties["drc:referencePvFacture"];
   var  montants = resFraisPrec.properties["drc:montants"];
   var  HT = resFraisPrec.properties["drc:HT"];
   var  TVA = resFraisPrec.properties["drc:TVA"];
   var  debours = resFraisPrec.properties["drc:debours"];
   var  datedeffdesir = stringDateD;
                   
model.nomfrais = nomfrais;
model.naturefrais = naturefrais;
model.typefrais = typefrais;
model.tiers = tiers;
model.referencePvFacture = referencePvFacture;
model.montants = montants;
model.HT = HT;
model.TVA = TVA;
model.debours = debours;
if(datedeffdesir == null){
  datedeffdesir = "";
}
model.datedeffdesir = datedeffdesir;
model.statut = "Liste Frais Precontentieuse";
