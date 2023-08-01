{
    "creance": [
        <#if creance?size !=0>
        <#list creance as crean>
    {
         "nomdossiercrean" : "${crean.nomdossiercrean!''}",
         "nomcreance" : "${crean.nomcreance!''}",
         "montant" : "<#setting number_format="0" />${crean.montant}<#setting number_format="" />",
         "nature" : "${crean.nature!''}",
         "datedeffdesir" : "${crean.datedeffdesir?string("dd/mm/yyyy")!''}",
         "statut" : "${statut!''}"

    }
         <#if crean_has_next>,</#if>
        </#list>
        </#if>]
}

