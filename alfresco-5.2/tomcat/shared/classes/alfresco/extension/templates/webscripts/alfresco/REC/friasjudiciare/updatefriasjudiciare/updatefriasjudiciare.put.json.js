auth.runAsSystem();
var nom = json.get("nom")+"";
var prenom = json.get("prenom")+"";
var typedeTiers = json.get("typedeTiers")+"";
var facturation = json.get("facturation")+"";
var paiment = json.get("paiment")+"";
var typedeSaisine = json.get("typedeSaisine")+"";
var nomFraisJud = args.nomFraisJud;
var nomDossier = args.nomDossier;

if (nomDossier) {
  results = search.query(
    {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/*/*' AND cm:name:'" + nomFraisJud + "'",
      sort: [{
        column: 'cm:name',
        ascending: true
      }]
    });

    results[0].properties["drc:nomjudic"]=nom;
    results[0].properties["drc:prenomjudic"]=prenom;
    results[0].properties["drc:typedeTiers"]=typedeTiers;
    results[0].properties["drc:facturation"]=facturation;
    results[0].properties["drc:paiment"]=paiment;
    results[0].properties["drc:typedeSaisine"]=typedeSaisine;
    results[0].save();
  }

   model.nom = nom;
   model.prenom = prenom;
   model.typedeTiers = typedeTiers;
   model.facturation = facturation;
   model.paiment = paiment;
   model.typedeSaisine = typedeSaisine;
   model.statut = "frais judiciare a ete modifiee avec succes";