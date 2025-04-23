type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

const coordinates = {
    x: 0,
    y: 0
}

const urlBar = document.querySelector('.RNNXgb') as HTMLElement;
let direction: Direction = "RIGHT";

urlBar.style.position = 'absolute';
urlBar.style.width = "350px";
urlBar.style.height = "50px";

function changeXY(x: number, y: number) {
    coordinates.x += x;
    coordinates.y += y;
}

function changeRotation(degrees: number) {
    urlBar.style.rotate = `${degrees}deg`;
}

window.addEventListener("keydown", event => {
    if (event.key === "ArrowUp") direction = "UP";
    if (event.key === "ArrowDown") direction = "DOWN";
    if (event.key === "ArrowLeft") direction = "LEFT"; 
    if (event.key === "ArrowRight") direction = "RIGHT";
});

function gameLoop() {
    if (direction === "RIGHT") {
        changeXY(5, 0);
        changeRotation(0);
    }
    if (direction === "LEFT") {
        changeXY(-5, 0);
        changeRotation(0);
    }
    if (direction === "UP") {
        changeXY(0, -5);
        changeRotation(90);
    }
    if (direction === "DOWN") {
        changeXY(0, 5);
        changeRotation(-90);
    }

    urlBar.style.left = `${coordinates.x}px`;
    urlBar.style.top = `${coordinates.y}px`;

    requestAnimationFrame(gameLoop);
}    

gameLoop();
