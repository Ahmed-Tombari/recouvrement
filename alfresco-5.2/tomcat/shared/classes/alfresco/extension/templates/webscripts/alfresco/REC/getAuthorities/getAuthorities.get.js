auth.runAsSystem();
var results = [];
var userName = args.userName;
var user = {};
var fullName = "";
var email = "";

if(userName){
 
  user =  people.getPerson(userName);
  fullName = user.properties["cm:firstName"] + " " + user.properties["cm:lastName"];
  email = user.properties["cm:email"];
  results = people.getContainerGroups(user);

}

  model.fullName = fullName;
  model.email = email;
  model.results = results;

