<html>
   <head>
      <style type="text/css"><!--
      body
      {
         font-family: Arial, sans-serif;
         font-size: 14px;
         color: #4c4c4c;
      }
      
      a, a:visited
      {
         color: #0072cf;
      }
      --></style>
   </head>
   
   <body bgcolor="#dddddd">
      <table width="100%" cellpadding="20" cellspacing="0" border="0" bgcolor="#dddddd">
         <tr>
            <td width="100%" align="center">
               <table width="70%" cellpadding="0" cellspacing="0" bgcolor="white" style="background-color: white; border: 1px solid #aaaaaa;">
                  <tr>
                     <td width="100%">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                           <tr>
                              <td style="padding: 10px 30px 0px;">
                                 <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                       <td>
                                          <table cellpadding="0" cellspacing="0" border="0">
                                             <tr>
                                                <td>
                                                   <img src="${shareUrl}/res/components/images/task-64.png" alt="" width="64" height="64" border="0" style="padding-right: 20px;" />
                                                </td>
                                                <td>
                                                   <div style="font-size: 22px; padding-bottom: 4px;">
                                                         <#if (args.workflowDescription)??>                                             
                                                         <p>${args.workflowDescription?html}</p>                                             
                                                     </#if>
                                                   </div>
                                                   <div style="font-size: 13px;">
                                                      ${date?datetime?string.full}
                                                   </div>
                                                </td>
                                             </tr>
                                          </table>
                                          <div style="font-size: 14px; margin: 12px 0px 24px 0px; padding-top: 10px; border-top: 1px solid #aaaaaa;">
                                             <p>Bonjour,</p>

 

                                             <p>
                                                <#if args.workflowPooled == true>
                                                   La tâche partagée suivante peut être récupérée :
                                                <#else>
                                                   La tâche suivante vous a été assignée :
                                                </#if>
                                             </p>
                                             
                                             <p><b>"${args.workflowTitle?html}"</b></p>
                                              
                                              Tâche de recouvrement:
                                             <p><b> 
                                           
                                                <p>Cliquez sur ce lien pour modifier la tâche :</p>
                                                <p><a href="${shareUrl}/page/task-edit?taskId=${args.workflowId}">${shareUrl}/page/task-edit?taskId=${args.workflowId}</a>
                                             
                                             <p>Cordialement,<br />
                                              Recouvrement</p>
                                           </div>
                                       </td>
                                    </tr>
                    <tr>        
                    <td>    
                         <img src="${shareUrl}/res/themes/lightTheme/images/app-logo-48.png"  />
                    </td>
                   </tr>
                                 </table>
                              </td>
                           </tr>
                          
                        </table>
                     </td>
                  </tr>
               </table>
            </td>
         </tr>
      </table>
   </body>
</html>