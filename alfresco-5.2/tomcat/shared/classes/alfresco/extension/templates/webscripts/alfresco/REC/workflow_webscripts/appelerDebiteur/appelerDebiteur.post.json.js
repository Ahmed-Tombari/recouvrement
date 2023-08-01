auth.runAsSystem();
var ctxt = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var wsbean = ctxt.getBean('workflowServiceImpl', org.alfresco.repo.workflow.WorkflowServiceImpl);
var ws = ctxt.getBean('activitiProcessEngine', org.activiti.engine.impl.ProcessEngineImpl);
var properties =  ctxt.getBean('global-properties', java.util.Properties);
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
	if(line[0] == "nombre.relance.appel"){
		
		nombrerelanceappel = line[1];
		
		break;
	}
	
}

var nomDossier = args.nomDossier;
var commentaire = json.get("commentaire") + "";

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
var j = item.properties["drccf:nombreMessageDeRappel"];
var i = item.properties["drccf:nombreAppel"];

var taskId = "";
if(notificationMessageAppel.indexOf("NotificationSerie") != -1){
    taskId = result.get(0).id;
}
else{

     item.properties["drccf:statutNotificationAppel"] = true;
     item.save();

    if(i==0 && j==0){
        taskId = result.get(0).id;
        ws.getTaskService().setVariable(taskId,"drc_commentaireagent",commentaire);
        wsbean.endTask("activiti$"+taskId,"Next");
        result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list();
        item.properties["drccf:statusAmiable"] = "En cours";
        item.save();
    }
   
    if(result.get(0).name == "Appeler le debiteur en parallele"){
       
        taskId = result.get(0).id;

    }else{

        taskId = result.get(1).id; 
    }
    
}

/*item.properties["drccf:statutNotificationMessage"] = false;
item.properties["drccf:statutNotificationAppel"] = true;
item.save();*/


var response;

if(i < nombrerelanceappel){

    i = item.properties["drccf:nombreAppel"] + 1;
    item.properties["drccf:nombreAppel"] = i;
    item.save();
   

    if(i==1 && notificationMessageAppel.indexOf("NotificationSerie") != -1){
        ws.getTaskService().setVariable(taskId,"drc_commentaireagent",commentaire);
        wsbean.endTask("activiti$"+taskId,"Next");
        result = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list()
    }
    if(i>=nombrerelanceappel)
    {
        if(notificationMessageAppel.indexOf("NotificationParallele") != -1){
           
            item.properties["drccf:statutNotificationAppel"] = false;
            item.save();

        }else{
            
            item.properties["drccf:statutNotificationMessage"] = true;
            item.properties["drccf:statutNotificationAppel"] = false;
            item.save();
        }
        
      
        ws.getTaskService().setVariable(taskId,"drc_commentaireagent",commentaire);
        wsbean.endTask("activiti$"+taskId,"Next");
    }

  }

  response = {
    
    "statutMessage": item.properties["drccf:statutNotificationMessage"].toString(),
    "statutAppel": item.properties["drccf:statutNotificationAppel"].toString(),
    "nombreDeFois": item.properties["drccf:nombreAppel"]

};

model.response = response;