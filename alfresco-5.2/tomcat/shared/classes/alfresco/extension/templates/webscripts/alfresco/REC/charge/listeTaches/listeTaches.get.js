var ctxt = org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var wsbean = ctxt.getBean('workflowServiceImpl', org.alfresco.repo.workflow.WorkflowServiceImpl);
var ws = ctxt.getBean('activitiProcessEngine', org.activiti.engine.impl.ProcessEngineImpl);
var nomAgent = args.nomAgent;
var results = null;
var dossiers = [];

results = search.query(
	{
		language: "fts-alfresco",
		query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/*' AND cm:name:'Dossier_Recouvrement-*' AND drccf:agent:'"+nomAgent+"'",
		sort: [{
			column: 'cm:name',
			ascending: true
		}]
	});
	
var taskName;


for each(var result in results) {
	if(result.properties["drccf:agent"] != ''){

		if(result.getActiveWorkflows() != ''){

			var instanceWorkflow = result.getActiveWorkflows()[0].getId().replace("activiti$", "");
			taskName = ws.getTaskService().createTaskQuery().processInstanceId(instanceWorkflow).orderByTaskId().asc().list().get(0).name;

		}
		else
		{
			taskName = "aucune tâche à faire";

		}


		dossiers.push({
			"nomDossier":result.properties["cm:name"],
			"nom":result.properties["drct:nom"],
			"prenom":result.properties["drct:prenom"],
			"montant":result.properties["drct:montantDeCreance"],
			"phase":result.properties["drccf:phase"],
			"agent":result.properties["drccf:agent"],
			"tacheAFaire":taskName

		});

	}}

model.dossiers = dossiers;
