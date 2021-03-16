const Lift = require('../models/lift').Lift;

const Manager = {
    getLatestByUserId: async id => {
        const t = await Lift.find({ userId: id }).sort({datetime:-1}).limit(1);
        if (t === null)
          return false;

        return t;
    },
    getLatestTwoByUserId: async id => {
      const t = await Lift.find({ userId: id }).sort({datetime:-1}).limit(2);
      if (t === null)
        return false;

      return t;
    },
    getAllByUserId: async id => {
      const t = await Lift.find({ userId: id }).sort({datetime:-1});
      if (t === null)
        return false;

      return t;
    },
    getByUserId: async id => {
      const t = await Lift.find({ userId: id });
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
