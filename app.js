var mysql = require('mysql');
var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('student', 'root', '123', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.engine('.html',ejs.__express);
app.set("view engine",'html');

var student_name = sequelize.define('student_name',   {
    id: Sequelize.INTEGER,  
    name:  Sequelize.STRING
}, {
    tableName: 'student_name',
    timestamps: false
});

app.get('/', function (req, res) {
  res.render("print-infor");
})

app.get('/student_names', function(req, res) {
    var all_data = [];

    student_name.findAll().then(function(data) {
        for (var i = 0; i < data.length; i++) {
            all_data.push(data[i].dataValues);
        }
    res.send(all_data);

    });
});

app.delete('/student_name/:id', function(req, res) {
    var id = req.params.id;

    student_name.destroy({where:{id:id}});
    res.end();
});

app.post('/student_name', function(req, res) {
    var name = req.body.name;

    student_name.create({name:name});
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
