var Content = require('../models/content');
// var multer = require('multer');
// var upload = multer();
var auth = require('./auth')
var async = require('async');
var multer = require('multer');
var fs = require('fs');
var dir = __dirname + '/../uploads/';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir)
  },
  filename: function (req, file, cb) {
    // var fileName = file.originalname.substr(0, file.originalname.lastIndexOf('.'));
    var fileExt = file.originalname.substr(file.originalname.lastIndexOf('.'));
    var uuid = require('node-uuid');
    var uuid4 = uuid.v4();
    cb(null, uuid4 + fileExt);
  }
});

var upload = multer({storage: storage});


module.exports = function (app) {

  app.get('/api/contents/:groupId', function (req, res) {
    Content.find({groupId: req.params.groupId}).sort('-createAt').exec(function (err, contents) {
      if (err) return res.status(500).json({error: err});
      res.json(contents);
    })
  });

  // CREATE
  app.post('/api/contents/:groupId', upload.any(), function (req, res) {

    async.each(req.files, function (file, callback) {
        var content = new Content();
        content.groupId = req.params.groupId;
        content.fileName = file.filename;
        content.originalName = file.originalname;
        content.mimeType = file.mimetype;
        // content.uploadBy = req.body.uploadBy;
        content.uploadBy = 'sbwoo87@gmail.com';
        content.size = file.size;

        content.save(function(err){
          if(err){
            callback(err);
          }
          callback();
        });

    }, function (err) {
      if (err) {
        console.log('A file failed to process');
        res.json({result: 0});
      } else {
        console.log('All files have been processed successfully');
        res.json({result: req.files.length});
      }
    });
  });

  // UPDATE THE
  app.put('/api/contents/:id', function (req, res) {
    Content.update({_id: req.params.id}, {$set: req.body}, function (err, output) {
      if (err) res.status(500).json({error: 'database failure'});
      console.log(output);
      if (!output.n) return res.status(404).json({error: 'content not found'});
      res.json({message: 'content updated'});
    })
  });

  // DELETE
  app.delete('/api/contents/:id', function (req, res) {

    Content.findOne({_id: req.params.id}, function (err, output) {
      if (err) return res.status(500).json({error: "database failure"});
      console.log('output', output.fileName);

      var filePath = dir + '/' + output.fileName;
      if (fs.existsSync(filePath)) {
        // Do something
        fs.unlink(filePath);
      }

      Content.remove({_id: req.params.id}, function (err, output) {
        if (err) return res.status(500).json({error: "database failure"});
        res.status(204).end();
      })

    })

  });

}
