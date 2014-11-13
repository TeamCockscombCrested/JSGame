/**
 * Created by Strahil on 11/13/14.
 */

function drawRectangle(left, top, width, height) {
    //Get the context:
    var myCanvas = document.getElementById("slot-machine");
    var ctx = myCanvas.getContext("2d");

    //Draw the rectangle:
    ctx.fillStyle = "rgb(240,217,90)";
    ctx.fillRect(left, top, width, height);
}

function gameLoop() {
    var top = 400;

    function frame() {
        top -= 10;
        drawRectangle(50, top, 50, 50);
    }

    var id = setInterval(frame, 10) // draw every 10ms
}