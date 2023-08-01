auth.runAsSystem();
var ctxt = org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var wsbean = ctxt.getBean('workflowServiceImpl', org.alfresco.repo.workflow.WorkflowServiceImpl);
var ws = ctxt.getBean('activitiProcessEngine', org.activiti.engine.impl.ProcessEngineImpl);

var site = siteService.getSite("recouvrement");
var action = json.get("action") + "";
var agent = json.get("agent") + "";
var dossiers = [];
var nomDossier = args.nomDossier;
if(nomDossier){
	dossiers[0] = nomDossier;
}
else if(json.get("dossiers") + ""){
	dossiers=new Array();
	dossiersAgent = json.get("dossiers") + "";
	dossiers = JSON.parse(dossiersAgent);
}
for (i = 0; i < dossiers.length; i++) {

	var nomDossier = dossiers[i];

var results = search.query(
  {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/*' AND cm:name:'"+nomDossier+"'" ,
      sort: [{
              column: 'cm:name',
              ascending: true
          }]
  });
//site.setMembership(agent, "SiteCollaborator");
var instanceWorkflow = results[0].getActiveWorkflows()[0].getId().replace("activiti$", "");
results[0].addAspect("drccf:parametrageNotification");
results[0].properties["drccf:nombreMessageDeRappel"] = 0;
results[0].properties["drccf:nombreAppel"] = 0;
results[0].save();


var result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
var taskId = result.get(0).id;

var message;

if(action == "signaler"){
	
	wsbean.endTask("activiti$"+taskId,"Next");
	result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
	taskId = result.get(0).id;
	wsbean.endTask("activiti$"+taskId,"Next");
	message = "Dossier signaler avec succée";

}

else{
	
if(action == "affecter"){
	
	ws.getTaskService().setVariable(taskId,"drc_verifierdossierOutcome","complet");
	wsbean.endTask("activiti$"+taskId,"Next");
	result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
	taskId = result.get(0).id;
	ws.getTaskService().setVariable(taskId,"drc_agent",agent);
	wsbean.endTask("activiti$"+taskId,"Next");
	result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
	message = "Dossier affecté avec succée";
   
    }
  }
}

model.message = message;





