const rangeMusicGenre = [3, 18];
const rangeArtist = [19, 64];
const rangeDiet = [65, 67];
const rangeFood = [68, 93];
const rangeDrink = [94, 109];

window.addEventListener('load', function () {
    var headers;
    var dataUsers;

    var dbData = document.querySelector("#ccc").getAttribute('data-db');
    //console.log(dbData);
    processData(dbData);

    calculateRecommendation();
});

function processData(allText) {
    var allTextLines = allText.split('\n');
    headers = allTextLines[0].split(',');
    console.log(headers);
    dataUsers = [];
    for (let index = 1; index < allTextLines.length; index++) {
        const user = allTextLines[index].split(',');
        dataUsers.push(user);
    }
}

function calculateRecommendation() {
    var btn = document.querySelector('.button');
    btn.addEventListener('click', function () {
        this.preventDefault;
        const selUser = document.querySelector('.users-selector');
        var usersSelected = [];
        for (let index = 0; index < selUser.options.length; index++) {
            const opt = selUser.options[index];
            if (opt.selected == true) {
                const userIndex = parseInt(opt.value);
                console.log('///// UserIndex: ' + userIndex);
                const userName = opt.innerHTML;
                const objUser = {
                    name: userName,
                    index: userIndex
                }
                usersSelected.push(objUser);
            }
        }
        var algorithmSelected;
        const selAlgorithm = document.querySelector('.algorithm-selector');
        for (let index = 0; index < selAlgorithm.options.length; index++) {
            const opt = selAlgorithm.options[index];
            if (opt.selected == true) {
                algorithmSelected = opt.innerHTML;
                break;
            }
        }
        if (algorithmSelected != null && usersSelected != null && usersSelected.length > 1) {
            generateRecommendationResult(usersSelected, algorithmSelected);
        } else {
            btn.style.animation = 'wiggle 700ms';
            setTimeout(function () { btn.style.animation = 'none'; }, 700);
        }
    });
}

function generateRecommendationResult(usersSelected, algorithmSelected) {

    var selMusicGenres = [];
    var selArtists = [];
    var selDiets = [];
    var selFoods = [];
    var selDrinks = [];

    for (let i = 3; i <= 109; i++) {
        const headerName = headers[i];
        var prom = 0;
        var deviation = 0;
        var values = [];
        for (let k = 0; k < usersSelected.length; k++) {
            var userSelected = dataUsers[usersSelected[k].index];
            console.log('user selected:');
            console.log(userSelected);
            console.log('user selected value:');
            console.log(userSelected[i]);
            prom += parseInt(userSelected[i]);
            values.push(parseInt(userSelected[i]));
        }
        prom = parseFloat(prom / usersSelected.length);
        console.log('promedio: ' + prom);
        // de menor a mayor
        values.sort(function (a, b) { return a - b });
        var minValue = values[0];
        var maxValue = values[values.length-1];
        for (let k = 0; k < usersSelected.length; k++) {
            const userSelected = dataUsers[usersSelected[k].index];
            deviation += Math.pow(parseFloat(parseInt(userSelected[i]) - prom), 2);
        }
        deviation = parseFloat(Math.sqrt(deviation / (usersSelected.length - 1)));
        console.log('/// desviación estandar: ');
        console.log(deviation);
        console.log('/// Minimo:');
        console.log(minValue);
        console.log('/// Máximo:');
        console.log(maxValue);
        var realSatisfaction = parseFloat((prom) - ((deviation + ((maxValue - minValue) / 2)) / (usersSelected.length - 1)));
        var objItem = {
            name: headerName,
            satisfaction: realSatisfaction
        }
        if (i >= rangeMusicGenre[0] && i <= rangeMusicGenre[1]) {
            selMusicGenres.push(objItem);
        } else if (i >= rangeArtist[0] && i <= rangeArtist[1]) {
            selArtists.push(objItem);
        } else if (i >= rangeDiet[0] && i <= rangeDiet[1]) {
            selDiets.push(objItem);
        } else if (i >= rangeFood[0] && i <= rangeFood[1]) {
            selFoods.push(objItem);
        } else if (i >= rangeDrink[0] && i <= rangeDrink[1]) {
            selDrinks.push(objItem);
        }
    }
    selMusicGenres.sort(compare);
    selArtists.sort(compare);
    selDiets.sort(compare);
    selFoods.sort(compare);
    selDrinks.sort(compare);

    console.log('/// Generos Musicales: ');
    console.log(selMusicGenres);
    console.log('/// Artistas: ');
    console.log(selArtists);
    console.log('/// Dietas: ');
    console.log(selDiets);
    console.log('/// Comidas: ');
    console.log(selFoods);
    console.log('/// Bebidas: ');
    console.log(selDrinks);

    /*
    if (algorithmSelected == 'Maximum Pleasure') {
        calculateMP(usersSelected);
    } else if (algorithmSelected == 'Without Misery') {
        calculateWM(usersSelected);
    } else if (algorithmSelected == 'Minimal Misery') {
        calculateMM(usersSelected);
    }
    */
}

function compare(a, b) {
    const valueA = a.satisfaction;
    const valueB = b.satisfaction;
    let comparison = 0;
    if (valueA > valueB) {
        comparison = 1;
    } else if (valueA < valueB) {
        comparison = -1;
    }
    return comparison * -1;
}