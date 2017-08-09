var Player = require('../models/player');
var auth = require('./auth')
module.exports = function (app) {

  // app.use(auth.ensureAuthenticated)

  // app.get('/api/players/:playerId', function (req, res) {
  //   Player.findOne({_id: req.params.playerId}, function (err, player) {
  //     if (err) return res.status(500).json({error: err});
  //     res.json(player);
  //   })
  // });


  app.get('/api/players/:groupId', function (req, res) {
    Player.find({groupId: req.params.groupId}, function (err, players) {
      if (err) return res.status(500).json({error: err});
      res.json(players);
    })
  });

  // CREATE
  app.post('/api/players/:groupId', function (req, res) {
    var player = new Player();
    player.name = req.body.name;
    player.groupId = req.params.groupId;
    player.mode = req.body.mode;
    player.description = req.body.description;

    player.save(function (err) {
      if (err) {
        console.error(err);
        res.json({result: 0});
        return;
      }
      res.json({result: 1});
    });
  });

  // UPDATE THE
  app.put('/api/players/:groupId/:id', function (req, res) {
    Player.update({_id: req.params.id}, {$set: req.body}, function (err, output) {
      if (err) res.status(500).json({error: 'database failure'});
      console.log(output);
      if (!output.n) return res.status(404).json({error: 'player not found'});
      res.json({message: 'player updated'});
    })
  });

  // DELETE
  app.delete('/api/players/:groupId/:id', function (req, res) {
    Player.remove({_id: req.params.id}, function (err, output) {
      if (err) return res.status(500).json({error: "database failure"});
      res.status(204).end();
    })
  });

}
