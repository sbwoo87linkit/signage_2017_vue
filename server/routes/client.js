var Schedule = require('../models/schedule');
var Player = require('../models/player');
var Group = require('../models/group');
var auth = require('./auth')
var async = require('async');

module.exports = function (app) {

  app.get('/api/client/:playerId', function (req, res) {

    Player.findOne( { _id : req.params.playerId}, function (err, player) {
      if (player === undefined) return res.status(204).json({error: err});
      Group.findOne({_id: player.groupId}, function (err, group) {
        var groupConfig = { 'offdays' : [],  }
        Schedule.find({groupId : player.groupId}, function (err, schedules) {
          var response = {config: groupConfig, schedules: schedules}
          res.json(response)
          player.updateAt = new Date();
          player.save();
        })
      })
    })

  });

  app.get('/api/client/files/:fileId', function (req, res) {

    var file = __dirname + '/../uploads/' + req.params.fileId;
    res.download(file); // Set disposition and send it.

  })

}
