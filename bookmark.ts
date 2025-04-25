type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

const coordinates = {
    x: 0,
    y: 0
}

const urlBar = document.querySelector(".RNNXgb") as HTMLElement;
let direction: Direction = "RIGHT";

urlBar.style.position = "absolute";
urlBar.style.width = "350px";
urlBar.style.height = "50px";
urlBar.blur() // unfocuses the URL bar so that you won't accidentally type in the search bar when playing the game

function changeXY(x: number, y: number) {
    coordinates.x += x;
    coordinates.y += y;
}

function changeRotation(degrees: number) {
    urlBar.style.rotate = `${degrees}deg`;
}

window.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") direction = "UP";
    if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") direction = "DOWN";
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") direction = "LEFT"; 
    if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") direction = "RIGHT";
});

function gameLoop() {
    switch(direction) {
        case "RIGHT":
            changeXY(5, 0);
            changeRotation(0);  
            break;  
        case "LEFT":
            changeXY(-5, 0);
            changeRotation(0);
            break;
        case "UP":
            changeXY(0, -5);
            changeRotation(90);
            break;
        case "DOWN":
            changeXY(0, 5);
            changeRotation(-90);
            break;
        default:
            break;
    }

    // using CSS, we set the absolute position of the search bar to the "coordinates" we get by moving the search bar
    urlBar.style.left = `${coordinates.x}px`;
    urlBar.style.top = `${coordinates.y}px`;

    requestAnimationFrame(gameLoop);
}    

gameLoop();
