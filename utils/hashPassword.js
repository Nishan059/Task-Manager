const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async(oldPassword) => {
	try {
		const salt = await bcrypt.genSalt();
		const password = await bcrypt.hash(oldPassword, salt);
		// console.log(password)
		return password;
	} catch(e) {
		// statements
		console.log(e);
	}
}

// Export
module.exports = hashPassword;