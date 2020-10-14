const User = require('../models/user').User;
//Here we are managing our requests by GET or POST requests
const Manager = {
    getById: async id => {
        const t = await User.findById(id);
        if (t === null)
            return false;

        return t;
    },
    getByEmail: async email => {
        const t = await User.findOne({ email: email });
        if (t === null)
            return false;

        return t;
    },
    add: async t => {
        const r = await t.save();
        if (r === null)
            return false;

        return r;
    }
};

module.exports = Manager;
