/**
 * Created by Strahil on 11/13/14.
 */
//'use strict';
//an array holding the names of the langs:
var languages = ['Java', 'CSharp', 'Ruby', 'JavaScript', 'PHP', 'HTML', 'Python', 'Swift', 'SQL'];
//a dictionary holding the background colors of each lang element to be drawn:
var backgroundColors = {
    Java: 'RGB(81,116,143)',
    CSharp: 'RGB(158,120,216)',
    Ruby: 'RGB(215,25,24)',
    JavaScript: 'RGB(240,218,92)',
    PHP: 'RGB(98,131,186)',
    HTML: 'RGB(242,102,53)',
    Python: 'RGB(0,0,0)',
    Swift: 'RGB(252,73,55)',
    SQL: 'RGB(109,162,160)'
};
//a dictionary holding the text colors of each lang element to be drawn:
var foregroundColors = {
    Java: 'RGB(244,244,244)',
    CSharp: 'RGB(244,244,244)',
    Ruby: 'RGB(244,244,244)',
    JavaScript: 'RGB(51,51,51)',
    PHP: 'RGB(254,254,254)',
    HTML: 'RGB(244,244,244)',
    Python: 'RGB(254,254,254)',
    Swift: 'RGB(254,254, 254)',
    SQL: 'RGB(254,254, 254)'
};
//some constants, like the width and height of the lang elements, font size of the lang elements, size of the canvas:
var languageWidth = 77;
var languageHeight = 35;
var fontSize = 12;
var canvasHeight = 200;
var languageMargin = 15;

//an Object we will use during the animation. It holds the info needed for drawing - name of the lang and its location (top)
var Language = function (name, top) {
    this.Name = name;
    this.Top = top;
    this.Bottom = function () {
        return this.Top + languageHeight;
    }
};
//An Object with a constructor that initializes and returns an array full with Language objects,
// ready to be drawn on the canvas
var Languages = function () {
    var startTop = -languageMargin;
    var langs = [];
    languages = shuffleArray(languages); // randomize languages
    for (var i = 0; i < languages.length; i++) {
        var newLanguage = new Language(languages[i], startTop);
        langs.push(newLanguage);
        startTop += languageHeight + languageMargin;
    }
    return langs;
};

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//we create one array of Languages for all three sections of the slot machine:
var section1 = new Languages();
var section2 = new Languages();
var section3 = new Languages();
var section4 = new Languages();

function LoadGame()
{
    for (var i=1; i<=4; i++)
    {
        initializeSlotMachine(i);
    }
}

//This function is to do the initial draw of the languages in the slot machine.
//It is called when the page finishes loading by a script located in the end of <body>
function initializeSlotMachine (rowNum) {
    var myCanvas = document.getElementById("slot-machine"+rowNum);
    var ctx = myCanvas.getContext("2d");

    switch(rowNum)
    {
        case 1:
            var section = section1;
            break;
        case 2:
            var section = section2;
            break;
        case 3:
            var section = section3;
            break;
        case 4:
            var section = section4;
            break;
    }

    for (var i in section) {
        drawLanguage(10, section[i].Top, section[i].Name, rowNum);
        //console.log(section1[i].Top);
    }
}

//this is the main function. It is called when the player press Start button
//It manages the whole animation of the three sections of the slot machine
//the 'frame' function is a nested function that is called at every animation interval. It does the actual drawing
//of languages
function spinSlotMachine () {

        var slot1TimeLimit = randomNumber(2);
        var slot1CurrentTime = 0;
        var myCanvas1 = document.getElementById("slot-machine1");
        var myCanvas2 = document.getElementById("slot-machine2");
        var myCanvas3 = document.getElementById("slot-machine3");
        var myCanvas4 = document.getElementById("slot-machine4");
        var ctx1 = myCanvas1.getContext("2d");
        var ctx2 = myCanvas2.getContext("2d");
        var ctx3 = myCanvas3.getContext("2d");
        var ctx4 = myCanvas4.getContext("2d");

        function frame() {
            slot1CurrentTime += 0.01;
            if (slot1CurrentTime >= slot1TimeLimit) {
                clearInterval(id);
            } else {
                ctx1.clearRect(0, 0, myCanvas1.width, myCanvas1.height);
                ctx2.clearRect(0, 0, myCanvas2.width, myCanvas2.height);
                ctx3.clearRect(0, 0, myCanvas3.width, myCanvas3.height);
                ctx4.clearRect(0, 0, myCanvas4.width, myCanvas4.height);

                for (var i in section1) {
                    if (section1[i].Bottom() >= 0) {
                        drawLanguage(10, section1[i].Top, section1[i].Name, 1);
                        drawLanguage(10, section2[i].Top, section2[i].Name, 2);
                        drawLanguage(10, section3[i].Top, section3[i].Name, 3);
                        drawLanguage(10, section4[i].Top, section4[i].Name, 4);
                        section1[i].Top -= (languageMargin + languageHeight);
                        section2[i].Top -= (languageMargin + languageHeight);
                        section3[i].Top -= (languageMargin + languageHeight);
                        section4[i].Top -= (languageMargin + languageHeight);
                        //console.log(section1[i].Name + ': ' + section1[i].Top);
                    } else {
                        section1[i].Top = canvasHeight - languageMargin;
                        section2[i].Top = canvasHeight - languageMargin;
                        section3[i].Top = canvasHeight - languageMargin;
                        section4[i].Top = canvasHeight - languageMargin;
                        //console.log('To back - ' + section1[i].Name + ': ' + section1[i].Top);
                    }
                }
            }
        }

        var id = setInterval(frame, 10) // draw every 10ms

   // }

}

//this is the function that is called every time the game needs to draw a language at a specific place in the slot machine
function drawLanguage(left, top, languageName, rowNum) {
    var myCanvas = document.getElementById("slot-machine"+rowNum);
    var ctx = myCanvas.getContext("2d");
    var fillColor = backgroundColors[languageName];
    var textColor = foregroundColors[languageName];
    ctx.fillStyle = fillColor;
    roundedRect(ctx, left, top, languageWidth, languageHeight, 5);
    ctx.font = fontSize + 'px ' + 'Arial';
    var textWidth = ctx.measureText(languageName).width;
    ctx.fillStyle = textColor;
    ctx.fillText(languageName, left + (languageWidth - textWidth) / 2, top + languageHeight - (languageHeight - fontSize) / 2);
}

//this is function is us to generate a random number between 0 and max. This number
//is the used as the time the slot machine rotates
function randomNumber(max) {
    var result = Math.random();
    result = result * max;
    return result;
}

//this is a utility function used to draw a rounded rectangle by the drawLanguage function
function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
    ctx.fill();
}