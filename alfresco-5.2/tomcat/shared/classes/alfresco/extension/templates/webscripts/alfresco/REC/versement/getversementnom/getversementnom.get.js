var nomDossier = args.nomDossier;
var nomVersement = args.nomVersement;
var results = null;
  
if(nomDossier){
    results = search.query(
      {
          language: "fts-alfresco",
          query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/*/*' AND cm:name:'" + nomVersement + "'",
          sort: [{
                  column: 'cm:name',
                  ascending: true
              }]
      });
   } 

   var resVersement = results[0];
   var date = resVersement.properties["drc:dateVersement"];
   var stringDateD = "";

   if(date != null){
    var dateD = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    var hoursD = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var fullDate = dateD+' '+hoursD;
    stringDateD = fullDate;
  }

   var nom = resVersement.properties["cm:name"];
   var referenceVersement = resVersement.properties["drc:referenceVersement"];
   var dateVersement = stringDateD;
   var montantVersement = resVersement.properties["drc:montantVersement"];
   var modeReglement = resVersement.properties["drc:modeReglement"];
   var typeVersement = resVersement.properties["drc:typeVersement"];
   var affectaion = resVersement.properties["drc:affectaion"];


   //Telecharger Dossier

   var Doc = results[0].children;
   var name = Doc[0].properties["cm:name"];
   var content = Doc[0].properties["cm:content"];
   var telecharger = "http://127.0.0.1:8080/alfresco/webdav/Sites/recouvrement/documentLibrary/BROUILLON/" + nomDossier + "/07-VERSEMENTS/" + nomVersement + "/"+name+""

 model.nom = nom;
 model.referenceVersement = referenceVersement;
 model.dateVersement = dateVersement;
 model.montantVersement = montantVersement;
 model.modeReglement = modeReglement;
 model.typeVersement = typeVersement;
 model.affectaion = affectaion;
 model.name = name;
 model.telecharger = telecharger;
 model.statut = "Liste Versement";