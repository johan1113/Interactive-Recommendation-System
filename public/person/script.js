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
        var selUser = document.querySelector('.user-selector');
        var userIndex;
        var userName;
        for (let index = 0; index < selUser.options.length; index++) {
            const opt = selUser.options[index];
            if (opt.selected == true && opt.innerHTML != 'Select an User') {
                userIndex = parseInt(opt.value);
                console.log('///// UserIndex: ' + userIndex);
                userName = opt.innerHTML;
                break;
            }
        }
        if (userName != null && userIndex != null) {
            generateRecommendationResult(userName, userIndex);
        } else {
            btn.style.animation = 'wiggle 700ms';
            setTimeout(function () { btn.style.animation = 'none'; }, 700);
        }
    });
}

function generateRecommendationResult(userName, userIndex) {
    const dataUser = dataUsers[userIndex];
    console.log('/// length data user: ' + dataUser.length);
    const dataMusicGenre = dataUser.slice(rangeMusicGenre[0], rangeMusicGenre[1]);
    const dataArtist = dataUser.slice(rangeArtist[0], rangeArtist[1]);
    const dataDiet = dataUser.slice(rangeDiet[0], rangeDiet[1]);
    const dataFood = dataUser.slice(rangeFood[0], rangeFood[1]);
    const dataDrink = dataUser.slice(rangeDrink[0], rangeDrink[1]);
    const valueExpected = 5;
    var selMusicGenres = [];
    var selArtists = [];
    var selDiets = [];
    var selFoods = [];
    var selDrinks = [];
    for (let index = 0; index < dataMusicGenre.length; index++) {
        const objMusicGenre = {
            name: headers[rangeMusicGenre[0] + index],
            value: parseInt(dataMusicGenre[index])
        }
        selMusicGenres.push(objMusicGenre);
    }
    for (let index = 0; index < dataArtist.length; index++) {
        const objArtist = {
            name: headers[rangeArtist[0] + index],
            value: parseInt(dataArtist[index])
        }
        selArtists.push(objArtist);
    }
    for (let index = 0; index < dataDiet.length; index++) {
        const objDiet = {
            name: headers[rangeDiet[0] + index],
            value: parseInt(dataDiet[index])
        }
        selDiets.push(objDiet);
    }
    for (let index = 0; index < dataFood.length; index++) {
        const objFood = {
            name: headers[rangeFood[0] + index],
            value: parseInt(dataFood[index])
        }
        selFoods.push(objFood);
    }
    for (let index = 0; index < dataDrink.length; index++) {
        const objDrink = {
            name: headers[rangeDrink[0] + index],
            value: parseInt(dataDrink[index])
        }
        selDrinks.push(objDrink);
    }
    selMusicGenres.sort(compare);
    selArtists.sort(compare);
    selDiets.sort(compare);
    selFoods.sort(compare);
    selDrinks.sort(compare);

    updatePersonUi(userName, selMusicGenres[0].name, selArtists[0].name, selFoods[0].name, selDrinks[0].name);
}

function compare(a, b) {
    const valueA = a.value;
    const valueB = b.value;
    let comparison = 0;
    if (valueA > valueB) {
        comparison = 1;
    } else if (valueA < valueB) {
        comparison = -1;
    }
    return comparison * -1;
}

function updatePersonUi(userName, musicGenre, artist, food, drink) {
    var container = document.querySelector('.config-container');
    var inner = '<p>The Ideal Festival designed for <span>' + userName + '</span> should be based on the musical genre <span>' + musicGenre + '</span>, including the artist <span>' + artist + '</span>, and in addition it would be recommended to include food as <span>' + food + '</span> and drinks like <span>' + drink + '</span>.</p>';
    container.innerHTML = inner;
    container.setAttribute('class', 'recommendation-container');
    document.querySelector('.button').remove();
    document.querySelector('.main-knn').innerHTML += '<a href="/1" class="button reverse">RE-INITIALIZE RECOMMENDATION</a>'
    // Run Visual Interaction
    init();

}

window.setInterval(onCanvasClick, 6000);

ccc.addEventListener("click", onCanvasClick);
var Configs = {
    backgroundColor: '#030722',
    particleNum: 700,
    step: 10,
    base: 6000,
    zInc: 0.00009
};

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

function init() {
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

    canvas.addEventListener('click', onCanvasClick, true);

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
