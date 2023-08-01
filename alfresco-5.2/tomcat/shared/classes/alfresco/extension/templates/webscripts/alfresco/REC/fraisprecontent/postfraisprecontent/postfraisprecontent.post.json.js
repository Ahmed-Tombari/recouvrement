auth.runAsSystem();
var naturefrais = json.get("naturefrais")+"";
var typefrais = json.get("typefrais")+"";
var tiers = json.get("tiers")+"";
var referencePvFacture = json.get("referencePvFacture")+"";
var montants = json.get("montants")+"";
var HT = json.get("HT")+"";
var TVA = json.get("TVA")+"";
var debours = json.get("debours")+"";
var datedeffdesir = null;
if(json.get("datedeffdesir")+"" != ""){
 datedeffdesir = json.get("datedeffdesir")+"";

}

var nomDossier = args.nomDossier;

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




 var destfraisprecontent = results[0].childByNamePath("08-FRAISPRECONTENT");
 if(!destfraisprecontent.hasAspect("drccf:increment")){

   destfraisprecontent.addAspect("drccf:increment");
   destfraisprecontent.properties["drccf:increment"] = 0;
   destfraisprecontent.save();
 }
 var i = destfraisprecontent.properties["drccf:increment"] + 1;
 var fraisprecontent = destfraisprecontent.createFolder("FRAISPRECONTENT-" + i);
 destfraisprecontent.properties["drccf:increment"] = i;
 destfraisprecontent.save();

 fraisprecontent.properties["drc:natureFrais"]=naturefrais;
 fraisprecontent.properties["drc:typeFrais"]=typefrais;
 fraisprecontent.properties["drc:tiers"]=tiers;
 fraisprecontent.properties["drc:referencePvFacture"]=referencePvFacture;
 fraisprecontent.properties["drc:montants"]=montants;
 fraisprecontent.properties["drc:HT"]=HT;
 fraisprecontent.properties["drc:TVA"]=TVA;
 fraisprecontent.properties["drc:debours"]=debours;
 fraisprecontent.properties["drc:datedeffdesir"]=datedeffdesir;
 fraisprecontent.save();
} 
model.naturefrais = naturefrais;
model.typefrais = typefrais;
model.tiers = tiers;
model.referencePvFacture = referencePvFacture;
model.montants = montants;
model.HT = HT;
model.TVA = TVA;
model.debours = debours;
if(datedeffdesir == null){
  datedeffdesir = "";
}
model.datedeffdesir = datedeffdesir;

model.statut = "fraisprecontent a ete cree avec succes";


