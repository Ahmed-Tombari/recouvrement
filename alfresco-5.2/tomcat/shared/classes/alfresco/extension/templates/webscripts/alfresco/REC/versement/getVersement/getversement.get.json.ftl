{
    "Versement": [
        <#if Versement?size !=0>
        <#list Versement as vers>
        {    "nomVersement":"${vers.nomVersement!''}",
             "referenceVersement":"${vers.referenceVersement!''}",
             "dateVersement" : "${vers.dateVersement!''}",
             "montantVersement" : "<#setting number_format="0" />${vers.montantVersement}<#setting number_format="" />",
             "modeReglement" : "${vers.modeReglement!''}",
             "typeVersement":"${vers.typeVersement!''}",
             "affectaion" : "${vers.affectaion!''}",
             "telecharger" : "${vers.telecharger!''}",
             "nomdoc" : "${vers.nomdoc!''}",
             "statut":"${statut!''}"
        }
        <#if vers_has_next>,</#if>
        </#list>
        </#if>] 
   
}