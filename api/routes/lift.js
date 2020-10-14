const router = require('express').Router();
const liftManager = require('../managers/lift');
const Lift = require('../models/lift').Lift;

router.post('/all', async (req, res) => {
    try {
        const t = await liftManager.getByUserId(req.body.userId);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/', async (req, res) => {
    try {
        let t = new Lift({ ...req.body });
        t = await liftManager.add(t);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/latest', async (req, res) => {
    try {
        const t = await liftManager.getLatestByUserId(req.body.userId);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/latest-two', async (req, res) => {
    try {
        const t = await liftManager.getLatestTwoByUserId(req.body.userId);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/all2', async (req, res) => {
    try {
        const t = await liftManager.getAllByUserId(req.body.userId);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;
