// DEFINE MODEL
var User = require('../models/user');
var utils = require('./auth')
module.exports = function(app)
{

    // GET BY COMPANY
    app.get('/api/users/customer/:customerId', function(req, res){
        User.find({customerId: req.params.customerId}, function(err, users){
            if(err) return res.status(500).json({error: err});
            //if(users.length === 0) return res.status(404).json({error: 'user not found'});
            res.json(users);
        })
    });

    app.delete('/api/users/:id', function(req, res){
        User.remove({ _id: req.params.id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
             if(!output.result.n) return res.status(404).json({ error: "customer not found" });
             res.json({ message: "customer deleted" });
             */

            res.status(204).end();
        })
    });


    /*
     |--------------------------------------------------------------------------
     | GET /api/me
     |--------------------------------------------------------------------------
     */
    app.get('/api/me', utils.ensureAuthenticated, function (req, res) {
        User.findById(req.user, function (err, user) {
            res.send(user);
        });
    });

    /*
     |--------------------------------------------------------------------------
     | PUT /api/me
     |--------------------------------------------------------------------------
     */
    app.put('/api/me', utils.ensureAuthenticated, function (req, res) {
        User.findById(req.user, function (err, user) {
            if (!user) {
                return res.status(400).send({message: 'User not found'});
            }
            user.displayName = req.body.displayName || user.displayName;
            user.email = req.body.email || user.email;
            user.password = req.body.password;
            user.description = req.body.description || user.description;
            user.save(function (err) {
                res.status(200).end();
            });
        });
    });

    /*
     |--------------------------------------------------------------------------
     | Log in with Email
     |--------------------------------------------------------------------------
     */
    app.post('/auth/login', function (req, res) {
        User.findOne({email: req.body.email}, '+password', function (err, user) {
            if (!user) {
                return res.status(401).send({message: 'Invalid email and/or password'});
            }
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (!isMatch) {
                    return res.status(401).send({message: 'Invalid email and/or password'});
                }
                res.send({token: utils.createJWT(user)});
            });
        });
    });

    /*
     |--------------------------------------------------------------------------
     | Create Email and Password Account
     |--------------------------------------------------------------------------
     */
    app.post('/auth/signup', function (req, res) {
        User.findOne({email: req.body.email}, function (err, existingUser) {
            if (existingUser) {
                return res.status(409).send({message: 'Email is already taken'});
            }
            if (req.body.customerId) {
                var user = new User({
                    displayName: req.body.displayName,
                    customerId: req.body.customerId,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role,
                    description: req.body.description
                });
            } else {
                var user = new User({
                    displayName: req.body.displayName,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role,
                    description: req.body.description
                });
            }
            user.save(function (err, result) {
                if (err) {
                    res.status(500).send({message: err.message});
                }
                res.send({token: utils.createJWT(result)});
            });
        });
    });


}

