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
    console.log("home");
    response.render('home' , {layout: false});
});
//KNN
app.get('/1', function (request, response) {
    console.log('entro a knn');
    fs.readFile('./public/data/db.txt', 'utf-8', (err, dbData) => {
        if (err) throw err;
        var dataUsers = [];
        processData(dbData, dataUsers);
        var userNames = [];
        console.log('length: ' + dataUsers.length);
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
            data: dbData,
            layout: false
        }

        response.render('knn', context);
    });
});
//Ideal Festival For a Person
app.get('/2', function (request, response) {
    console.log('entro a Ideal Festival For a Person');
    fs.readFile('./public/data/db.txt', 'utf-8', (err, dbData) => {
        if (err) throw err;
        var dataUsers = [];
        processData(dbData, dataUsers);
        var userNames = [];
        console.log('length: ' + dataUsers.length);
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
            data: dbData,
            layout: false
        }

        response.render('person', context);
    });
});

//Ideal Festival For a Group
app.get('/3', function (request, response) {
    console.log('entro a Ideal Festival For a Group');
    fs.readFile('./public/data/db.txt', 'utf-8', (err, dbData) => {
        if (err) throw err;
        var dataUsers = [];
        processData(dbData, dataUsers);
        var userNames = [];
        console.log('length: ' + dataUsers.length);
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
            data: dbData,
            layout: false
        }

        response.render('group', context);
    });
});

//Ideal Festival For All
app.get('/4', function (request, response) {
    console.log('entro a Ideal Festival For a Group');
    fs.readFile('./public/data/db.txt', 'utf-8', (err, dbData) => {
        if (err) throw err;
        var dataUsers = [];
        processData(dbData, dataUsers);
        var userNames = [];
        console.log('length: ' + dataUsers.length);
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
            data: dbData,
            layout: false
        }

        response.render('all', context);
    });
});

//Ideal Festival For A Music Genre
app.get('/5', function (request, response) {
    console.log('entro a Ideal Festival For A Music Genre');
    const rangeMusicGenre = [3, 19];
    fs.readFile('./public/data/db.txt', 'utf-8', (err, dbData) => {
        if (err) throw err;
        var dataUsers = [];
        processData(dbData, dataUsers);
        var userNames = [];
        console.log('length: ' + dataUsers.length);
        for (let index = 0; index < dataUsers.length; index++) {
            const user = dataUsers[index];
            const objUser = {
                name: user[1],
                index: index
            }
            userNames.push(objUser);
        }
        const musicGenreNames = headers.slice(rangeMusicGenre[0],rangeMusicGenre[1]);
        var objectsMG = []
        for (let index = 0; index < musicGenreNames.length; index++) {
            const genreName = musicGenreNames[index];
            const objMG = {
                name: genreName,
                index : (index+rangeMusicGenre[0])
            }
            objectsMG.push(objMG);
        } 
        console.log(musicGenreNames);
        console.log('length: '+musicGenreNames.length)
        var context = {
            users: userNames,
            data: dbData,
            musicGenres: objectsMG,
            layout: false
        }
        response.render('music_genre', context);
    });
});

//IDEAL RESTAURANT EXPERIENCE
app.get('/6', function (request, response) {
    console.log('entro a IDEAL RESTAURANT EXPERIENCE');
    fs.readFile('./public/data/db.txt', 'utf-8', (err, dbData) => {
        if (err) throw err;
        var dataUsers = [];
        processData(dbData, dataUsers);
        var userNames = [];
        console.log('length: ' + dataUsers.length);
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
            data: dbData,
            layout: false
        }
        response.render('restaurant', context);
    });
});

app.listen(process.env.PORT || 3000);;