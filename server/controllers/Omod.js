const models = require('../models');

const { Omod } = models;

const makerPage = (req, res) => {
  Omod.OmodModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), omods: docs });
  });
};

const makeOmod = (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.evil) {
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }

  console.log(req.body);

  const omodData = {
    name: req.body.name,
    age: req.body.age,
    evil: req.body.evil,
    owner: req.session.account._id,
  };

  const newOmod = new Omod.OmodModel(omodData);

  const omodPromise = newOmod.save();

  omodPromise.then(() => res.json({ redirect: '/maker' }));

  omodPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Omod already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return omodPromise;
};

const getOmods = (request, response) => {
  const req = request;
  const res = response;

  return Omod.OmodModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ omods: docs });
  });
};

module.exports = {
  makerPage,
  makeOmod,
  getOmods,
};
