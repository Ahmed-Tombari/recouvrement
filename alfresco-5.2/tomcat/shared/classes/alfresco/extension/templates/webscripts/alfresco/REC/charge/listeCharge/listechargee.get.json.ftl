{
"charges": [
<#if charges?size !=0>
    <#list charges as charge>
        {
        "id": "${charge.id!''}",
        "firstName": "${charge.firstName!''}",
        "lastName": "${charge.lastName!''}",
        "adresse": "${charge.adresse!''}",
        "telephone": "${charge.telephone!''}",
        "disponibilite": "${charge.disponibilite!''}",
        "dateDeLaProchaineDisponibilite": "${charge.dateDeLaProchaineDisponibilite!''}",
        "ville": "${charge.ville!''}",
        "gouvernorat": "${charge.gouvernorat!''}",
        "enabled": "${charge.enabled!''}",
        "motif": "${charge.motif!''}"
        }
        <#if charge_has_next>,</#if>
    </#list>
</#if>
]

}
