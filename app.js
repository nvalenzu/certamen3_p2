var express         = require("express");
var bodyParser      = require("body-parser");
var mongoose        = require('mongoose');
var methodOverride  = require("method-override");
var app             = express();

// Coneccion a la BD
mongoose.connect('mongodb://localhost/programas', function(err, res) {
  if(err) throw err;
  console.log('Conectado a la BD');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Importando modelos y controladores
var models     = require('./models/programa')(app, mongoose);
var programaCtrl = require('./controllers/programa');


var router = express.Router();

//Index -route
router.get('/', function(req, res) {
  res.send("Hola mundo");
});
app.use(router);

// API routes
var api = express.Router();

api.route('/programas')
  .get(programaCtrl.findAll)
  .post(programaCtrl.add);

api.route('/programas/:id')
  .get(programaCtrl.findById)
  .put(programaCtrl.update)
  .delete(programaCtrl.delete);

app.use('/api', api);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});