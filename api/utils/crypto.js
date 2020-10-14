const bcrypt = require('bcryptjs');

//This function will allow us to hash our password
const crypto = {
    getHashedPassword: async pass => {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(pass, salt);
        return hashed;
    },
    comparePassword: async (pass, hashedPassword) => {
        const result = await bcrypt.compare(pass, hashedPassword);
        return result;
    }
};

module.exports = crypto;
