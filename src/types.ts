interface Position {
    row: number,
    col: number
}

class GameBlock {
    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.id = this.row * 4 + this.col;
        this.el = document.getElementById(this.id.toString()) as HTMLElement;
        this.val = 0;
        this.merged = false;
    }
    row: number;
    col: number;
    id: number;
    el: HTMLElement;
    merged: boolean;
    get val() {
        return this.el.innerHTML === '' ? 0
            : parseInt(this.el.innerHTML)
    }
    set val(newVal: number) {
        this.el.innerHTML = newVal === 0 ? ''
            : newVal.toString()
        this.el.className = `unit-${newVal}`
    }
    modify(newVal: number, animate: string = "generate") {
        this.val = newVal
        this.el.style.animation = `${animate} 0.2s`;
        setTimeout(() => {
            this.el.style.animation = "";
        }, 200);
    }
}

export type { Position }
export { GameBlock }