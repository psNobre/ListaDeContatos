var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
	console.log('GET Request recebido.');

    db.contactlist.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
        console.log("GET Response respondido.");
    });
});

app.post('/contactlist', function (req, res) {
    console.log(req.body);
    db.contactlist.insert(req.body, function (err, doc) {
        res.json(doc);
    })
});

app.listen(3000);
console.log("Server Rodando: porta 3000");