const Thing = require("../models/userdata").UserData;

exports.createThing = (req, res, next) => {
  console.log(req.body);
  const thingObject = req.body;
  const thing = new Thing({
    ...thingObject,
  });
  thing
    .save()
    .then(() => {
      res.status(201).json({ message: "obj create!" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getAllData = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.deleteData = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(() => {
      Thing.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({ message: "Objet supprimé !" });
        })
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
