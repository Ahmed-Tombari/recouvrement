/*function formatDate(date){
	const output = String(date.getDate()).padStart(2, '0')+"-"+String((date.getMonth()+1)).padStart(2, '0')+"-"+date.getFullYear();
	return output
}*/

var groups = groups.getGroup("CHARGES").allUsers;
var charges = [];
var y;
for each(var g in groups){
	y = people.getPerson(g.userName);
	
	charges.push({

		"id":y.properties["chm:codechargee"],
		"firstName":y.properties["cm:firstName"],
		"lastName":y.properties["cm:lastName"],
		"adresse":y.properties["chm:adressechargee"],
		"telephone":y.properties["cm:telephone"],
		"disponibilite":y.properties["chm:disponibilite"]!=null?y.properties["chm:disponibilite"].toString():'',
		"dateDeLaProchaineDisponibilite":new Date(y.properties["chm:dateDeLaProchaineDisponibilite"]).toLocaleDateString(),
		"ville":y.properties["chm:villechargee"],
		"gouvernorat":y.properties["chm:gouvernoratchargee"],
		"enabled":y.properties["usr:enabled"] != null ? y.properties["usr:enabled"].toString():'',
		"motif":y.properties["chm:motif"]

	});

}

model.charges = charges;