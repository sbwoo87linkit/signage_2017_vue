var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');

module.exports = {
    /*
     |--------------------------------------------------------------------------
     | Login Required Middleware
     |--------------------------------------------------------------------------
     */
    ensureAuthenticated: function(req, res, next) {
        if (!req.header('Authorization')) {
            return res.status(401).send({message: 'Please make sure your request has an Authorization header'});
        }
        var token = req.header('Authorization').split(' ')[1];

        var payload = null;
        try {
            payload = jwt.decode(token, config.TOKEN_SECRET);
        }
        catch (err) {
            return res.status(401).send({message: err.message});
        }

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({message: 'Token has expired'});
        }
        req.user = payload.sub;
        next();
    },

    /*
     |--------------------------------------------------------------------------
     | Generate JSON Web Token
     |--------------------------------------------------------------------------
     */
    createJWT: function (user) {
        var payload = {
            // sub: user._id,
            sub: user,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.encode(payload, config.TOKEN_SECRET);
    }

};
