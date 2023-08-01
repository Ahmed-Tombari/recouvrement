{
    "dossiers": [
        <#if dossiers?size !=0>
        <#list dossiers as dossier>
        {
          "nomDossier": "${dossier.nomDossier!''}",
          "nom": "${dossier.nom!''}",
          "prenom": "${dossier.prenom!''}",
          "adresse": "${dossier.adresse!''}",
          "telephone": "${dossier.telephone}",
          "cin": "${dossier.cin}",
          "gouvernorat": "${dossier.gouvernorat}",
          "etat": "${dossier.etat!''}",
          "statusAmiable": "${dossier.statusAmiable!''}",
          "statusContentieuse": "${dossier.statusContentieuse!''}",
          "statusPrecontentieuse": "${dossier.statusPrecontentieuse!''}",
          "date": "${dossier.date!''}",
          "phase": "${dossier.phase!''}",
          "created": "${dossier.created!''}",
          "modified": "${dossier.modified!''}",
          "agent": "${dossier.agent!''}",
          "montant": "<#setting number_format="0" />${dossier.montant}<#setting number_format="" />",
          "typeRelance": "${dossier.typeRelance!''}",
          "nombreMessageDeRappel":"${dossier.nombreMessageDeRappel!''}",
          "nombreAppel":"${dossier.nombreAppel!''}",
          "statut": "${statut!''}"
        }
        <#if dossier_has_next>,</#if>
        </#list>
        </#if>]
}

