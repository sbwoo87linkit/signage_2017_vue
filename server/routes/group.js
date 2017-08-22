var Group = require('../models/group');
var auth = require('./auth')
module.exports = function (app) {

  // app.use(auth.ensureAuthenticated)

  app.get('/api/groups/:groupId', function (req, res) {
    Group.findOne({_id: req.params.groupId}, function (err, group) {
      if (err) return res.status(500).json({error: err});
      res.json(group);
    })
  });

  app.get('/api/groups/:customerId/:type', function (req, res) {
    Group.find({customerId: req.params.customerId, type: req.params.type}, function (err, groups) {
      if (err) return res.status(500).json({error: err});
      res.json(groups);
    })
  });

  // CREATE
  app.post('/api/groups/:customerId/:type', function (req, res) {
    var group = new Group();
    group.name = req.body.name;
    group.customerId = req.params.customerId;
    group.type = req.params.type;
    // group.address = req.body.address;
    // group.description = req.body.description;

    group.save(function (err) {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // next(new Error('email must be unique'));
          return res.status(422).json({error: 'Already group name exists.'});
        }
        return res.status(500).json({error: 'database failure'});
      }


      // if (err) {
      //   console.error(err);
      //   res.json({result: 0});
      //   return;
      // }
      res.json({result: 1});
    });
  });

  // UPDATE THE
  app.put('/api/groups/:id', function (req, res) {
    Group.update({_id: req.params.id}, {$set: req.body}, function (err, output) {

      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // next(new Error('email must be unique'));
          return res.status(422).json({error: 'Already group name exists.'});
        }
        return res.status(500).json({error: 'database failure'});
      }
      // console.log(output);
      if (!output.n) {
        return res.status(404).json({error: 'group not found'});
      }
      res.json({message: 'group updated'});
    })
  });

  // DELETE
  app.delete('/api/groups/:id', function (req, res) {
    Group.remove({_id: req.params.id}, function (err, output) {
      if (err) return res.status(500).json({error: "database failure"});
      res.status(204).end();
    })
  });

}
