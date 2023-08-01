auth.runAsSystem();
var ctxt = org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var wsbean = ctxt.getBean('workflowServiceImpl', org.alfresco.repo.workflow.WorkflowServiceImpl);
var ws = ctxt.getBean('activitiProcessEngine', org.activiti.engine.impl.ProcessEngineImpl);
var template = companyhome.childrenByXPath("/app:company_home/app:dictionary/cm:Config/*")[0];
var csv = template;
var lines = csv.content.split("\n");
 
var notificationMessageAppel = "";
var nombrerelanceappel = "";

for (var i = 1; i < lines.length; i++) {
	var line = lines[i].split(";");
	if(line[0] == "com.addinn.recouvrement.notificationMessageAppel"){
		
		notificationMessageAppel = line[1];
		
		break;
	}
	
}

for (var i = 1; i < lines.length; i++) {
	var line = lines[i].split(";");
	if(line[0] == "nombre.relance.message"){
		
		nombrerelancemessage = line[1];
		
		break;
	}
	
}

var nomDossier = args.nomDossier;


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
var i = item.properties["drccf:nombreMessageDeRappel"];
var j = item.properties["drccf:nombreAppel"];

/*item.properties["drccf:statutNotificationMessage"] = false;
item.properties["drccf:statutNotificationAppel"] = false;
item.save();*/
var response;
var instanceWorkflow = item.getActiveWorkflows()[0].getId().replace("activiti$", "");

var result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
//var taskId = result.get(0).id;

var taskId = "";
if(notificationMessageAppel.indexOf("NotificationSerie") != -1){
    taskId = result.get(0).id;
}
else{
    if(i==0 && j==0){
        taskId = result.get(0).id;
        ws.getTaskService().setVariable(taskId, "drc_textsms", textsms);
        wsbean.endTask("activiti$"+taskId,"Next");
        result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
        item.properties["drccf:statusAmiable"] = "En cours";
        item.save();
    }
   
    item.properties["drccf:statutNotificationMessage"] = true;
    item.save();

    if(result.get(0).name == "Envoi message de rappel en parallele"){
       
        taskId = result.get(0).id;


    }else{

        taskId = result.get(1).id;
    }
    
}

var i = item.properties["drccf:nombreMessageDeRappel"] + 1;
item.properties["drccf:nombreMessageDeRappel"] = i;
item.save();

if(i >= nombrerelancemessage){
   

    //TO DO: Envoie SMS + Sauvgarde Trace (Message + Date)
    item.properties["drccf:statutNotificationMessage"] = false;
    item.save();
ws.getTaskService().setVariable(taskId, "drc_textsms", textsms);
wsbean.endTask("activiti$" + taskId, "Next");
result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();

 /* taskId = result.get(0).id;
  wsbean.endTask("activiti$"+taskId,"Next");
  result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
 */
    
}

response = {

    "statutMessage": item.properties["drccf:statutNotificationMessage"].toString(),
    "statutAppel": item.properties["drccf:statutNotificationAppel"].toString(),
    "nombreDeFois": item.properties["drccf:nombreMessageDeRappel"]

};


model.response = response;


