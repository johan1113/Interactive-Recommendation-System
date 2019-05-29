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
        var usersSelected = [];
        for (let index = 0; index < dataUsers.length; index++) {
            const user = dataUsers[index];
            const objUser = {
                name: user[1],
                index: index
            }
            usersSelected.push(objUser);
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
        var maxValue = values[values.length - 1];
        for (let k = 0; k < usersSelected.length; k++) {
            const userSelected = dataUsers[usersSelected[k].index];
            deviation += Math.pow(parseFloat(parseInt(userSelected[i]) - prom), 2);
        }
        deviation = parseFloat(Math.sqrt(deviation / (usersSelected.length)));
        console.log('/// desviación estandar: ');
        console.log(deviation);
        console.log('/// Minimo:');
        console.log(minValue);
        console.log('/// Máximo:');
        console.log(maxValue);
        var realSatisfaction = parseFloat((prom) - ((deviation + ((maxValue - minValue) / 2)) / (usersSelected.length)));
        var objItem = {
            name: headerName,
            satisfaction: realSatisfaction,
            deviation: deviation,
            prom: prom
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

    var selMGF;
    var selAS;
    var selFS;
    var selDF;

    if (algorithmSelected == 'Maximum Pleasure') {
        selMGF = selMusicGenres.filter(function (obj) {
            if (obj.satisfaction <= 5 && obj.satisfaction >= 3.5) {
                return obj;
            }
        });
        selAS = selArtists.filter(function (obj) {
            if (obj.satisfaction <= 5 && obj.satisfaction >= 3.5) {
                return obj;
            }
        });
        selFS = selFoods.filter(function (obj) {
            if (obj.satisfaction <= 5 && obj.satisfaction >= 3.5) {
                return obj;
            }
        });
        selDF = selDrinks.filter(function (obj) {
            if (obj.satisfaction <= 5 && obj.satisfaction >= 3.5) {
                return obj;
            }
        });
        console.log('************ Maximum Pleasure *************');
    } else if (algorithmSelected == 'Without Misery') {
        selMGF = selMusicGenres.filter(function (obj) {
            if (obj.satisfaction < 3.5 && obj.satisfaction > 2.5) {
                return obj;
            }
        });
        selAS = selArtists.filter(function (obj) {
            if (obj.satisfaction < 3.5 && obj.satisfaction > 2.5) {
                return obj;
            }
        });
        selFS = selFoods.filter(function (obj) {
            if (obj.satisfaction < 3.5 && obj.satisfaction > 2.5) {
                return obj;
            }
        });
        selDF = selDrinks.filter(function (obj) {
            if (obj.satisfaction < 3.5 && obj.satisfaction > 2.5) {
                return obj;
            }
        });
        console.log('************ Without Misery *************');
    } else if (algorithmSelected == 'Minimal Misery') {
        selMGF = selMusicGenres.filter(function (obj) {
            if (obj.satisfaction <= 2.5 && obj.satisfaction >= 1) {
                return obj;
            }
        });
        selAS = selArtists.filter(function (obj) {
            if (obj.satisfaction <= 2.5 && obj.satisfaction >= 1) {
                return obj;
            }
        });
        selFS = selFoods.filter(function (obj) {
            if (obj.satisfaction <= 2.5 && obj.satisfaction >= 1) {
                return obj;
            }
        });
        selDF = selDrinks.filter(function (obj) {
            if (obj.satisfaction <= 2.5 && obj.satisfaction >= 1) {
                return obj;
            }
        });
        console.log('************ Minimal Misery *************');
    }
    console.log('/// Generos Musicales: ');
    console.log(selMGF);
    console.log('/// Artistas: ');
    console.log(selAS);
    console.log('/// Comidas: ');
    console.log(selFS);
    console.log('/// Bebidas: ');
    console.log(selDF);
    // Run Visual Interaction
    init(selMGF[0], selAS[0], selFS[0], selDF[0]);
    updateUi(usersSelected, algorithmSelected, selMGF[0], selAS[0], selFS[0], selDF[0]);
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

function updateUi(usersSelected, algorithmSelected, selMGF, selAS, selFS, selDF) {
    var container = document.querySelector('.config-container');
    var inner = '<ul>';
    for (let index = 0; index < usersSelected.length; index++) {
        inner += '<li>' + usersSelected[index].name + '</li>';
    }
    inner += '</ul>';
    inner += '<p>According to the Algorithm <span>' + algorithmSelected + '</span>, The Ideal Festival designed for all the users ';
    if (selMGF != null) {
        inner += 'should be based on the musical genre <span>' + selMGF.name + '</span>, ';
    } else {
        inner += 'should be based on <span>none musical genre in special</span>, ';
    }
    if (selAS != null) {
        inner += 'including the artist <span>' + selAS.name + '</span>, ';
    } else {
        inner += 'including <span>none artist in special</span>, ';
    }
    if (selFS != null) {
        inner += 'and in addition it would be recommended to include food as <span>' + selFS.name + '</span> ';
    } else {
        inner += 'and in addition it would be recommended to include <span>none kind of food in special</span>, ';
    }
    if (selDF != null) {
        inner += 'and drinks like <span>' + selDF.name + '</span>.</p>';
    } else {
        inner += 'and <span>none kind of drinks in special</span>.</p>';
    }
    container.innerHTML = inner;
    container.setAttribute('class', 'recommendation-container');
    document.querySelector('.button').remove();
    document.querySelector('.main-all').innerHTML += '<a href="/4" class="button reverse">RE-INITIALIZE RECOMMENDATION</a>'

}

window.setInterval(onCanvasClick, 6000);

var Configs;
// Vars
var fadeTime = 2000; // in ms
var fadeTimeStart;

var canvas;
var context;
var screenWidth;
var screenHeight;
var centerX;
var centerY;
var particles = [];
var hueBase = 0;
var simplexNoise;
var zoff = 0;
var gui;
var can2;
var ctx2;

// Initialize

function init(selMGF, selAS, selFS, selDF) {

    console.log('********** entrooooo a init');
    console.log(selMGF);
    console.log('/// Artistas: ');
    console.log(selAS);
    console.log('/// Comidas: ');
    console.log(selFS);
    console.log('/// Bebidas: ');
    console.log(selDF);

    var freq = 0;
    var pDev = 0;
    var pProm = 0;
    var pSatis = 0;

    if (selMGF != null) {
        freq++;
        pSatis += parseFloat(selMGF.satisfaction);
        pProm += parseFloat(selMGF.prom);
        pDev += parseFloat(selMGF.deviation);
    }
    if (selAS != null) {
        freq++;
        pSatis += parseFloat(selAS.satisfaction);
        pProm += parseFloat(selAS.prom);
        pDev += parseFloat(selAS.deviation);
    }
    if (selFS != null) {
        freq++;
        pSatis += parseFloat(selFS.satisfaction);
        pProm += parseFloat(selFS.prom);
        pDev += parseFloat(selFS.deviation);
    }
    if (selMGF != null) {
        freq++;
        pSatis += parseFloat(selDF.satisfaction);
        pProm += parseFloat(selDF.prom);
        pDev += parseFloat(selDF.deviation);
    }

    pDev = parseFloat(pDev / freq);
    pProm = parseFloat(pProm / freq);
    pSatis = parseFloat(pSatis / freq);

    console.log('////////// ESTADISTICAS  /////////////');
    console.log('freq: ' + freq);
    console.log('pDev: ' + pDev);
    console.log('pProm: ' + pProm);
    console.log('pSatis: ' + pSatis);

    Configs = {
        backgroundColor: '#030722',
        particleNum: parseInt(freq * 200),
        step: parseInt(pProm * 5),
        base: parseInt(pSatis * 2000),
        zInc: parseFloat(pDev / 1000)
    };

    /*
Configs = {
    backgroundColor: '#030722',
    particleNum: 700,
    step: 10,
    base: 6000,
    zInc: 0.00009
};
*/
    canvas = document.getElementById('ccc');
    can2 = document.createElement("canvas");
    ctx = can2.getContext("2d");
    ctx2 = canvas.getContext("2d");
    window.addEventListener('resize', onWindowResize, false);
    onWindowResize(null);

    for (var i = 0, len = Configs.particleNum; i < len; i++) {
        initParticle((particles[i] = new Particle()));
    }

    simplexNoise = new SimplexNoise();

    /*
    gui = new dat.GUI();
    gui.add(Configs, 'step', 1, 5);
    gui.add(Configs, 'base', 1500, 4000);
    gui.add(Configs, 'zInc', 0.001, 0.01);
    gui.close();
    */


    requestAnimationFrame(update);
    ctx.lineWidth = 0.7;
    ctx.lineCap = ctx.lineJoin = 'round';
    ctx.fillStyle = Configs.backgroundColor;
    ctx.fillRect(0, 0, screenWidth, screenHeight);

}


// Event listeners

function onWindowResize(e) {
    can2.width = screenWidth = canvas.width = window.innerWidth;
    can2.height = screenHeight = canvas.height = window.innerHeight;
    centerX = screenWidth / 10;
    centerY = screenHeight / 10;
}

function onCanvasClick(e) {
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = Configs.backgroundColor;
    ctx.fillRect(0, 0, screenWidth, screenHeight);

    simplexNoise = new SimplexNoise();
    fadeTimeStart = undefined;
}

// Functions

function getNoise(x, y, z) {
    var octaves = 2,
        fallout = 0.5,
        amp = 1, f = 1, sum = 1,
        i;

    for (i = 0; i < octaves; ++i) {
        amp *= fallout;
        sum += amp * (simplexNoise.noise3D(x * f, y * f, z * f) + 1) * 4.4;
        f *= 3;
    }

    return sum;
}

function initParticle(p) {
    p.x = p.pastX = screenWidth * Math.random();
    p.y = p.pastY = screenHeight * Math.random();
    p.color.h = hueBase + Math.atan2(centerY - p.y, centerX - p.x) * 200 / Math.PI;
    p.color.s = 1;
    p.color.l = 0.6;
    p.color.a = 0;
}


// Update

function update(time) {
    var step = Configs.step;
    var base = Configs.base;
    var i, p, angle;

    for (i = 0; i < particles.length; i++) {
        p = particles[i];

        p.pastX = p.x;
        p.pastY = p.y;

        angle = Math.PI * 6 * getNoise(p.x / base * 1.75, p.y / base * 1.75, zoff);
        p.x += Math.cos(angle) * step;
        p.y += Math.sin(angle) * step;

        if (p.color.a < 1) p.color.a += 0.001;

        ctx.beginPath();
        ctx.strokeStyle = p.color.toString();
        ctx.moveTo(p.pastX, p.pastY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        if (p.x < 0 || p.x > screenWidth || p.y < 0 || p.y > screenHeight) {
            initParticle(p);
        }
    }

    hueBase += 0.4;
    zoff += Configs.zInc;

    // Code to fade in the view
    if (fadeTimeStart === undefined) {
        fadeTimeStart = time;
    }
    var fTime = (time - fadeTimeStart) / fadeTime;
    if (fTime < 1) {
        ctx2.globalAlpha = fTime;
        ctx2.clearRect(0, 0, canvas.width, canvas.height);
        ctx2.drawImage(can2, 0, 0);
    } else {
        ctx2.globalAlpha = 1;
        ctx2.drawImage(can2, 0, 0);
    }

    requestAnimationFrame(update);
}


/**
 * HSLA
 */
function HSLA(h, s, l, a) {
    this.h = h || 0;
    this.s = s || 0;
    this.l = l || 0;
    this.a = a || 0;
}

HSLA.prototype.toString = function () {
    return 'hsla(' + this.h + ',' + (this.s * 100) + '%,' + (this.l * 100) + '%,' + this.a + ')';
}

/**
 * Particle
 */
function Particle(x, y, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.color = color || new HSLA();
    this.pastX = this.x;
    this.pastY = this.y;
}
