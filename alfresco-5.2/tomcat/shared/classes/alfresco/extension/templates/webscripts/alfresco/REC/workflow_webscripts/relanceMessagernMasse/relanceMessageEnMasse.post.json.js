auth.runAsSystem();

var ctxt = org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var wsbean = ctxt.getBean('workflowServiceImpl', org.alfresco.repo.workflow.WorkflowServiceImpl);
var ws = ctxt.getBean('activitiProcessEngine', org.activiti.engine.impl.ProcessEngineImpl);

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
var dossiers=new Array();
var dossiersSTR = json.get("dossiers") + "";
 dossiers = JSON.parse(dossiersSTR);



for (i = 0; i < dossiers.length; i++) {

var nomDossier = dossiers[i];


var textsms = json.get("textsms") + "";


var results = search.query(
    {
        language: "fts-alfresco",
        query: "PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/*' AND cm:name:'" + nomDossier + "'",
        sort: [{
            column: 'cm:name',
            ascending: true
        }]
    });
var item = results[0];
var response;

var instanceWorkflow = item.getActiveWorkflows()[0].getId().replace("activiti$", "");
var result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
var taskId = "";

taskId = result.get(0).id;
var taskName =  result.get(0).name;

if(taskName=="Reception dossier"){
  ws.getTaskService().setVariable(taskId,"drc_commentaireagent","commentaire");
  wsbean.endTask("activiti$"+taskId,"Next");
  result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
  taskName =  result.get(0).name;
  
}

if(notificationMessageAppel.indexOf("NotificationParallele") != -1){
  if(result.get(0).name == "Envoi message de rappel en parallele"){
       
    taskId = result.get(0).id;

  }else{

      taskId = result.get(1).id;
  }
  
}else{
    taskId = result.get(0).id;
}

 taskName =  result.get(0).name;

if(notificationMessageAppel.indexOf("NotificationSerie") != -1 && taskName=="Appeler le debiteur en serie"){
  ws.getTaskService().setVariable(taskId,"drc_commentaireagent","commentaire");
  wsbean.endTask("activiti$"+taskId,"Next");
  result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list()
  taskId = result.get(0).id;
	wsbean.endTask("activiti$"+taskId,"Next");
}




  item.properties["drccf:statutNotificationMessage"] = false;
  item.properties["drccf:statutNotificationAppel"] = false;
  item.save();

taskId = result.get(0).id;
	
ws.getTaskService().setVariable(taskId, "drc_textsms", textsms);
wsbean.endTask("activiti$" + taskId, "Next");
result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
	taskId = result.get(0).id;
	wsbean.endTask("activiti$"+taskId,"Next");
response = {

  "statutMessage": item.properties["drccf:statutNotificationMessage"].toString(),
  "statutAppel": item.properties["drccf:statutNotificationAppel"].toString()

};

  /*taskId = result.get(0).id;
  wsbean.endTask("activiti$"+taskId,"Next");
  result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
 */
}

model.response = response;



