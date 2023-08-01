var FTL_EMAIL_WF_NOTIFICATION = "/app:company_home/app:dictionary/app:email_templates/cm:recouvrement/cm:recouvrement_x0020_notification_fr.html.ftl";
var FTL_EMAIL_WF_REMINDER = "/app:company_home/app:dictionary/app:email_templates/cm:TAPM/cm:reminder_x0020_TAPM_fr.html.ftl";
var FTL_EMAIL_WF_TACHE = "/app:company_home/app:dictionary/app:email_templates/cm:recouvrement/cm:taches_x0020_recouvrement_fr.html.ftl";

var EMAIL_FROM = "bot@addinn-group.com";

var SUBJECT_DOSSIER_REMINDER = "[CIMA PROCESS DEMANDE DEROGATION] Rappel pour la validation";
var SUBJECT_DOSSIER_RECU = "[CIMA PROCESS DEMANDE DEROGATION] DOSSIER EN COURS";
var SUBJECT_DOCUMENT_RECU = "[CIMA PROCESS DEMANDE DEROGATION] R&eacute;ponse pour votre demande de d&eacute;rogation";
var SUBJECT_DOSSIER_A_VALIDER = "[CIMA PROCESS DEMANDE DEROGATION] Demande de validation du dossier de traitement d'achat PM";

/**
 * send email.
 * 
 * @param 'to' is the email user or the group name.
 * @param subject
 * @param FTL_EMAIL
 * @param action argument 'action' in the EMAIL template.
 * @param toMany boolean, true if send to group.
 * @param args array of other arguments.
 */
function sendMail(to, subject, FTL_EMAIL, toMany) {


	logger.system.out("SEND EMAIL Task name :"+ task.name);


	logger.system.out("EMAIL TO :"+ to);
	logger.system.out("EMAIL subject :"+ subject);
	logger.system.out("EMAIL FTL_EMAIL :"+ FTL_EMAIL);
	logger.system.out("EMAIL toMany :"+ toMany);

	var dossierIT = getDocument();
	logger.system.out("dossierIT: "+dossierIT);

	var siteShortName = dossierIT.getSiteShortName();

	var mail = actions.create("mail");

	if(toMany)
	{
		mail.parameters.to_many = to;
		 var nodeGroupe = people.getGroup(to);
            var members = people.getMembers(nodeGroupe, false);
            for each(var member in members) {
                logger.system.out("EMAIL TO member :"+ member.properties["cm:email"]);
            }

	}
	else
	{
		mail.parameters.to = to;
	}

	mail.parameters.subject = subject;
	mail.parameters.from = EMAIL_FROM;
	//mail.parameters.text = "Test";
	mail.parameters.ignore_send_failure = true;
	mail.parameters.template = companyhome.childrenByXPath(FTL_EMAIL)[0];

	var templateArgs = new Array();
	templateArgs['workflowTitle'] = task.name;
	templateArgs['workflowPooled'] = toMany; // true;
	templateArgs['workflowDescription'] = task.description;
	templateArgs['workflowId'] = "activiti$" + task.id;
	templateArgs['numeroDossier'] = dossierIT.name;
	templateArgs['workflowInstanceId'] =execution.getVariable("workflowinstanceid");
	templateArgs['siteShortName'] = siteShortName;

	bpm_package.setScope(workflow.getScope());
//	templateArgs['workflowDocuments'] = bpm_package.childAssocs["bpm:packageContains"];


	var templateModel = new Array();
	templateModel['args'] = templateArgs;
	mail.parameters.template_model = templateModel;
	mail.executeAsynchronously(dossierIT);

	logger.system.out("SEND EMAIL END" );
}





/**
 * send email NOTIFICATION.
 *
 * @param 'to' is the email user or the group name.
 * @param subject
 * @param FTL_EMAIL
 * @param action argument 'action' in the EMAIL template.
 * @param toMany boolean, true if send to group.
 * @param args array of other arguments.
 */
function sendNotification(to, subject, FTL_EMAIL, toMany,dossierIT, message) {


	logger.system.out("SEND EMAIL NOTIFICATION :");


	logger.system.out("EMAIL TO :"+ to);
	logger.system.out("EMAIL subject :"+ subject);
	logger.system.out("EMAIL FTL_EMAIL :"+ FTL_EMAIL);
	logger.system.out("EMAIL toMany :"+ toMany);
	logger.system.out("dossierIT: "+dossierIT);

	var siteShortName = dossierIT.getSiteShortName();

	var mail = actions.create("mail");

	if(toMany)
	{
		mail.parameters.to_many = to;
		var nodeGroupe = people.getGroup(to);
		var members = people.getMembers(nodeGroupe, false);
		for each(var member in members) {
		logger.system.out("EMAIL TO member :"+ member.properties["cm:email"]);
	}

	}
	else
	{
		mail.parameters.to = to;
	}

	mail.parameters.subject = subject;
	mail.parameters.from = EMAIL_FROM;
	//mail.parameters.text = "Test";
	mail.parameters.ignore_send_failure = true;
	mail.parameters.template = companyhome.childrenByXPath(FTL_EMAIL)[0];

	var templateArgs = new Array();
	templateArgs['message'] = message;
	templateArgs['numeroDossier'] =dossierIT.name;
	templateArgs['siteShortName'] = siteShortName;


//	templateArgs['workflowDocuments'] = bpm_package.childAssocs["bpm:packageContains"];


	var templateModel = new Array();
	templateModel['args'] = templateArgs;
	mail.parameters.template_model = templateModel;
	mail.executeAsynchronously(dossierIT);

	logger.system.out("SEND EMAIL END" );
}

	function getDocument() {
		if (bpm_package != null) {
			for (var i = 0; i < bpm_package.children.length; i++) {
				return dossierIT = bpm_package.children[i];
			}   
		}    
	}
