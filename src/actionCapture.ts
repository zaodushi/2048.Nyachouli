import { gameAction } from "./actionHandle";

const keydownHandler = (event: KeyboardEvent) => {
    switch (event.code) {
        case "ArrowLeft":
            gameAction.left();
            break;
        case "ArrowUp":
            gameAction.up();
            break;
        case "ArrowRight":
            gameAction.right();
            break;
        case "ArrowDown":
            gameAction.down();
            break;
    }
}


const lastTouchStart = {
    x: 0,
    y: 0
}

function touchStartHandler(event: TouchEvent) {
    lastTouchStart.x = event.touches[0].clientX
    lastTouchStart.y = event.touches[0].clientY
}


function touchEndHandler(event: TouchEvent) {
    const dx = event.changedTouches[0].clientX - lastTouchStart.x
    const dy = event.changedTouches[0].clientY - lastTouchStart.y
    if (Math.abs(dx) > Math.abs(dy)) {
        if(Math.abs(dx) < 100)return;
        dx > 0 ? gameAction.right()
            : gameAction.left()
    }
    else {
        if(Math.abs(dy) < 100)return;
        dy > 0 ? gameAction.down()
            : gameAction.up()
    }
}

const addActionListener = () => {
    document.addEventListener('keydown',keydownHandler)
    document.addEventListener('touchstart',touchStartHandler)
    document.addEventListener('touchend',touchEndHandler)
}

export { addActionListener, gameAction }

