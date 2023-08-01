auth.runAsSystem();
var ctxt = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var wsbean = ctxt.getBean('workflowServiceImpl', org.alfresco.repo.workflow.WorkflowServiceImpl);
var ws = ctxt.getBean('activitiProcessEngine', org.activiti.engine.impl.ProcessEngineImpl);
var properties =  ctxt.getBean('global-properties', java.util.Properties);
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



var item = results[0];
var instanceWorkflow = item.getActiveWorkflows()[0].getId().replace("activiti$", "");
var result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
var taskId = result.get(0).id;
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
    wsbean.endTask("activiti$"+taskId,"Next");
    result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();



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
    wsbean.endTask("activiti$"+taskId,"Next");
    result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();

}


model.response = response;
