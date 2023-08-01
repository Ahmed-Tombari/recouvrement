auth.runAsSystem();
var typeGar = json.get("typeGar")+"";
var natureHypotheque = json.get("natureHypotheque")+"";
var immatriculation = json.get("immatriculation")+"";
var rang = json.get("rang")+"";
var datefinhypotheque = json.get("datefinhypotheque")+"";
var montanthypotheque = json.get("montanthypotheque")+"";
var valeurestimee = json.get("valeurestimee")+"";
var hypothequebanque = json.get("hypothequebanque")+"";
var beneficiairehypotheque = json.get("beneficiairehypotheque")+"";
var nomGarantie = args.nomGarantie;
var nomDossier = args.nomDossier;

if (nomDossier) {
  results = search.query(
    {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/cm:" + nomDossier + "/*/*' AND cm:name:'" + nomGarantie + "'",
      sort: [{
        column: 'cm:name',
        ascending: true
      }]
    });

    results[0].properties["drc:typeGar"]=typeGar;
    results[0].properties["drc:natureHypotheque"]=natureHypotheque;
    results[0].properties["drc:immatriculation"]=immatriculation;
    results[0].properties["drc:rang"]=rang;
    results[0].properties["drc:datefinhypotheque"]=datefinhypotheque;
    results[0].properties["drc:montanthypotheque"]=montanthypotheque;
    results[0].properties["drc:valeurestimee"]=valeurestimee;
    results[0].properties["drc:hypothequebanque"]=hypothequebanque;
    results[0].properties["drc:beneficiairehypotheque"]=beneficiairehypotheque;
    results[0].save();
  }


  model.nomDossier = nomDossier;
  model.typeGar = typeGar;
  model.natureHypotheque = natureHypotheque;
  model.immatriculation = immatriculation;
  model.rang = rang;
  model.datefinhypotheque = datefinhypotheque;
  model.montanthypotheque = montanthypotheque;
  model.valeurestimee = valeurestimee;
  model.hypothequebanque = hypothequebanque;
  model.beneficiairehypotheque = beneficiairehypotheque;
  model.statut = "garantie a ete modifiee avec succes";