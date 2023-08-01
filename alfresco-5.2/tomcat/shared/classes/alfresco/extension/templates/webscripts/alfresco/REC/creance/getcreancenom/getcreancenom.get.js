var nomDossier = args.nomDossier;
var nomCreance = args.nomCreance;
var results = null;
  
if(nomDossier){
    results = search.query(
      {
          language: "fts-alfresco",
          query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/*/*' AND cm:name:'" + nomCreance + "'",
          sort: [{
                  column: 'cm:name',
                  ascending: true
              }]
      });
   }

   var destCrance = results[0];
   var date = destCrance.properties["drc:dateDeffIr"];
   var stringDateD = "";

   if(date != null){
    var dateD = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    var hoursD = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var fullDate = dateD+' '+hoursD;
    stringDateD = fullDate;
  }

   var  nom = destCrance.properties["cm:name"];
   var  nomcr = destCrance.properties["drc:nomcreance"];
   var  montant = destCrance.properties["drc:detailmontant"];
   var  nature = destCrance.properties["drc:nature"];
   var  datedeffdesir = stringDateD;
                     
   model.nom = nom;
   model.nomcr = nomcr;
   model.montant = montant;
   model.nature = nature;
   model.datedeffdesir = datedeffdesir;
   model.statut = "Liste creance";
