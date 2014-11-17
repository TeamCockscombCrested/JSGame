/**
 * Created by Strahil on 11/13/14.
 */
'use strict';
//an array holding the results of each rotation of the slot machine:
var results = [];
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
//A dictionary holding the text colors of each lang element to be drawn:
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
var canvasWidth = 100;
var languageMargin = 15;
var topSeparatorPlace = (canvasHeight / 2) - (languageHeight / 2) - (languageMargin / 2);
var bottomSeparatorPlace = (canvasHeight / 2) + (languageHeight / 2) + (languageMargin / 2);

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
    for (var i = 0; i < languages.length; i++) {
        var newLanguage = new Language(languages[i], startTop);
        langs.push(newLanguage);
        startTop += languageHeight + languageMargin;
    }
    return langs;
};

//we create one array of Languages for all three sections of the slot machine:
var section1 = new Languages();
var section2 = new Languages();
var section3 = new Languages();

//This function is to do the initial draw of the languages in the slot machine.
//It is called when the page finishes loading by a script located in the end of <body>
function initializeSlotMachine() {
    //init first canvas / section:
    var section1Canvas = document.getElementById("section1");
    var ctx1 = section1Canvas.getContext("2d");
    for (var i in section1) {
        drawLanguage(ctx1, 10, section1[i].Top, section1[i].Name);
    }


    //init second canvas / section:
    var section2Canvas = document.getElementById("section2");
    var ctx2 = section2Canvas.getContext("2d");
    for (var j in section2) {
        drawLanguage(ctx2, 10, section2[j].Top, section2[j].Name);
    }


    //init third canvas / section:
    var section3Canvas = document.getElementById("section3");
    var ctx3 = section3Canvas.getContext("2d");
    for (var k in section3) {
        drawLanguage(ctx3, 10, section3[k].Top, section3[k].Name);
    }

    drawSeparators(ctx1);
    drawSeparators(ctx2);
    drawSeparators(ctx3);

}

//this is the main function. It is called when the player press Start button
//It manages the whole animation of the three sections of the slot machine
//the 'frame' function is a nested function that is called at every animation interval. It does the actual drawing
//of languages
function spinSlotMachine() {
    var slot1TimeLimit = randomNumber(2);
    var slot1CurrentTime = 0;
    var slot2TimeLimit = slot1TimeLimit + randomNumber(2);
    var slot2CurrentTime = 0;
    var slot3TimeLimit = slot2TimeLimit + randomNumber(2);
    var slot3CurrentTime = 0;

    console.log(slot1TimeLimit + '/' + slot2TimeLimit + '/' + slot3TimeLimit);

    var section1Canvas = document.getElementById("section1");
    var ctx1 = section1Canvas.getContext("2d");

    var section2Canvas = document.getElementById("section2");
    var ctx2 = section2Canvas.getContext("2d");

    var section3Canvas = document.getElementById("section3");
    var ctx3 = section3Canvas.getContext("2d");

    function frame() {
        drawSeparators(ctx1);
        drawSeparators(ctx2);
        drawSeparators(ctx3);

        slot1CurrentTime += 0.01;
        slot2CurrentTime += 0.01;
        slot3CurrentTime += 0.01;

        if (slot3CurrentTime >= slot3TimeLimit) {
            clearInterval(id);
            getTheResults();
            displayResults();
        } else {
            if (slot1CurrentTime < slot1TimeLimit) {
                ctx1.clearRect(0, 0, section1Canvas.width, section1Canvas.height);
                for (var j = 0; j < section1.length; j++) {
                    if (section1[j].Bottom() > 0) {
                        drawLanguage(ctx1, 10, section1[j].Top, section1[j].Name);
                        section1[j].Top -= (languageMargin + languageHeight);
                    } else {
                        section1[j].Top = ((section1.length - 2) * (languageHeight + languageMargin)) - languageMargin;
                        //section1[j].Top = canvasHeight - languageMargin;
                    }
                }
            }

            if (slot2CurrentTime < slot2TimeLimit) {
                ctx2.clearRect(0, 0, section2Canvas.width, section2Canvas.height);
                for (var j = 0; j < section2.length; j++) {
                    if (section2[j].Bottom() > 0) {
                        drawLanguage(ctx2, 10, section2[j].Top, section2[j].Name);
                        section2[j].Top -= (languageMargin + languageHeight);
                    } else {
                        section2[j].Top = ((section2.length - 2) * (languageHeight + languageMargin)) - languageMargin;
                        //section2[j].Top = canvasHeight - languageMargin;
                    }
                }
            }

            ctx3.clearRect(0, 0, section3Canvas.width, section3Canvas.height);
            for (var j = 0; j < section3.length; j++) {
                if (section3[j].Bottom() > 0) {
                    drawLanguage(ctx3, 10, section3[j].Top, section3[j].Name);
                    section3[j].Top -= (languageMargin + languageHeight);
                } else {
                    section3[j].Top = ((section3.length - 2) * (languageHeight + languageMargin)) - languageMargin;
                    //section3[j].Top = canvasHeight - languageMargin;
                }
            }
        }
    }

    var id = setInterval(frame, 10) // draw every 10ms
}

//A utility function to draw the red lines in the middle of the slot machine:
function drawSeparators(context) {
    context.strokeStyle = 'red';
    context.moveTo(0, topSeparatorPlace);
    context.lineTo(canvasWidth, topSeparatorPlace);
    context.moveTo(0, bottomSeparatorPlace);
    context.lineTo(canvasWidth, bottomSeparatorPlace);
    context.stroke();
}

//A utility function that finds the languages that are in the middle after each roll
//of the slot machine:
function getTheResults() {
    for (var i in section1) {
        //console.log(section1[i].Name + ': ' + section1[i].Top + ' / ' + section1[i].Bottom());
        if (section1[i].Top + languageHeight + languageMargin < (canvasHeight / 2) && section1[i].Bottom() + languageHeight + languageMargin > (canvasHeight / 2)) {
            results[0] = section1[i].Name;
            //console.log('Hit= ' + section1[i].Name);
        }
    }
    for (var i in section2) {
        if (section2[i].Top + languageHeight + languageMargin < (canvasHeight / 2) && section2[i].Bottom() + languageHeight + languageMargin > (canvasHeight / 2)) {
            results[1] = section2[i].Name;
        }
    }
    for (var i in section3) {
        if (section3[i].Top + languageHeight + languageMargin < (canvasHeight / 2) && section3[i].Bottom() + languageHeight + languageMargin > (canvasHeight / 2)) {
            results[2] = section3[i].Name;
        }
    }
}

//A utility function that display the results of each roll of the slot machine:
function displayResults() {
    var startButton = document.getElementById('start-button');
    var resultsElement = document.getElementById('score');
    var output = parseInt(resultsElement.value);
    var selectedLang = document.getElementById('langs').value;

    if (results[0] == results[1] == results[2])
    {
        if(selectedLang == results[0])
        {
            output *= output;
        }
        else
        {
            output += 10;
        }
    }
        else if (results[0] == results[1] || results[0] == results[2])
        {
            if(selectedLang == results[0])
            {
                output += 15;
            }
            else
            {
                output += 5;
            }
        } else if (results[1] == results[2])
            {
                if(selectedLang == results[1])
                {
                    output += 15;
                }
                else
                {
                    output += 5;
                }
            }
                else
                {
                    if (output > 1)
                    {
                        output -= 1;
                    }
                    else
                    {
                        output -= 1;
                        // ако резултата на играча е 0, не може да играе
                        startButton.disabled = true;
                    }
                }

    resultsElement.value = output;
    document.cookie="unsaved=" + output +"; path=/";
}

//this is the function that is called every time the game needs to draw a language at a specific place in the slot machine
function drawLanguage(context, left, top, languageName) {
    var fillColor = backgroundColors[languageName];
    var textColor = foregroundColors[languageName];
    context.fillStyle = fillColor;
    roundedRect(context, left, top, languageWidth, languageHeight, 5);
    context.font = fontSize + 'px ' + 'Arial';
    var textWidth = context.measureText(languageName).width;
    context.fillStyle = textColor;
    context.fillText(languageName, left + (languageWidth - textWidth) / 2, top + languageHeight - (languageHeight - fontSize) / 2);
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

