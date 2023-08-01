var File = null,
File = json.get("File") + "";
var nomDossier = args.nomDossier;
var nomVersement = args.nomVersement;

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
 // create document in company home from uploaded file
 upload = resVersement.createFile(File.name);
 upload.properties.content.guessMimetype(File.name);
 upload.properties.content.write(File.content);
// upload.save();
 // setup model for response template
 model.upload = upload;

model.statut = "Document a ete cree avec succes";