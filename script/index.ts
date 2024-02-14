import {toPx, formatSecondsToText} from './utils';

window.addEventListener("DOMContentLoaded", () => {
    const pan: HTMLElement = document.getElementById('pan')
    document.addEventListener('click', addEgg)

    function addEgg(event): void {
        const timeString: string = (<HTMLInputElement>document.getElementById('time')).value
        const egg: Egg = new Egg(timeString, `egg${eggs.length}`)
        eggs.push(egg)
        pan.appendChild(egg.toHtml(event.clientX, event.clientY))
        const intervalId: number = setInterval(() => updateEgg(egg, intervalId), 1000)
    }
});

let eggs: Egg[] = []

function updateEgg(egg: Egg, intervalId: number): void {
    const eggLi: HTMLElement = document.getElementById(egg.id)
    const secondsRemaining: number = egg.updateAndReturnSecondsRemaining()
    eggLi.textContent = formatSecondsToText(secondsRemaining)
    if (secondsRemaining == 0) clearInterval(intervalId)
}

class Egg {
    secondsRemaining: number;
    id: string;
    private width: number = 136;
    private height: number = 190;

    constructor(timeText: string, id: string) {
        const time: string[] = timeText.split(':')
        this.secondsRemaining = (Number(time[0]) * 60) + Number(time[1])
        this.id = id
    }

    updateAndReturnSecondsRemaining(): number {
        if (this.secondsRemaining > 0) this.secondsRemaining--
        return this.secondsRemaining
    }

    toHtml(clickX: number, clickY: number): HTMLElement {
        const eggHtml: HTMLElement = document.createElement('div')
        eggHtml.setAttribute('class', 'egg')
        eggHtml.setAttribute('id', this.id)
        eggHtml.style.width = toPx(this.width)
        eggHtml.style.height = toPx(this.height)
        eggHtml.style.left = toPx(clickX - this.width / 2)
        eggHtml.style.top = toPx(clickY - this.height / 2)
        eggHtml.textContent = formatSecondsToText(this.secondsRemaining)
        return eggHtml
    }
}