const authErrorHandler = (e) => {
	console.log(e.message)
	const errors = {
		"firstname": "",
		"lastname": "",
		"username": ""
	}
	if(e.message.includes("Users validation failed") && e.message.includes("firstName")){
		errors.firstname = "Character Must Not exceeds 20"
	}
	else if(e.message.includes("Users validation failed") && e.message.includes("lastName")){
		errors.lastname = "Character Must Not exceeds 20"
	}
	else if(e.message.includes("userName_1 dup key")){errors.username = "Username Already Exists"}
	
	return errors;
}

module.exports = {
    authErrorHandler
}