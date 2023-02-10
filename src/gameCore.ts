import { Position, GameBlock } from "./types";

const gameInit = () => {
    let ret = new Array(4);
    for (let row = 0; row < 4; row++) {
        ret[row] = new Array(4)
        for (let col = 0; col < 4; col++) {
            ret[row][col] = new GameBlock(row, col)
        }
    }
    return ret as GameBlock[][];
}

let gameBlocks: GameBlock[][];

const gameInfo = {
    deBounce: false,
    restartCount: 0,
    win: false,
    lost: false
}
const scoreElement = document.getElementById('score') as HTMLElement

const startGame = () => {
    gameBlocks = gameInit()
    gameInfo.win = gameInfo.lost = false
    if (gameInfo.restartCount++ > 0) {
        nextTick()
        nextTick()
    }
    else {
        setTimeout(() => {
            nextTick()
            nextTick()
        }, 1000);
    }
}

//get a random ingerger from [left, right]
const rangeRand = (left: number, right: number) => {
    return parseInt((Math.random() * (right - left + 1)).toString())
}

const genBlock = (emptyBlocks: Position[]) => {
    const r = rangeRand(0, emptyBlocks.length - 1)
    let { row, col } = emptyBlocks[r];
    gameBlocks[row][col].modify(2)
}

const nextTick = () => {
    gameInfo.deBounce = true;
    let score = -4
    let emptyBlocks: Position[] = [];
    for (const row in gameBlocks) {
        for (const col in gameBlocks[row]) {
            const val = gameBlocks[row][col].val
            score += val
            if (val === 2048) {
                if (gameInfo.win === false) {
                    alert("Congratulations! You win!")
                    gameInfo.win = true
                }
            }
            if (val === 0) {
                emptyBlocks.push({
                    row: parseInt(row),
                    col: parseInt(col)
                })
            }
        }
    }

    scoreElement.innerHTML = Math.max(score, 0).toString()

    if (emptyBlocks.length === 0) {
        // alert("You lost!")
    }
    else {
        genBlock(emptyBlocks)
    }
    setTimeout(() => {
        gameInfo.deBounce = false;
    }, 200);
}

const mountRestartButton = () => {
    const buttonRestart = document.getElementById("restart") as HTMLElement
    buttonRestart.addEventListener('click', startGame)
}

//#region debug
// const debug = () => {
//     gameBlocks = gameInit()
//     gameBlocks[0][0].modify(2)
//     gameBlocks[0][1].modify(4)
//     gameBlocks[0][2].modify(8)
//     gameBlocks[0][3].modify(16)
//     gameBlocks[1][3].modify(32)
//     gameBlocks[1][2].modify(64)
//     gameBlocks[1][1].modify(128)
//     gameBlocks[1][0].modify(256)
//     gameBlocks[2][0].modify(512)
//     gameBlocks[2][1].modify(1024)
//     gameBlocks[2][2].modify(2048)
//     gameBlocks[2][3].modify(4096)
//     gameBlocks[3][3].modify(8192)
//     gameBlocks[3][2].modify(16384)
//     gameBlocks[3][1].modify(32768)
// }
//#endregion
export { startGame, gameBlocks, gameInfo, nextTick, mountRestartButton }
