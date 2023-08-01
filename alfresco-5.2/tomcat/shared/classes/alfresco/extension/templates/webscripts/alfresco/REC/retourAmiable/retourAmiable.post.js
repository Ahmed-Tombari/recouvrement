var ctxt = org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var wsbean = ctxt.getBean('workflowServiceImpl', org.alfresco.repo.workflow.WorkflowServiceImpl);
var ws = ctxt.getBean('activitiProcessEngine', org.activiti.engine.impl.ProcessEngineImpl);

var nomDossier = args.nomDossier;

var results = search.query(
  {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/*' AND cm:name:'"+nomDossier+"'" ,
      sort: [{
              column: 'cm:name',
              ascending: true
          }]
  });

var instance = results[0].getActiveWorkflows()[0].getId();
var Canceled = wsbean.deleteWorkflow(instance);

function main() {
  var wfName = "PhaseAmiable";
  var wfdef = workflow.getDefinitionByName("activiti$"+wfName);

var wfparams = new Object();
wfparams["bpm:workflowDescription"] = "workflow de " + results[0].properties["drct:nom"];
wfparams["drc:nom"] = results[0].properties["drct:nom"];
wfparams["drc:prenom"] =results[0].properties["drct:prenom"];
wfparams["drc:telephone"] = results[0].properties["drct:telephone"];
wfparams["drc:code"] = results[0].properties["drct:code"];
wfparams["drc:cin"] = results[0].properties["drct:cin"];
wfparams["drc:adresse"] = results[0].properties["drct:adresse"];
wfparams["drc:codepostale"] = results[0].properties["drct:codepostale"];
wfparams["drc:ville"] = results[0].properties["drct:ville"];
wfparams["drc:gouvernorat"] = results[0].properties["drct:gouvernorat"];
wfparams["drc:raisonSociale"] = results[0].properties["drct:raisonSociale"];
wfparams["drc:identifiant"] = results[0].properties["drct:identifiant"];
wfparams["drc:montantDeCreance"] = results[0].properties["drct:montantDeCreance"];
wfparams["drc:interetDeRetard"] = results[0].properties["drct:interetDeRetard"];
wfparams["drc:fraidDeDossier"] = results[0].properties["drct:fraidDeDossier"];
wfparams["drc:phase"] ="Amiable";
wfparams["drc:agent"] = "";

wfparams["bpm:comment"] = "c'est le dossier de Monsieur " + results[0].properties["drct:nom"];

      var wfpackage = workflow.createPackage();
      wfpackage.addNode(results[0]);
			wfdef.startWorkflow(wfpackage, wfparams);
	
  results[0].properties["drccf:statusAmiable"] = "Non affect\u00e9";
	results[0].properties["drccf:statusPrecontentieuse"] = "Non affect\u00e9";
  results[0].properties["drccf:statusContentieuse"] = "Non affect\u00e9";
	results[0].properties["drccf:phase"] = "Amiable";
  results[0].properties["drccf:nombreAppel"] = 0;
  results[0].properties["drccf:nombreMessageDeRappel"] = 0;
  results[0].properties["drccf:statutNotificationAppel"] = "true";
  results[0].properties["drccf:statutNotificationMessage"] = "true";
  results[0].properties["drccf:nombreMessageDeRappel"] = 0;
  results[0].properties["drccf:nombreAppel"] = 0;
  results[0].properties["drccf:agent"] = "";
	results[0].properties["drccf:etat"] = "Incomplet";
	results[0].properties["drccf:payee"] = false;
  results[0].save();
	
}
main();

model.statut = "Succes retour vers Amiable";