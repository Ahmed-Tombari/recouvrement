var nomDossier = args.nomDossier;
var nomFraisJud = args.nomFraisJud;
var results = null;
  
if(nomDossier){
    results = search.query(
      {
          language: "fts-alfresco",
          query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/*/*' AND cm:name:'" + nomFraisJud + "'",
          sort: [{
                  column: 'cm:name',
                  ascending: true
              }]
      });
   } 

   var resFraisJud = results[0];
   var nomfrais = resFraisJud.properties["cm:name"];
   var nom = resFraisJud.properties["drc:nomjudic"];
   var prenom = resFraisJud.properties["drc:prenomjudic"];
   var typedeTiers = resFraisJud.properties["drc:typedeTiers"];
   var facturation = resFraisJud.properties["drc:facturation"];
   var paiment = resFraisJud.properties["drc:paiment"];
   var typedeSaisine = resFraisJud.properties["drc:typedeSaisine"];

   model.nomfrais = nomfrais;
   model.nom = nom;
   model.prenom = prenom;
   model.typedeTiers = typedeTiers;
   model.facturation = facturation;
   model.paiment = paiment;
   model.typedeSaisine = typedeSaisine;
   model.statut = "List Frais Judiciare";
