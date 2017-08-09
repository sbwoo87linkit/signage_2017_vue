var Schedule = require('../models/schedule');
// var Player = require('../models/player');
// var Group = require('../models/group');
var auth = require('./auth')
var async = require('async');

module.exports = function (app) {

  app.get('/api/schedules/:groupId', function (req, res) {
    Schedule.find({groupId: req.params.groupId}).sort('-createAt').exec(function (err, schedules) {
      if (err) return res.status(500).json({error: err});
      res.json(schedules);
    })
  });

  // CREATE
  app.post('/api/schedules/:groupId', function (req, res) {

      var schedule = new Schedule();
      schedule.groupId = req.params.groupId;
      schedule.type = req.body.type;
      schedule.from = req.body.from;
      schedule.to = req.body.to;
      schedule.rows = req.body.rows;


      schedule.save(function(err){
        if (err) {
          console.error(err);
          res.json({result: 0});
          return;
        }
        res.json({result: 1});
      });

  });

  // UPDATE THE
  app.put('/api/schedules/:id', function (req, res) {
    Schedule.update({_id: req.params.id}, {$set: req.body}, function (err, output) {
      if (err) res.status(500).json({error: 'database failure'});
      console.log(output);
      if (!output.n) return res.status(404).json({error: 'schedule not found'});
      res.json({message: 'schedule updated'});
    })
  });

  // DELETE
  app.delete('/api/schedules/:id', function (req, res) {

    Schedule.remove({_id: req.params.id}, function (err, output) {
      if (err) return res.status(500).json({error: "database failure"});
      res.status(204).end();
    })

  });

}
