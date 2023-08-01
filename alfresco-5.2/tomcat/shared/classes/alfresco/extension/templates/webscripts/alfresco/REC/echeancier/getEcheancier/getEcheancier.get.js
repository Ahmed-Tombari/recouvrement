var nomDossier = args.nomDossier;
var Echeancier = [];
   var results = null;
   if(nomDossier){
    results = search.query(
      {
          language: "fts-alfresco",
          query: "PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary//*' AND cm:name:'" + nomDossier + "'",
          sort: [{
                  column: 'cm:name',
                  ascending: true
              }]
      });
   }

   var destEcheancier = results[0].childByNamePath("05-ECHEANCIER").children;

   for each(var dest in destEcheancier){
    var date = dest.properties["drc:datePremiereEcheancier"];
    /*var stringDateD = "";
 
    if(date != null){
     var dateD = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
     var hoursD = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
     var fullDate = dateD+' '+hoursD;
     stringDateD = fullDate;*/
    Echeancier.push({ 
                       "nomEcheancier":dest.properties["cm:name"],
                       "periodicite":dest.properties["drc:periodicite"],
                       "montant":dest.properties["drc:montantecheancier"],
                       "datePremiereEcheancier":new Date(dest.properties["drc:datePremiereEcheancier"]).toLocaleDateString(),
    });
   }
 
   model.nomDossier = nomDossier;
   model.Echeancier = Echeancier;
   model.statut = "Liste des Echeancier";