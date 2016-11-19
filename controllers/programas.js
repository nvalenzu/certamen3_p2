var mongoose = require('mongoose');
var Programa  = mongoose.model('Programa');

//GET - Retorna todos los registrados
exports.findAll = function(req, res) {
	Programa.find(function(err, programas) {
    if(err) res.send(500, err.message);

    console.log('GET /programas')
	res.status(200).jsonp(programas);
	});
};

//GET - Retorna los registrados especificando la ID
exports.findById = function(req, res) {
	Programa.findById(req.params.id, function(err, programa) {
    if(err) return res.send(500, err.message);

    console.log('GET /programas/' + req.params.id);
		res.status(200).jsonp(programa);
	});
};

//POST - Inserta un nuevo registro en la BD
exports.add = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var programa = new Programa({
		name:    req.body.name,
	});

	programa.save(function(err, programa) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(programa);
	});
};

//PUT - Actualiza los registros ya existentes
exports.update = function(req, res) {
	Programa.findById(req.params.id, function(err, programa) {
		programa.name   = req.body.name;
		programa.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(programa);
		});
	});
};

//DELETE - Elimina un registro especificando ID
exports.delete = function(req, res) {
	Programa.findById(req.params.id, function(err, programa) {
		programa.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.json({ message: 'Eliminacion exitosa' });
		});
	});
};

//end