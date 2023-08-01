{
    "fullName":"${fullName}",
    "email":"${email}",
    "Groups": [
       <#if results?size !=0>
        <#list results as result>
        
           "${result.properties["cm:authorityName"]!''}"
        
          <#if result_has_next>,</#if>
        </#list>
        </#if>]
}

