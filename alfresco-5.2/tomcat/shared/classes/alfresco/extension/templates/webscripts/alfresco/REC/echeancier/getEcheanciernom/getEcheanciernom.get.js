var nomDossier = args.nomDossier;
var nomEcheancier = args.nomEcheancier;
var results = null;
  
if(nomDossier){
    results = search.query(
      {
          language: "fts-alfresco",
          query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/*/*' AND cm:name:'" + nomEcheancier + "'",
          sort: [{
                  column: 'cm:name',
                  ascending: true
              }]
      });
   } 

   var destEcheancier = results[0];
   var date = destEcheancier.properties["drc:datePremiereEcheancier"];
   /*var stringDateD = "";

   if(date != null){
    var dateD = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    var hoursD = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var fullDate = dateD+' '+hoursD;
    stringDateD = fullDate;
  }*/

   var  nom = destEcheancier.properties["cm:name"]; 
   var  periodicite = destEcheancier.properties["drc:periodicite"];
   var  montant = destEcheancier.properties["drc:montantecheancier"];
   var  datePremiereEcheancier = new Date(destEcheancier.properties["drc:datePremiereEcheancier"]).toLocaleDateString();
                      
model.nom = nom;
model.periodicite = periodicite;
model.montant = montant;
model.datePremiereEcheancier = datePremiereEcheancier;
model.statut = "Liste echeancier";