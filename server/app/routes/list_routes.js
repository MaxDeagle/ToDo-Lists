var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  app.get('/lists', (req, res) => {

      db.collection('lists').aggregate([{
       $lookup:
      {
      from: "tasks",
      localField: "_id",
      foreignField: "listId",
      as: "tasks"
      }
      }]).toArray(function(err, items) {
      if (err) {
        res.send({ success: false });
      } else {
        res.send({success: true, data: items});
      }
      });


  });

  app.post('/lists', (req, res) => {
    const list = { name: req.body.name };
    db.collection('lists').insert(list, (err, result) => {
      if (err) { 
        res.send({ success: false }); 
      } else {
        res.send({success: true, data: result.ops[0]});
      }
    });
  });

  app.delete('/lists/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('lists').remove(details, (err, item) => {
      if (err) {
        res.send({ success: false });
      } else {
        res.send({success: true, data: item});
      } 
    });
  });

    app.put ('/lists/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const list = { name: req.body.name };
    db.collection('lists').update(details, list, (err, result) => {
      if (err) {
          res.send({ success: false });
      } else {
          res.send({success: true, data: list});
      } 
    });
  });
};