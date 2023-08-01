{
    "tiers": [
        <#if tiers?size !=0>
        <#list tiers as tier>
        {
            "nom" : "${tier.nom!''}",
            "prenom" : "${tier.prenom!''}",
            "adresse" : "${tier.adresse!''}",
            "telephone" : "<#setting number_format="0" />${tier.telephone}<#setting number_format="" />",
            "numeroFax" : "<#setting number_format="0" />${tier.numeroFax}<#setting number_format="" />",
            "numeroFix" : "<#setting number_format="0" />${tier.numeroFix}<#setting number_format="" />", 
            "cin" : "<#setting number_format="0" />${tier.cin}<#setting number_format="" />", 
            "type" : "${tier.tierType!''}",
            "tiersemail" : "${tier.email!''}",
            "codePostale" : "<#setting number_format="0" />${tier.codePostale}<#setting number_format="" />",
            "gouvernorat" : "${tier.gouvernorat!''}",
            "ville" : "${tier.ville!''}",
            "statut": "${statut}"
        }
        <#if tier_has_next>,</#if>
        </#list>
        </#if>
    ] 
   
}