{
    "phaseAmiable": [
        <#if dossiersname?size !=0>
        <#list dossiersname as dossier>{
          "nomDossier": "${dossier.nomDossier!''}",
          "phase": "${dossier.phase!''}",
          "nom": "${dossier.nom!''}",
          "prenom": "${dossier.prenom!''}",
          "telephone": "${dossier.telephone}",
          "cin": "${dossier.cin}",
          "adresse": "${dossier.adresse!''}",
          "codepostale": "${dossier.codepostale}",
          "ville": "${dossier.ville!''}",
          "gouvernorat": "${dossier.gouvernorat!''}",
          "pays": "${dossier.pays!''}",
          "raisonSociale": "${dossier.raisonSociale!''}",
          "identifiant": "${dossier.identifiant}",
          "montantDeCreance": "${dossier.montantDeCreance}",
          "interetDeRetard": "${dossier.interetDeRetard}",
          "fraisDeDossier": "${dossier.fraisDeDossier}",
          "statusAmiable": "${dossier.statusAmiable!''}",
          "statusContentieuse": "${dossier.statusContentieuse!''}",
          "statusPrecontentieuse": "${dossier.statusPrecontentieuse!''}",
            "statutMessage":"${dossier.statutMessage!''}",
            "statutAppel":"${dossier.statutAppel!''}",
            "typeRelance":"${dossier.typeRelance!''}",
            "nombreMessageDeRappel":"${dossier.nombreMessageDeRappel!''}",
            "nombreAppel":"${dossier.nombreAppel!''}",
            "statut":"${dossier.statut!''}"
            
        }
   
        <#if dossier_has_next>,</#if>
        </#list>
        </#if>],


      "echeancier":[ 
        <#if echeancier?size !=0>
        <#list echeancier as ech>
        {
             "nomEcheancier":"${ech.nomEcheancier!''}",
             "periodicite" : "${ech.periodicite!''}",
             "montant" : "${ech.montant!''}",
             "datePremiereEcheancier" : "${ech.datePremiereEcheancier}"
        }
        
        <#if ech_has_next>,</#if>
        </#list>
        </#if>],
      
     "phaseprecontentieuse":[ 
       <#if dossiersname?size !=0>
        <#list dossiersname as dossier>

        {
          "natureDeLaCreance": "${dossier.natureDeLaCreance!''}",
          "garant": "${dossier.garant!''}"
        }
         <#if dossier_has_next>,</#if>
        </#list>
        </#if>],
 
      "creance":[
        <#if creance?size !=0>
        <#list creance as crean>
        { 
          "creances": "${crean.nomdossiercrean!''}",
          "nomcreance":"${crean.nomcreance!''}",
          "montant": "${crean.montant!''}",
          "nature": "${crean.nature!''}",
          "datedeffdesir": "${crean.datedeffdesir!''}"
        }
        <#if crean_has_next>,</#if>
        </#list>
        </#if>],


      "versement":[
      { 
        <#if versement?size !=0>
        <#list versement as vers>
          "nomVersement": "${vers.nomVersement!''}",
          "dateVersement": "${vers.dateVersement!''}",
          "montantVersement": "${vers.montantVersement!''}",
          "modeReglement": "${vers.modeReglement!''}",
          "affectaion": "${vers.affectaion!''}"
          
         <#if vers_has_next>,</#if>
        </#list>
        </#if>
      }],

      "fraisprecontent":[ 
      {
       <#if fraispercont?size !=0>
        <#list fraispercont as fraisprec>
          "fraisprecont": "${fraisprec.fraisprecont!''}",
          "naturefrais": "${fraisprec.naturefrais!''}",
          "typefrais": "${fraisprec.typefrais!''}",
          "dossiers": "${fraisprec.dossiers!''}",
          "montant": "${fraisprec.montant!''}",
          "datedeffdesir": "${fraisprec.datedeffdesir!''}"
          <#if fraisprec_has_next>,</#if>
        </#list>
        </#if>
      }],
      "garantie": [
      { 
       <#if garantie?size !=0>
        <#list garantie as garant>
          "nomgarantie": "${garant.nomgarantie!''}",
          "typeGar": "${garant.typeGar!''}",
          "natureHypotheque": "${garant.natureHypotheque!''}",
          "Rang": "${garant.Rang!''}",
          "immatriculation": "${garant.immatriculation!''}",
          "dateFinDeLHypotheque": "${garant.dateFinDeLHypotheque!''}",
          "montantDeLHypotheque": "${garant.montantDeLHypotheque!''}",
          "valeurEstimee": "${garant.valeurestimee!''}",
          "hypthequebanques": "${garant.hypothequebanque!''}",
          "beneficiairehypotheque": "${garant.beneficiairehypotheque!''}"
          <#if garant_has_next>,</#if>
        </#list>
        </#if>
      }],

      "saisine": [
         <#if saisine?size !=0>
        <#list saisine as sais>
      { 
           "nom" : "${sais.nom!''}",
           "nomsaisine" : "${sais.nomsaisine!''}",
           "region" : "${sais.region!''}",
           "typeDedossiers" : "${sais.typeDedossiers!''}", 
           "nomDedossiers" : "${sais.nomDedossiers!''}",
           "piecejointe" : "${sais.piecejointe!''}"
      }
        <#if sais_has_next>,</#if>
        </#list>
        </#if>],
    
      "phasejudiciare": [
       <#if fraisjudic?size !=0>
        <#list fraisjudic as friasjud>
      {
           "nomfraisjdc" : "${friasjud.nomfraisjdc!''}",
           "nom" : "${friasjud.nom!''}",
           "prenom" : "${friasjud.prenom!''}",
           "typededossiers" : "${friasjud.typededossiers!''}", 
           "facturation" : "${friasjud.facturation!''}",
           "paiment" : "${friasjud.paiment!''}",
           "typedeSaisine" : "${friasjud.typedeSaisine!''}"
      }
          <#if friasjud_has_next>,</#if>
        </#list>
        </#if>]
}
