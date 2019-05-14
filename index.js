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

//defninir ruta root o principal
app.get('/', function (request, response) {
    console.log("funcionaa")

    // Reading data in utf-8 format 
    // which is a type of character set. 
    // Instead of 'utf-8' it can be  
    // other character set also like 'ascii' 
    fs.readFile('./public/data/db.txt', 'utf-8', (err, data) => {
        if (err) throw err;

        // Converting Raw Buffer to text 
        // data using tostring function. 
        //console.log(data); 
        var context = {
            text: data
        }
        //console.log(context.text);
        response.render('home', context);
    })


});

app.listen(8000);