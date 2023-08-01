{
    "dossiers": [
        <#if fraisjudic?size !=0>
        <#list fraisjudic as fjdc>
   {
           "nomfrjdc" : "${fjdc.nomfrjdc!''}",
           "nom" : "${fjdc.nom!''}",
           "prenom" : "${fjdc.prenom!''}",
           "typedeTiers" : "${fjdc.typedeTiers!''}", 
           "facturation" : "${fjdc.facturation!''}",
           "paiment" : "${fjdc.paiment!''}",
           "typedeSaisine" : "${fjdc.typedeSaisine!''}",
           "statut" : "${statut!''}"
           
           
    }
         <#if fjdc_has_next>,</#if>
        </#list>
        </#if>] 
}

