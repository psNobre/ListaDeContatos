var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var db = mongojs('contactlist',['contactlist']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//GETs
app.get('/contactlist', function (req, res) {
	console.log('GET Request recebido.');
    db.contactlist.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
        console.log("GET Response respondido.");
    });
});

app.get("/contactlist/:id", function (req, res) {
    console.log('GET Request recebido.');
    var id = req.params.id;
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        console.log(doc);
        res.json(doc);
        console.log("GET Response respondido.");
    });
});

//POSTs
app.post('/contactlist', function (req, res) {
    console.log('POST Request recebido.');
    console.log(req.body);
    db.contactlist.insert(req.body, function (err, doc) {
        res.json(doc);
        console.log("POST Response respondido.");
    })
});

//DELETEs
app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log("DELETE Request recebido: objectId - "+id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
        console.log("DELETE Response enviado.");
    });

});

//PUTs
app.put('/contactlist/:id', function (req, res) {
     var id = req.params.id;
     console.log("PUT Request recebido.");
     db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
     update: {$set: {nome: req.body.nome, email: req.body.email, telefone: req.body.telefone}}, new: true}, function (err, doc) {
         res.json(doc);
         console.log("PUT Response enviado.");
        });

});

app.listen(3000);
console.log("Server Rodando: porta 3000");