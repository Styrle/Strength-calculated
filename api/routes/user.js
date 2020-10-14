const router = require('express').Router();
const userManager = require('../managers/user');
const User = require('../models/user').User;
const crypto = require('../utils/crypto');
//Posting the users details so they can be checked and then login
router.post('/login', async (req, res) => {
    try {
        const user = await userManager.getByEmail(req.body.email);
        if (!user)
            return res.status(400).send(`User does not exists with this email.`);

        const isValidPassword = await crypto.comparePassword(req.body.password, user.password);
        if (!isValidPassword)
            return res.status(400).send(`Password did not match.`);

        return res.status(200).send(user);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});
//Posting the users details so they can signup
router.post('/signup', async (req, res) => {
    try {
        let user = await userManager.getByEmail(req.body.email);
        if (user)
            return res.status(400).send(`User already exists with this email.`);

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: await crypto.getHashedPassword(req.body.password),
            weight: req.body.weight,
            age: req.body.age
        });
        user = await userManager.add(user);
        return res.status(200).send(user);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;
