type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

const urlBar = document.querySelector(".RNNXgb") as HTMLElement; // only works on google.com

const gameContainer = document.createElement("div");
gameContainer.style.position = "fixed";
gameContainer.style.top = "0";
gameContainer.style.left = "0";
gameContainer.style.width = "100vw";
gameContainer.style.height = "100vh";
gameContainer.style.zIndex = "10"; 
gameContainer.style.overflow = "hidden";

document.body.appendChild(gameContainer);

// vars to keep track of the game state (it all relates to either player or window, don't question my naming conventions lmao)
const gameState = { 
    w: window.innerWidth,
    h: window.innerHeight,
    urlBarW: 350,
    urlBarH: 50,
    x: window.innerWidth / 2 - 175, 
    y: window.innerHeight / 2 - 25,
    direction: "RIGHT" as Direction,
    speed: 5
};

urlBar.style.position = "absolute";
urlBar.style.width = `${gameState.urlBarW}px`;
urlBar.style.height = `${gameState.urlBarH}px`;
urlBar.style.left = `${gameState.x}px`;
urlBar.style.top = `${gameState.y}px`;
urlBar.style.zIndex = "9999"; // stay on top mf
urlBar.blur();

gameContainer.appendChild(urlBar);

function changeXY(x: number, y: number) {
    const newX = gameState.x + x;
    const newY = gameState.y + y;
    
    // checks for boundaries (buggy asl)
    if (
        newX >= 0 && 
        newX + gameState.urlBarW <= gameState.w &&
        newY >= 0 && 
        newY + gameState.urlBarH <= gameState.h
    ) {
        gameState.x = newX;
        gameState.y = newY;
        
        urlBar.style.left = `${gameState.x}px`;
    }
}

function changeRotation(d: number) {
    urlBar.style.rotate = `${d}deg`;
}

window.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") gameState.direction = "UP";
    if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") gameState.direction = "DOWN";
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") gameState.direction = "LEFT"; 
    if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") gameState.direction = "RIGHT";
});

function gameLoop() {
    switch(gameState.direction) {
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
    requestAnimationFrame(gameLoop);    
}
gameLoop();
