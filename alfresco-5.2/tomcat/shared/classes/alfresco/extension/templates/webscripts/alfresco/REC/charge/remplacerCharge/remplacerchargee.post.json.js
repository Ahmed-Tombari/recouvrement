auth.runAsSystem();
var nomAgent = args.nomAgent;
var agent = json.get("agent")+"";

results = search.query(
  {
      language: "fts-alfresco",
      query:"PATH:'/app:company_home/st:sites/cm:recouvrement/cm:documentLibrary/*/*' AND cm:name:'Dossier_Recouvrement-*' AND drccf:agent:'" + nomAgent + "'",
      sort: [{
              column: 'cm:name',
              ascending: true
          }]
  });

for each(var res in results) {
	res.properties["drccf:agent"]=agent;
	res.save();
}

   model.agent = agent;
   model.statut = "agent remplacer avec succees";
