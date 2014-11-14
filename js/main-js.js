/**
 * Created by Strahil on 11/13/14.
 */
'use strict';
var languages = ['Java', 'CSharp', 'Ruby', 'JavaScript', 'PHP', 'HTML', 'Python', 'Swift', 'SQL'];
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
var languageWidth = 77;
var languageHeight = 25;
var fontSize = 12;


function drawLanguage(left, top, languageName) {
    var myCanvas = document.getElementById("slot-machine");
    var ctx = myCanvas.getContext("2d");
    var fillColor = backgroundColors[languageName];
    var textColor = foregroundColors[languageName];
    ctx.fillStyle = fillColor;
    roundedRect(ctx, left, top, languageWidth, languageHeight, 5);
    ctx.font = fontSize + 'px ' + 'Arial';
    console.log('"' + fontSize + 'px ' + 'Arial' + '"');
    var textWidth = ctx.measureText(languageName).width;
    ctx.fillStyle = textColor;
    ctx.fillText(languageName, left + (languageWidth - textWidth) / 2, top + languageHeight - (languageHeight - fontSize) / 2);
}

function randomNumber(max) {
    var result = Math.random();
    result = Math.floor(result * max);
    return result;
}

function testLanguageDraws() {
    var top = 0;
    for (var i in languages) {
        drawLanguage(30, top, languages[i]);
        top += languageHeight + 10;
    }

}

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

function gameLoop() {
    var top = 400;
    var myCanvas = document.getElementById("slot-machine");
    var ctx = myCanvas.getContext("2d");

    function frame() {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
        top -= 10;
        drawRectangle(50, top, 50, 50);
    }

    var id = setInterval(frame, 10) // draw every 10ms
}

