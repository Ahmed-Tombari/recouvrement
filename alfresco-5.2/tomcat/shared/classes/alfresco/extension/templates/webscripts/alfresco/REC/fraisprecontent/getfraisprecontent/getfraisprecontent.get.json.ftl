{
    "fraisprecontentieuse": [
        <#if fraisprecontent?size !=0>
        <#list fraisprecontent as fraispre>
    {
          "nomfrais": "${fraispre.nomfrais!''}",
          "naturefrais": "${fraispre.naturefrais!''}",
          "typefrais": "${fraispre.typefrais!''}",
          "tiers": "${fraispre.tiers!''}",
          "referencePvFacture": "${fraispre.referencePvFacture!''}",
        <#setting number_format="0" /> 
          "montants":"${fraispre.montants}",
          "HT": "${fraispre.HT!''}",
          "TVA": "${fraispre.TVA!''}",
          "debours": "${fraispre.debours!''}",<#setting number_format="" />
          <#if fraispre.datedeffdesir??>
          "datedeffdesir": "${fraispre.datedeffdesir!''}",
          <#else>
          "datedeffdesir": "${fraispre.datedeffdesir!''}",
          </#if>
          "statut": "${statut!''}"
    }
         <#if fraispre_has_next>,</#if>
        </#list>
        </#if>] 
}
