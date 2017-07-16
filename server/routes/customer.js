var Customer = require('../models/customer');
module.exports = function(app)
{

    // GET ALLS
    app.get('/api/customers', function(req,res){
        Customer.find(function(err, customers){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(customers);
        })
    });

    // GET SINGLE
    app.get('/api/customers/:company_id', function(req, res){
        Customer.findOne({_id: req.params.company_id}, function(err, customer){
            if(err) return res.status(500).json({error: err});
            if(!customer) return res.status(404).json({error: 'customer not found'});
            res.json(customer);
        })
    });

    // CREATE
    app.post('/api/customers', function(req, res){
        var customer = new Customer();
        customer.name = req.body.name;
        customer.address = req.body.address;
        customer.description = req.body.description;
        customer.nLimit = req.body.nLimit;

        customer.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});

        });
    });

    // UPDATE THE
    app.put('/api/customers/:id', function(req, res){
        Customer.update({ _id: req.params.id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'customer not found' });
            res.json( { message: 'customer updated' } );
        })
        /* [ ANOTHER WAY TO UPDATE THE ]
         Customer.findById(req.params.company_id, function(err, customer){
         if(err) return res.status(500).json({ error: 'database failure' });
         if(!customer) return res.status(404).json({ error: 'customer not found' });

         if(req.body.title) customer.title = req.body.title;
         if(req.body.author) customer.author = req.body.author;
         if(req.body.published_date) customer.published_date = req.body.published_date;

         customer.save(function(err){
         if(err) res.status(500).json({error: 'failed to update'});
         res.json({message: 'customer updated'});
         });

         });
         */
    });

    // DELETE
    app.delete('/api/customers/:id', function(req, res){
        Customer.remove({ _id: req.params.id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
             if(!output.result.n) return res.status(404).json({ error: "customer not found" });
             res.json({ message: "customer deleted" });
             */

            res.status(204).end();
        })
    });

}
