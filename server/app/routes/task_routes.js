var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  app.get('/tasks/:listId', (req, res) => {
    const listId = req.params.listId;
    db.collection('tasks').find( {listId: listId} ).toArray(function(err, items) {
      if (err) {
        res.send({ success: false });
      } else {
        res.send({success:true, data: items});
      }
    });
  });

  app.post('/tasks', (req, res) => {
    const task = { listId: new ObjectID(req.body.listId), isDone: req.body.isDone, description: req.body.description };
    db.collection('tasks').insert(task, (err, result) => {
      if (err) { 
        res.send({ success: false }); 
      } else {
        res.send({success:true, data: result.ops[0]});
      }
    });
  });

  app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('tasks').remove(details, (err, item) => {
      if (err) {
        res.send({ success: false }); 
      } else {
        res.send({ success:true, data: details});
      } 
    });
  });

    app.put ('/tasks/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const details = { '_id': new ObjectID(id) };
    const task = { listId: new ObjectID(req.body.listId), isDone: req.body.isDone, description: req.body.description };
    db.collection('tasks').update(details, task, (err, result) => {
      if (err) {
          res.send({ success: false }); 
      } else {
          task["_id"] = id;
          res.send({ success:true, data: task});
      } 
    });
  });
};