var nomDossier = args.nomDossier;
var results = null;
var dossiersname = [];
var echeancier = [];
var versement = [];
var garantie = [];
var creance = [];
var saisine = [];
var fraispercont = [];
var fraisjudic = [];


//Recherche nomDossier avec Solar
if(nomDossier){
results = search.query(
  {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/*' AND cm:name:'"+nomDossier+"'" ,
      sort: [{
              column: 'cm:name',
              ascending: true
          }]
  });
  var destEcheancier = results[0].childByNamePath("05-ECHEANCIER").children;
  var rescreance = results[0].childByNamePath("06-CREANCE").children;
  var resv = results[0].childByNamePath("07-VERSEMENTS").children;
  var resfraisprec = results[0].childByNamePath("08-FRAISPRECONTENT").children;
  var resgarantie = results[0].childByNamePath("09-GARANTIE").children;
  var ressaisine = results[0].childByNamePath("10-SAISINE").children;  
  var resfriasjudic = results[0].childByNamePath("11-FRAISJUDICIARE").children;    
} 
//Retourner tout les Dossiers avec Solar

    //Verifier Si Not Null
if(results.length > 0)

  {
    res = results;
  }
  
  //Retourner de tout les Modeles d'un dossier
  for each(var result in res) {

 
    var dateDeffet = result.properties["drct:dateDEffetDesIr"];
    var stringDateff = "";
// logger.system.out("-----> " + d);

    if(dateDeffet != null){
      var dateff = dateDeffet.getFullYear()+'-'+(dateDeffet.getMonth()+1)+'-'+dateDeffet.getDate();
      var hoursff = dateDeffet.getHours() + ":" + dateDeffet.getMinutes() + ":" + dateDeffet.getSeconds();
      var fullDate = dateff+' '+hoursff;
      stringDateff = fullDate;
    }

    

    dossiersname.push({ 
                      //information Generale
                       "nomDossier":result.properties["cm:name"],
                       "phase":result.properties["drccf:phase"],
                       "nom":result.properties["drct:nom"],
                       "prenom":result.properties["drct:prenom"],
                       "telephone":result.properties["drct:telephone"],
                       "cin":result.properties["drct:cin"],
                       "adresse":result.properties["drct:adresse"],
                       "codepostale":result.properties["drct:codepostale"],
                       "ville":result.properties["drct:ville"],
                       "gouvernorat":result.properties["drct:gouvernorat"],
                       "pays":result.properties["drct:pays"],
                       "raisonSociale":result.properties["drct:raisonSociale"],
                       "identifiant":result.properties["drct:identifiant"],
                       "montantDeCreance":result.properties["drct:montantDeCreance"],
                       "interetDeRetard":result.properties["drct:interetDeRetard"],
                       "fraisDeDossier":result.properties["drct:fraidDeDossier"],
                       "natureDeLaCreance":result.properties["drct:natureDeLaCreance"],
                       "garant":result.properties["drct:garant"],
                       "statusAmiable":result.properties["drccf:statusAmiable"],
                       "statusContentieuse":result.properties["drccf:statusContentieuse"],
                       "statusPrecontentieuse":result.properties["drccf:statusPrecontentieuse"],
                        "statutMessage": result.properties["drccf:statutNotificationMessage"] != undefined?result.properties["drccf:statutNotificationMessage"].toString():'',
                        "statutAppel": result.properties["drccf:statutNotificationAppel"]!= undefined?result.properties["drccf:statutNotificationAppel"].toString():'',
                        "typeRelance":result.properties["drccf:typeRelance"],
                        "nombreMessageDeRappel":result.properties["drccf:nombreMessageDeRappel"],
                        "nombreAppel":result.properties["drccf:nombreAppel"],
                      });
}

//information Versement
for each(var result in resv) {
  var datev = result.properties["drc:dateVersement"];
  var dateversement = "";
  if(datev != null){
    var datevv = datev.getFullYear()+'-'+(datev.getMonth()+1)+'-'+datev.getDate();
    var hoursvv = datev.getHours() + ":" + datev.getMinutes() + ":" + datev.getSeconds();
    var fullDate = datevv+' '+hoursvv;
    dateversement = fullDate;
  }
 
  
  
  versement.push({ "nomVersement":result.properties["cm:name"],
                   "dateVersement":dateversement,
                   "montantVersement":result.properties["drc:montantVersement"],
                   "modeReglement":result.properties["drc:modeReglement"],
                   "affectaion":result.properties["drc:affectaion"],
                 });
}
//information Echeancier
for each(var dest in destEcheancier){

  var dateech = dest.properties["drc:datePremiereEcheancier"];
  var dateechiancier = "";
  if(dateech != null){
    var dateechi = dateech.getFullYear()+'-'+(dateech.getMonth()+1)+'-'+dateech.getDate();
    var hoursech = dateech.getHours() + ":" + dateech.getMinutes() + ":" + dateech.getSeconds();
    var fullDate = dateechi+' '+hoursech;
    dateechiancier = fullDate;
  }

  echeancier.push({ 
                  "nomEcheancier":dest.properties["cm:name"],
                  "periodicite":dest.properties["drc:periodicite"],
                  "montant":dest.properties["drc:montantecheancier"],
                  "datePremiereEcheancier":dateechiancier,
                 });
}
//information fraisprecont
for each(var result in resfraisprec) {
  var datefpr = result.properties["drc:datedeffdesir"];
  var datrfraisprec = "";
 if(datefpr != null){
   var datefpr1 = datefpr.getFullYear()+'-'+(datefpr.getMonth()+1)+'-'+datefpr.getDate();
   var hoursfpr1 = datefpr.getHours() + ":" + datefpr.getMinutes() + ":" + datefpr.getSeconds();
   var fullDate = datefpr1+' '+hoursfpr1;
   datrfraisprec = fullDate;
 }
 
fraispercont.push({ 
                   "fraisprecont":result.properties["cm:name"],
                   "naturefrais":result.properties["drc:natureFrais"],
                   "typefrais":result.properties["drc:typeFrais"],
                   "tiers":result.properties["drc:tiers"],
                   "montant":result.properties["drc:montants"],
                   "datedeffdesir":datrfraisprec,
                  });
}

 //information garantie
 for each(var result in resgarantie) {
  var dateFinDeLH = result.properties["drc:datefinhypotheque"];
  var stringDateFLH = "";

  if(dateFinDeLH != null){
    var dateFLH = dateFinDeLH.getFullYear()+'-'+(dateFinDeLH.getMonth()+1)+'-'+dateFinDeLH.getDate();
    var hoursFLH = dateFinDeLH.getHours() + ":" + dateFinDeLH.getMinutes() + ":" + dateFinDeLH.getSeconds();
    var fullDate = dateFLH+' '+hoursFLH;
    stringDateFLH = fullDate;
  }
  
    garantie.push({ 
                   "nomgarantie":result.properties["cm:name"],
                   "typeGar":result.properties["drc:typeGar"],
                   "natureHypotheque":result.properties["drc:natureHypotheque"],
                   "Rang":result.properties["drc:rang"],
                   "immatriculation":result.properties["drc:immatriculation"],
                   "dateFinDeLHypotheque":stringDateFLH,
                   "montantDeLHypotheque":result.properties["drc:montanthypotheque"],
                   "valeurestimee":result.properties["drc:valeurestimee"],
                   "hypothequebanque":result.properties["drc:hypothequebanque"],
                   "beneficiairehypotheque":result.properties["drc:beneficiairehypotheque"],
                  });
}

 //information creance
 for each(var result in rescreance){
  var datecrean = result.properties["drc:dateDeffIr"];
  var dateDeffIr = "";
  if(datecrean != null){
    var datecre = datecrean.getFullYear()+'-'+(datecrean.getMonth()+1)+'-'+datecrean.getDate();
    var hourscre = datecrean.getHours() + ":" + datecrean.getMinutes() + ":" + datecrean.getSeconds();
    var fullDate = datecre+' '+hourscre;
    dateDeffIr = fullDate;
  }
     creance.push({  
                   "nomdossiercrean":result.properties["cm:name"],
                   "nomcreance":result.properties["drc:nomcreance"],
                   "montant":result.properties["drc:detailmontant"],
                   "nature":result.properties["drc:nature"],
                   "datedeffdesir":dateDeffIr,
                  });
 }
 
 //information saisine
 for each(var result in ressaisine) {
  
     saisine.push({ 
                   "nom":result.properties["cm:name"],
                   "nomsaisine":result.properties["drc:nomSaisine"],
                   "region":result.properties["drc:region"],
                   "typeDeTiers":result.properties["drc:typeDeTiers"],
                   "nomDeTiers":result.properties["drc:nomDeTiers"],
                   "piecejointe":result.properties["drc:piecejointe"],
                  });
}

 //information friasjudiciare 
 for each(var result in resfriasjudic) {
  
  fraisjudic.push({
                   "nomfraisjdc":result.properties["cm:name"],
                   "nom":result.properties["drc:nomjudic"],
                   "prenom":result.properties["drc:prenomjudic"],
                   "typedeTiers":result.properties["drc:typedeTiers"],
                   "facturation":result.properties["drc:facturation"],
                   "paiment":result.properties["drc:paiment"],
                   "typedeSaisine":result.properties["drc:typedeSaisine"],
                  });
}

  model.fraispercont = fraispercont;
  model.fraisjudic = fraisjudic;
  model.creance = creance;
  model.saisine = saisine;
  model.garantie = garantie;
  model.versement = versement;
  model.dossiersname = dossiersname;
  model.echeancier = echeancier;
  model.nomDossier = nomDossier;
  model.statut = "Succees";
