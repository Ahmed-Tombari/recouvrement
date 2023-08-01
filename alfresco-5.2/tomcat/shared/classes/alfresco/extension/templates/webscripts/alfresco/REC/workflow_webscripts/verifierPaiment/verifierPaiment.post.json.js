auth.runAsSystem();
var ctxt = org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var wsbean = ctxt.getBean('workflowServiceImpl', org.alfresco.repo.workflow.WorkflowServiceImpl);
var ws = ctxt.getBean('activitiProcessEngine', org.activiti.engine.impl.ProcessEngineImpl);

var nomDossier = args.nomDossier;
var action = json.get("action") + "";

var results = search.query(
  {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/*' AND cm:name:'"+nomDossier+"'" ,
      sort: [{
              column: 'cm:name',
              ascending: true
          }]
  });

var instanceWorkflow = results[0].getActiveWorkflows()[0].getId().replace("activiti$", "");
var result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
var taskId = result.get(0).id;
var message;

if(action == "Non Paye"){
	
	ws.getTaskService().setVariable(taskId,"drc_verifierpaiementOutcome","Non Paye");
	wsbean.endTask("activiti$"+taskId,"Next");
	result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
	message = "Dossier non Paye";
}

else{

if(action == "Paye"){
	
	ws.getTaskService().setVariable(taskId,"drc_verifierpaiementOutcome","Paye");
	wsbean.endTask("activiti$"+taskId,"Next");
  result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
	taskId = result.get(0).id;
  wsbean.endTask("activiti$"+taskId,"Next");
  result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
  message = "Dossier Paye";	
}

}

model.message = message;





