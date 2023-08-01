var userHome = document.parent;

if(!userHome.hasAspect("drccf:increment"))
{
	userHome.addAspect("drccf:increment");
	userHome.properties["drccf:increment"] = 0;
	userHome.save();
}

var i = userHome.properties["drccf:increment"] + 1;
userHome.properties["drccf:increment"] = i;
userHome.save();


var user = people.getPerson(document.name);



user.addAspect("chm:charge");
user.properties["chm:codechargee"] = i;
user.properties["chm:disponibilite"] = true;
user.properties["chm:dateDeLaProchaineDisponibilite"] = new Date();
user.save();

//Attacher le chargee au site recouvrement

var siteRecouvrement = siteService.getSite("recouvrement");

siteRecouvrement.setMembership(document.name, "SiteCollaborator");
