{
    "saisine": [
        <#if saisine?size !=0>
        <#list saisine as sais>
    {
           "nom" : "${sais.nom!''}",
           "nomsaisine" : "${sais.nomsaisine!''}",
           "region" : "${sais.region!''}",
           "typeDeTiers" : "${sais.typeDeTiers!''}", 
           "nomDeTiers" : "${sais.nomDeTiers!''}",
           "piecejointe" : "${sais.piecejointe!''}",
           "statut" : "${statut!''}"
    }
         <#if sais_has_next>,</#if>
        </#list>
        </#if>] 
}

