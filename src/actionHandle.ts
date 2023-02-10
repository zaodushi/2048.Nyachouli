import { gameBlocks, gameInfo, nextTick } from "./gameCore"

const gameAction = {
    up: () => {
        if (gameInfo.deBounce) return
        let flagPositionChange = false
        const merge = (row: number, col: number) => {
            const block = gameBlocks[row][col]
            block.merged = false
            if (block.val === 0) return;
            for (let nxtIndex = row - 1; nxtIndex >= 0; nxtIndex--) {
                const nxtBlock = gameBlocks[nxtIndex][col]
                if (nxtBlock.val === 0) continue;
                if (block.val === nxtBlock.val && !nxtBlock.merged) {
                    nxtBlock.modify(nxtBlock.val * 2, "bounceIn")
                    nxtBlock.merged = true
                    block.val = 0;
                    flagPositionChange = true
                }
                else {
                    return;
                }
            }
        }
    
        const shift = (row: number, col: number) => {
            const block = gameBlocks[row][col]
            let targetIndex = -1;
            if (block.val === 0) return
            for (let frontIndex = row - 1; frontIndex >= 0; frontIndex--) {
                const frontVal = gameBlocks[frontIndex][col].val
                if (frontVal === 0) {
                    targetIndex = frontIndex;
                }
                else break
            }
    
            if (targetIndex != -1) {
                const targetBlock = gameBlocks[targetIndex][col]
                targetBlock.modify(block.val, "slideInUp")
                block.val = 0
                flagPositionChange = true
            }
        }
    
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 4; row++) {
                merge(row, col)
                shift(row, col)
            }
        }
    
        if(flagPositionChange)nextTick()
    },
    down: () => {
        if (gameInfo.deBounce) return
        let flagPositionChange = false
        const merge = (row: number, col: number) => {
            const block = gameBlocks[row][col]
            block.merged = false
            if (block.val === 0) return;
            for (let nxtIndex = row + 1; nxtIndex < 4; nxtIndex++) {
                const nxtBlock = gameBlocks[nxtIndex][col]
                if (nxtBlock.val === 0) continue;
                if (block.val === nxtBlock.val && !nxtBlock.merged) {
                    nxtBlock.modify(nxtBlock.val * 2, "bounceIn")
                    nxtBlock.merged = true
                    block.val = 0;
                    flagPositionChange = true
                }
                else {
                    return;
                }
            }
        }
    
        const shift = (row: number, col: number) => {
            const block = gameBlocks[row][col]
            let targetIndex = -1;
            if (block.val === 0) return
            for (let frontIndex = row + 1; frontIndex < 4; frontIndex++) {
                const frontVal = gameBlocks[frontIndex][col].val
                if (frontVal === 0) {
                    targetIndex = frontIndex;
                }
                else break
            }
    
            if (targetIndex != -1) {
                const targetBlock = gameBlocks[targetIndex][col]
                targetBlock.modify(block.val, "slideInDown")
                block.val = 0
                flagPositionChange = true
            }
        }
    
        for (let col = 0; col < 4; col++) {
            for (let row = 3; row >= 0; row--) {
                merge(row, col)
                shift(row, col)
            }
        }
    
        if(flagPositionChange)nextTick()
    },
    left: () => {
        if (gameInfo.deBounce) return
        let flagPositionChange = false
    
        const merge = (row: number, col: number) => {
            const block = gameBlocks[row][col]
            block.merged = false;
            if (block.val === 0) return
    
            for (let nxtIndex = col - 1; nxtIndex >= 0; nxtIndex--) {
                const nxtBlock = gameBlocks[row][nxtIndex]
    
                if (nxtBlock.val === 0) continue;
                if (block.val === nxtBlock.val && !nxtBlock.merged) {
                    nxtBlock.modify(nxtBlock.val * 2, "bounceIn")
                    nxtBlock.merged = true;
                    block.val = 0
                    flagPositionChange = true
                }
                else {
                    return;
                }
            }
        }
    
        const shift = (row: number, col: number) => {
            const block = gameBlocks[row][col]
            let targetIndex = -1;
    
            if (block.val === 0) return
            for (let frontIndex = col - 1; frontIndex >= 0; frontIndex--) {
                const frontVal = gameBlocks[row][frontIndex].val
                if (frontVal === 0) {
                    targetIndex = frontIndex;
                }
                else break
            }
    
            if (targetIndex != -1) {
                const targetBlock = gameBlocks[row][targetIndex]
                targetBlock.modify(block.val, "slideInRight")
                block.val = 0
                flagPositionChange = true
            }
        }
    
        for (const row in gameBlocks) {
            for (const col in gameBlocks[row]) {
                //block[row][col] try to merge with [col - 1] ...
                merge(parseInt(row), parseInt(col))
                shift(parseInt(row), parseInt(col))
            }
        }
    
        if(flagPositionChange)nextTick()
    },
    right: () => {
        if (gameInfo.deBounce) return
        let flagPositionChange = false
    
        const merge = (row: number, col: number) => {
            const block = gameBlocks[row][col]
            block.merged = false;
            if (block.val === 0) return;
            for (let nxtIndex = col + 1; nxtIndex < 4; nxtIndex++) {
                const nxtBlock = gameBlocks[row][nxtIndex]
                if (nxtBlock.val === 0) continue;
                if (block.val === nxtBlock.val && !nxtBlock.merged) {
                    nxtBlock.modify(nxtBlock.val * 2, "bounceIn")
                    nxtBlock.merged = true;
                    block.val = 0;
                    flagPositionChange = true
                }
                else {
                    return;
                }
            }
        }
    
        const shift = (row: number, col: number) => {
            const block = gameBlocks[row][col]
            let targetIndex = -1;
            if (block.val === 0) return
            for (let frontIndex = col + 1; frontIndex < 4; frontIndex++) {
                const frontVal = gameBlocks[row][frontIndex].val
                if (frontVal === 0) {
                    targetIndex = frontIndex;
                }
                else break
            }
    
            if (targetIndex != -1) {
                const targetBlock = gameBlocks[row][targetIndex]
                targetBlock.modify(block.val, "slideInLeft")
                block.val = 0
                flagPositionChange = true
            }
        }
    
        for (const row in gameBlocks) {
            for (let col = 3; col >= 0; col--) {
                merge(parseInt(row), col)
                shift(parseInt(row), col)
            }
        }
    
        if(flagPositionChange)nextTick()
    }
}

export { gameAction }