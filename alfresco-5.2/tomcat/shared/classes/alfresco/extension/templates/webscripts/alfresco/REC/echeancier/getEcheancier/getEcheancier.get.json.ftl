{
    "Echeancier": [
        <#if Echeancier?size !=0>
        <#list Echeancier as ech>
        {    "nomEcheancier":"${ech.nomEcheancier!''}",
             "periodicite" : "${ech.periodicite!''}",
             "montant" : "<#setting number_format="0" />${ech.montant!''}<#setting number_format="" />",
             "datePremiereEcheancier" : "${ech.datePremiereEcheancier!''}",
             "statut":"${statut!''}"
        }
        <#if ech_has_next>,</#if>
        </#list>
        </#if>] 
   
}