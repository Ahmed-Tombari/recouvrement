



function copyStructure(template, to) {
	if (template) {
	   var templates = template.children;
 
	   for ( var i in templates) {
		  var child = templates[i];
 
		  if (child.getTypeShort() != "cm:systemfolder") {
			 logger.system.out("child=" + child.name);
				 var newChild = child.copy(to);
 
			 newChild.setInheritsPermissions(false);
			 if ((child.getTypeShort() != "cm:content") && child.children && child.children.length) {
				this.copyStructure(child, newChild);
			 }
		  }
	   }
	}
 }
 
 
 function intparamsREC(dossier){
 /*var ctxt = org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
 var wsbean = ctxt.getBean('workflowServiceImpl', org.alfresco.repo.workflow.WorkflowServiceImpl);
 var ws = ctxt.getBean('activitiProcessEngine', org.activiti.engine.impl.ProcessEngineImpl);
 var properties =  ctxt.getBean('global-properties', java.util.Properties);*/
 
 var template = companyhome.childrenByXPath("/app:company_home/app:dictionary/cm:Config/*")[0];
 var csv = template;
 var lines = csv.content.split("\n");
  
 var notificationMessageAppel = "";
 
 
 for (var i = 1; i < lines.length; i++) {
	 var line = lines[i].split(";");
	 if(line[0] == "com.addinn.recouvrement.notificationMessageAppel"){
		 
		 notificationMessageAppel = line[1];
		 
		 break;
	 }
	 
 }
 
 
 
 var Transition = notificationMessageAppel;
 
 
 
 //var Transition = "NotificationSerie";
	 //properties["com.addinn.recouvrement.notificationMessageAppel"];
 
 var item = dossier;
 //var instanceWorkflow = item.getActiveWorkflows()[0].getId().replace("activiti$", "");
 //var result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
 //var taskId = result.get(0).id;
 var response = {};
 
 
 if(!item.hasAspect("drccf:parametrageNotification") && Transition.indexOf("NotificationSerie") != -1){
 
 
 
	item.addAspect("drccf:parametrageNotification");
	 item.properties["drccf:statutNotificationMessage"] = false;
	 item.properties["drccf:statutNotificationAppel"] = true;
	 item.properties["drccf:nombreMessageDeRappel"] = 0;
	 item.save();
	 response = {
	 
		 "statutMessage": item.properties["drccf:statutNotificationMessage"].toString(),
		 "statutAppel": item.properties["drccf:statutNotificationAppel"].toString(),
		 "choixDeParcours": Transition
		 
	 };
	 //wsbean.endTask("activiti$"+taskId,"Next");
	 //result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
 
 
 
 }
 else if(!item.hasAspect("drccf:parametrageNotification") && Transition.indexOf("NotificationParallele") != -1){
 
	 item.addAspect("drccf:parametrageNotification");
	 item.properties["drccf:statutNotificationMessage"] = true;
	 item.properties["drccf:statutNotificationAppel"] = true;
	 item.save();
	 response = {
	 
		 "statutMessage": item.properties["drccf:statutNotificationMessage"].toString(),
		 "statutAppel": item.properties["drccf:statutNotificationAppel"].toString(),
		 "choixDeParcours": Transition
		 
	 };
	 //wsbean.endTask("activiti$"+taskId,"Next");
	 //result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
 
 }
 }
 
 
 
 
 function main() {
	 var template = companyhome.childrenByXPath("/app:company_home/app:dictionary/app:space_templates/cm:DOSSIERRECOUVREMENT")[0];
 
 
 var dossierDestination = document.parent.parent.childByNamePath("BROUILLON"); 
 
	 var wfName = "PhaseAmiable";
	   var wfdef = workflow.getDefinitionByName("activiti$"+wfName);
		 var csv = document;
  
		 var lines = csv.content.split("\n");
  var entete = lines[0].split(";");
		 
		 for (var i = 1; i < lines.length; i++) {
			  var line = lines[i].split(";");
 if(!dossierDestination.hasAspect("drccf:increment")){
 
	 dossierDestination.addAspect("drccf:increment");
	 dossierDestination.properties["drccf:increment"] = 0;
	 dossierDestination.save();
	 
 }
 var i = dossierDestination.properties["drccf:increment"] + 1;
 
 var dossier = dossierDestination.createFolder("Dossier_Recouvrement-" + i);
	 dossierDestination.properties["drccf:increment"] = i;
	 dossierDestination.save();
 
	 copyStructure(template, dossier);
 var documentDest = dossier.childByNamePath("01-DOCUMENTDETREE");
 var signaler = document.parent.parent.childByNamePath("SIGNALE");
 
	 document.move(documentDest);
		 dossier.addAspect("drccf:agent");
		 dossier.addAspect("drccf:dossier");
		 
		 dossier.properties["drccf:agent"] = "";
		 dossier.properties["drccf:etat"] = "Incomplet";
 
		 dossier.properties["drccf:statusAmiable"] = "Non affecté";
		 dossier.properties["drccf:statusPrecontentieuse"] = "Non affecté";
		 dossier.properties["drccf:statusContentieuse"] = "Non affecté";
 
		 dossier.properties["drccf:phase"] = "Amiable";
		 dossier.properties["drccf:payee"] = false;
 
 
	 dossier.properties["drct:nom"] = line[0];
	 dossier.properties["drct:prenom"] = line[1];
	 dossier.properties["drct:telephone"] = line[2];
	 dossier.properties["drct:code"] = parseInt(line[3]);
	 dossier.properties["drct:adresse"] = line[4];
	 dossier.properties["drct:codepostale"] = parseInt(line[5]);
	 dossier.properties["drct:ville"] = line[6];
	 dossier.properties["drct:gouvernorat"] = line[7];
	 dossier.properties["drct:raisonSociale"] = line[8];
	 dossier.properties["drct:identifiant"] = parseInt(line[9]);
	 dossier.properties["drct:montantDeCreance"] = parseInt(line[10]);
	 dossier.properties["drct:interetDeRetard"] = parseInt(line[11]);
	 dossier.properties["drct:fraidDeDossier"] = parseInt(line[12]);
	 dossier.properties["drct:phase"] = line[13];
	 dossier.properties["drct:natureDeLaCreance"] = line[14];;
	 dossier.properties["drct:garant"] = line[15];
	 dossier.properties["drct:creances"] = line[16];
	 dossier.properties["drct:montantDeLaCreance"] = parseInt(line[17]);
	 dossier.properties["drct:nature"] = line[18];
	 dossier.properties["drct:date"] = new Date(line[19]);
	 dossier.properties["drct:dateDeVersement"] = new Date(line[20]);
	 dossier.properties["drct:montantDeVersement"] =  parseInt(line[21]);
	 dossier.properties["drct:modeDeReglement"] = line[22];
	 dossier.properties["drct:affectation"] = line[23];
	 dossier.properties["drct:type"] = line[24];
	 dossier.properties["drct:natureDeLHypothequeEnquetes"] = line[25];
	 dossier.properties["drct:Rang"] = line[26];
	 dossier.properties["drct:immatriculation"] = line[27];
	 dossier.properties["drct:dateFinDeLHypotheque"] = new Date(line[28]);
	 dossier.properties["drct:montantDeLHypotheque"] =parseInt(line[29]);
	 dossier.properties["drct:Valeure"] = parseInt(line[30]);
	 dossier.properties["drct:nomDeSaisine"] = line[31];
	 dossier.properties["drct:region"] = line[32];
	 dossier.properties["drct:typeDeTiers"] = line[33];
	 dossier.properties["drct:nomDeTiers"] = line[34];
	 dossier.properties["drct:natureDuFrais"] = line[35];
	 dossier.properties["drct:typeDuFrais"] = line[36];
	 dossier.properties["drct:tiers"] = line[37];
	 dossier.properties["drct:montantsDesFrais"] = parseInt(line[38]);
	 dossier.properties["drct:dateDEffetDesIr"] = new Date(line[39]);
	 dossier.properties["drct:agent"] = dossier.properties["drccf:agent"];
	 dossier.properties["drct:regionAvocat"] = line[40];
	 dossier.properties["drct:avocatAvocat"] = line[41];
	 dossier.properties["drct:regionHuissier"] = line[42];
	 dossier.properties["drct:avocatHuissier"] = line[43];
	 dossier.properties["drct:regionExpert"] = line[44];
	 dossier.properties["drct:avocatExpert"] = line[45];
	 dossier.properties["drct:cin"] = parseInt(line[46]);
	 dossier.save();
 
			 var wfparams = new Object();
			 wfparams["bpm:workflowDescription"] = "workflow de " + dossier.properties["drct:nom"];
			 wfparams["drc:nom"] = dossier.properties["drct:nom"];
			 wfparams["drc:prenom"] =dossier.properties["drct:prenom"];
			 wfparams["drc:telephone"] = dossier.properties["drct:telephone"];
			 wfparams["drc:code"] = dossier.properties["drct:code"];
			 wfparams["drc:cin"] = dossier.properties["drct:cin"];
			 wfparams["drc:adresse"] = dossier.properties["drct:adresse"];
			 wfparams["drc:codepostale"] = dossier.properties["drct:codepostale"];
			 wfparams["drc:ville"] = dossier.properties["drct:ville"];
			 wfparams["drc:gouvernorat"] = dossier.properties["drct:gouvernorat"];
			 wfparams["drc:raisonSociale"] = dossier.properties["drct:raisonSociale"];
			 wfparams["drc:identifiant"] = dossier.properties["drct:identifiant"];
			 wfparams["drc:montantDeCreance"] = dossier.properties["drct:montantDeCreance"];
			 wfparams["drc:interetDeRetard"] = dossier.properties["drct:interetDeRetard"];
			 wfparams["drc:fraidDeDossier"] = dossier.properties["drct:fraidDeDossier"];
			 wfparams["drc:phase"] =dossier.properties["drct:phase"];
			 
 
			 wfparams["bpm:comment"] = "c'est le dossier de Monsieur " + dossier.properties["drct:nom"];
 
 
			 var wfpackage = workflow.createPackage();
 
 
			 wfpackage.addNode(dossier);
			 wfdef.startWorkflow(wfpackage, wfparams);
			 
			 intparamsREC(dossier);
			 
			 if(!dossier.properties["drct:nom"]||
			   !dossier.properties["drct:prenom"]||
			   !dossier.properties["drct:telephone"]||
			   !wfparams["drc:code"]||
			   !wfparams["drc:cin"]||
			   !wfparams["drc:adresse"]||
			   !wfparams["drc:codepostale"]||
			   !wfparams["drc:ville"]||
			   !wfparams["drc:gouvernorat"]||
			   !wfparams["drc:raisonSociale"]||
			   !wfparams["drc:identifiant"]||
			   !wfparams["drc:montantDeCreance"]||
			   !wfparams["drc:interetDeRetard"]||
			   !wfparams["drc:fraidDeDossier"]||
			   !wfparams["drc:phase"])
				
	 {
		 
	   dossier.move(signaler);
	   dossier.properties["drccf:statusAmiable"] = "Signalé";
	   dossier.save();
			 
		 
	 }//#endif
 
		 }
 
 
 }
 
 main();