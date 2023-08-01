var nomDossier = args.nomDossier;
var versements = [];
var results = null;
var result = null;
var doc;
var telecharger;

      results = search.query(
         {
             language: "fts-alfresco",
             query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/cm:_x0030_7-VERSEMENTS/*'",
             sort: [{
                     column: 'cm:name',
                     ascending: true
                 }]
         });

for each(var versement in results){

if(versement.children.length > 0){

   doc = versement.children[0].properties["sys:node-uuid"];
  var nomdoc = versement.children[0].name;

   var date = versement.properties["drc:dateVersement"];
   var stringDateD = "";

if(date != null){
 var dateD = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
 var hoursD = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
 var fullDate = dateD+' '+hoursD;
 stringDateD = fullDate;
}

   telecharger = "/api/-default-/public/alfresco/versions/1/nodes/"+doc+"/content";
  
   versements.push({ 

      "nomVersement":versement.name,
      "referenceVersement":versement.properties["drc:referenceVersement"],
      "dateVersement":stringDateD,
      "montantVersement":versement.properties["drc:montantVersement"],
      "modeReglement":versement.properties["drc:modeReglement"],
      "typeVersement":versement.properties["drc:typeVersement"],
      "affectaion":versement.properties["drc:affectaion"],
      "telecharger":telecharger,
      "nomdoc":nomdoc,
        
      });
   }
}

   model.nomDossier = nomDossier;
   model.Versement = versements;
   model.statut = "Liste des Versement";