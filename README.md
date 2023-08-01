# Alfresco AIO Project - SDK 4.0

This is an All-In-One (AIO) project for Alfresco SDK 4.0.

Run with `./run.sh build_start` or `./run.bat build_start` and verify that it

* Runs Alfresco Content Service (ACS)
* Runs Alfresco Share
* Runs Alfresco Search Service (ASS)
* Runs PostgreSQL database
* Deploys the JAR assembled modules

CREATION DU SITE DE RECOUVREMENT :

* chemin : PROJECT_HOME/utils/recouvrement


CREATION DE REGLE DE GESTION :
1- Ajouter le script 'Recouvrement_script.js' qui se trouve sous PROJECT_HOME/utils/scripts dans share sous Entrepot/data dictionary/scripts.


2- Création du plan de classement et démarrage du workflow :
* Description:
  Actif: Oui
  Exécuter en tâche de fond: Non
  Règle appliquée aux sous-dossiers: Non
* Quand:
  Des éléments sont créés ou entrent dans ce dossier
  Si tous les critères sont remplis :
  Est de type (ou de sous-type) 'dossier'
  Exécuter une action :
  Exécuter le script 'Recouvrement_script.js'

  CREATION DU PLAN DE CLASSEMENT DE DOSSIER :
* PROJECT_HOME/utils/plan_de_classement/DOSSIERRECOUVREMENT (A créer sous repository/datadictionary/space_template)



CRUD CHARGE:

1- Ajouter le script 'REG_CHARGE.js' qui se trouve sous PROJECT_HOME/utils/scripts dans share sous Entrepot/data dictionary/scripts.


2-CREATION DU REGLE DE GESTION DE CHARGE :

chemin : Entrepot/user Homes (veuillez créer la règle de gestion sur le dossier User Homes)

* Description:
  Actif: Oui
  Exécuter en tâche de fond: Non
  Règle appliquée aux sous-dossiers: Non
* Quand:
  Des éléments sont créés ou entrent dans ce dossier
  Si tous les critères sont remplis :
  Est de type (ou de sous-type) 'dossier'
  Exécuter une action :
  Exécuter le script 'REG_CHARGE.js' (vous le trouverez sous utils/scripts)
