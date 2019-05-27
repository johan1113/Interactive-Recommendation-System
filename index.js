const express = require('express');
const hbs = require('express-handlebars');
const app = express();

//para definir la carpeta publica
app.use(express.static('public'));
//para registrar el motor de render handlebars
app.engine('handlebars', hbs());
//para setear el motor de render a utilizar
app.set('view engine', 'handlebars');

// Requiring fs module in which 
// readFile function is defined. 
const file = require('file-system');
const fs = require('fs');

var headers;

function processData(allText, dataUsers) {
    var allTextLines = allText.split('\n');
    headers = allTextLines[0].split(',');
    for (let index = 1; index < allTextLines.length; index++) {
        const user = allTextLines[index].split(',');
        dataUsers.push(user);
    }
}

//defninir ruta root o principal
app.get('/', function (request, response) {
    console.log("funcionaa");
    // Reading data in utf-8 format 
    fs.readFile('./public/data/db.txt', 'utf-8', (err, dbData) => {
        if (err) throw err;
        var context = {
            text: dbData
        }
        response.render('home', context);
    });
});

app.get('/1', function (request, response) {
    console.log('entro a knn');
    fs.readFile('./public/data/db.txt', 'utf-8', (err, dbData) => {
        if (err) throw err;
        var dataUsers = [];
        processData(dbData, dataUsers);
        var userNames = [];
        console.log('length: '+dataUsers.length);
        for (let index = 0; index < dataUsers.length; index++) {
            const user = dataUsers[index];
            const objUser = {
                name: user[1],
                index: index
            }
            userNames.push(objUser);
        }
        console.log(userNames);
        var context = {
            users: userNames,
            data: dbData
        }

        response.render('knn', context);
    });
});

app.listen(8000);