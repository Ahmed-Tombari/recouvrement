{
    "garantie": [
       <#if garantie?size !=0>
        <#list garantie as garant>
        {
          "typeGar": "${garant.typeGar!''}",
          "natureHypotheque": "${garant.natureHypotheque!''}",
          "rang": "${garant.rang!''}",
          "immatriculation": "${garant.immatriculation!''}",
          "dateFinDeLHypotheque": "${garant.dateFinDeLHypotheque?string("dd/mm/yyyy")!''}",
          "montantDeLHypotheque": "<#setting number_format="0" />${garant.montantDeLHypotheque}<#setting number_format="" />",
          "valeurEstimee": "${garant.valeurestimee!''}",
          "hypthequebanques": "${garant.hypothequebanque!''}",
          "beneficiairehypotheque": "${garant.beneficiairehypotheque!''}"
        }
          <#if garant_has_next>,</#if>
        </#list>
        </#if>]
}

