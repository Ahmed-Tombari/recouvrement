<#if form.mode == "edit" >

<script type="text/javascript">//<![CDATA[
   /**
    *
    *
    * Extend Module of Alfresco.ActivitiTransitions
    * @returns
    */
   (function()
   {
      /**
       * YUI Library aliases
       */
      var Dom = YAHOO.util.Dom,
              Event = YAHOO.util.Event;

      /**
       * Alfresco Slingshot aliases
       */
      var $html = Alfresco.util.encodeHTML;

      /**
       * CustomActivitiTransitions constructor.
       *
       * @param {String} htmlId The HTML id of the parent element
       * @return {Alfresco.CustomActivitiTransitions} The new CustomActivitiTransitions instance
       * @constructor
       */
      Alfresco.CustomActivitiTransitions = function(htmlId)
      {
         Alfresco.CustomActivitiTransitions.superclass.constructor.call(this, htmlId);

         // Re-register with our own name
         this.name = "Alfresco.CustomActivitiTransitions";
         Alfresco.util.ComponentManager.reregister(this);

         return this;
      };
      YAHOO.extend(Alfresco.CustomActivitiTransitions, Alfresco.ActivitiTransitions,
              {


                 /**
                  * Object container for initialization options
                  *
                  * @property options
                  * @type object
                  */
                 options:
                         {
                            /**
                             * The current value, it's a list of comma separated
                             * transitions in the format transition_id|label
                             *
                             * @property currentValue
                             * @type string
                             */
                            currentValue: "",

                            /**
                             * The name of the hidden input field to use to submit the
                             * selected transition.
                             *
                             * @property inputFieldName
                             * @type string
                             */
                            hiddenFieldName: "",

                            /**
                             * List of transition objects representing
                             * the transitions for the task.
                             *
                             * @property transitions
                             * @type array
                             */
                            transitions: null,

                            confirm:null
                         },



                 /**
                  * Event handler called when a transition button is clicked.
                  *
                  * @method onClick
                  * @param e {object} DomEvent
                  * @param p_obj {object} Object passed back from addListener method
                  */
                 onClick: function ActivitiTransitions_onClick(e, p_obj)
                 {


                    // determine what button was pressed by it's id
                    var buttonId = p_obj.get("id");
                    var transitionId = buttonId.substring(this.id.length+1);

                    /**
                     * En cas de validation, on doit vérifier les champs obligatoire:
                     * 	 - "Agent" pour la tâche de "Vérification du dossier IT"
                     *   - "Arrete" pour la tâche "Rédaction d'arrêté"
                     */
                    if(transitionId == "Valider" )
                    {
                       if( YAHOO.util.Dom.get('page_x002e_data-form_x002e_task-edit_x0023_default_assoc_wfit_agent-cntrl-currentValueDisplay') != null
                               && Object.keys(YAHOO.util.Dom.getChildren('page_x002e_data-form_x002e_task-edit_x0023_default_assoc_wfit_agent-cntrl-currentValueDisplay')).length == 0){

                          console.log(" transitionId =  "+YAHOO.util.Dom.get('page_x002e_data-form_x002e_task-edit_x0023_default_assoc_wfit_arreteDoc-cntrl-currentValueDisplay'));
                          Alfresco.util.PopupManager.displayMessage({
                             text: Alfresco.util.message("error.noAgent", this.name),
                             displayTime: 4

                          });
                          return;

                       }else
                       if( YAHOO.util.Dom.get('page_x002e_data-form_x002e_task-edit_x0023_default_assoc_wfit_arreteDoc-cntrl-currentValueDisplay') != null
                               && YAHOO.util.Dom.get('page_x002e_data-form_x002e_task-edit_x0023_default_assoc_wfit_arreteDoc').value == 0){



                          Alfresco.util.PopupManager.displayMessage({
                             text: Alfresco.util.message("error.noDocArrete", this.name),
                             displayTime: 4


                          });

                          return;

                       }

                    }

                    if(transitionId == "Envoyer pour vérification" ){

                       if( YAHOO.util.Dom.get('page_x002e_data-form_x002e_task-edit_x0023_default_assoc_wfit_synthese_avis_services') != null
                               && YAHOO.util.Dom.get('page_x002e_data-form_x002e_task-edit_x0023_default_assoc_wfit_synthese_avis_services').value== 0){

                          Alfresco.util.PopupManager.displayMessage({
                             text: Alfresco.util.message("error.noSynthese", this.name),
                             displayTime: 4
                          });

                          return;

                       }

                    }

                    var me = this;
                    if(this.options.confirm!=null && transitionId=="Rejeter"){
                       Alfresco.util.PopupManager.displayPrompt({
                          title: "Veuillez confirmer",
                          text: "êtes-vous sûr de vouloir rejeter cette demande de prorogation ?",
                          buttons: [{
                             text: "Continuer",
                             handler: function org_alfresco_training_onActionCallWebScriptSuccess_success_ok() {
                                //MNT-2196 fix, disable transition button to prevent multiple execution
                                p_obj.set("disabled", true);

                                // get the hidden field
                                var hiddenField = me._getHiddenField();

                                // set the hidden field value
                                Dom.setAttribute(hiddenField, "value", transitionId);

                                if (Alfresco.logger.isDebugEnabled())
                                   Alfresco.logger.debug("Set transitions hidden field to: " + transitionId);

                                // generate the hidden transitions field
                                me._generateTransitionsHiddenField();

                                // attempt to submit the form
                                Alfresco.util.submitForm(p_obj.getForm());
                                this.destroy();
                             },
                             isDefault: true
                          },
                             {
                                text:"Annuler",
                                handler: function org_alfresco_training_onActionCallWebScriptSuccess_cancel() {
                                   this.destroy();
                                }
                             }
                          ]
                       });
                    }else{
                       //MNT-2196 fix, disable transition button to prevent multiple execution
                       p_obj.set("disabled", true);

                       // get the hidden field
                       var hiddenField = this._getHiddenField();

                       // set the hidden field value
                       Dom.setAttribute(hiddenField, "value", transitionId);

                       if (Alfresco.logger.isDebugEnabled())
                          Alfresco.logger.debug("Set transitions hidden field to: " + transitionId);

                       // generate the hidden transitions field
                       this._generateTransitionsHiddenField();

                       // attempt to submit the form
                       Alfresco.util.submitForm(p_obj.getForm());
                    }

                 }



              });

   })();
   (function()
{
   new Alfresco.CustomActivitiTransitions("${fieldHtmlId}").setOptions(
   {

      currentValue: "${field.control.params.options?js_string}",
      <#if field.control.params.confirm??>
      confirm : "${field.control.params.confirm}",
      </#if>
      hiddenFieldName: "${field.name}"

   }).setMessages(
      ${messages}
   );
})();
//]]></script>

<div class="form-field suggested-actions" id="${fieldHtmlId}">
   <div id="${fieldHtmlId}-buttons">
   </div>
</div>
</#if>
