{
"dossiers": [
<#if dossiers?size !=0>
    <#list dossiers as dossier>
        {
        "nomDossier": "${dossier.nomDossier!''}",
        "nom": "${dossier.nom!''}",
        "prenom": "${dossier.prenom!''}",
        "montant": "<#setting number_format="0" />${dossier.montant!''}<#setting number_format="" />",
        "phase": "${dossier.phase!''}",
        "agent": "${dossier.agent!''}",
        "tache": "${dossier.tacheAFaire!''}"
        }
        <#if dossier_has_next>,</#if>
    </#list>
</#if>]
}
