const listRoutes = require('./list_routes');
const taskRoutes = require('./task_routes');
module.exports = function(app, db) {
  listRoutes(app, db);
  taskRoutes(app, db);
};