auth.runAsSystem();
var referenceVersement = "" ;
var dateVersement = "";
var montantVersement = "";
var modeReglement =  "";
var typeVersement =  "";
var affectaion =  "";
var file = null;

for each (field in formdata.fields)
{
 
  if (field.name == "file" && field.isFile)
  {
    file = field;
  }

  if (field.name == "referenceVersement")
  {
    referenceVersement = (field.value)? field.value: "";
  }
  
  if (field.name == "dateVersement")
  {
    dateVersement = (field.value)? field.value: "";
  }

  if (field.name == "montantVersement")
  {
    montantVersement = (field.value)? field.value: "";
  }

  if (field.name == "modeReglement")
  {
    modeReglement = (field.value)? field.value: "";
  }

  if (field.name == "typeVersement")
  {
    typeVersement = (field.value)? field.value: "";
  }

  if (field.name == "affectaion")
  {
    affectaion = (field.value)? field.value: "";
  }
}

var nomDossier = args.nomDossier;

if (nomDossier) {
  results = search.query(
    {
      language: "fts-alfresco",
      query: "PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/*' AND cm:name:'" + nomDossier + "'",
      sort: [{
        column: 'cm:name',
        ascending: true
      }]
    });
  
  var destversement = results[0].childByNamePath("07-VERSEMENTS");
  if (!destversement.hasAspect("drccf:increment")) {

    destversement.addAspect("drccf:increment");
    destversement.properties["drccf:increment"] = 0;
    destversement.save();

  }
  var i = destversement.properties["drccf:increment"] + 1;
  var versement = destversement.createFolder("VERSEMENT-" + i);
  destversement.properties["drccf:increment"] = i;
  destversement.save();

  versement.properties["drc:referenceVersement"] = referenceVersement;
  versement.properties["drc:dateVersement"] = new Date(dateVersement);
  versement.properties["drc:montantVersement"] = montantVersement;
  versement.properties["drc:modeReglement"] = modeReglement;
  versement.properties["drc:typeVersement"] = typeVersement;
  versement.properties["drc:affectaion"] = affectaion;
  versement.save();
 
if(file){

  upload = versement.createFile(file.filename) ;
  upload.properties.content.guessMimetype(file.filename);
  upload.properties.content.write(file.content);

}
}

model.upload = upload;
model.referenceVersement = referenceVersement;
model.dateVersement = dateVersement;
model.montantVersement = montantVersement;
model.modeReglement = modeReglement;
model.typeVersement = typeVersement;
model.affectaion = affectaion;
model.status = "versement cree avec succees";