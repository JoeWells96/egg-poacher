window.addEventListener("DOMContentLoaded", () => {
    const time: HTMLInputElement = <HTMLInputElement>document.getElementById('time')
    const pan: HTMLElement = document.getElementById('pan')
    const plus: HTMLElement = document.getElementById("plus")
    const minus: HTMLElement = document.getElementById("minus")
    pan.addEventListener('click', addOrRemoveEgg)
    plus.addEventListener('click', _ => updateTime(15))
    minus.addEventListener('click', _ => updateTime(-15))

    function updateTime(diff: number): void {
        const newTime: number = formatTextToSeconds(time.value) + diff
        if (newTime >= 0) {
            time.value = formatSecondsToText(newTime, true)
        } else {
            time.value = "00:00"
        }
    }

    function addOrRemoveEgg(event: MouseEvent): void {
        const target: HTMLElement = <HTMLElement>event.target
        if (target.matches(".egg")) {
            clearInterval(eggsIntervals.get(target.id))
            target.remove()
        } else {
            const egg: Egg = new Egg(time.value, `egg-${eggsIntervals.size}`)
            pan.appendChild(egg.toHtml(event.clientX, event.clientY))
            const intervalId: number = setInterval(() => updateEgg(egg, intervalId), 1000)
            eggsIntervals.set(egg.id, intervalId)
        }
    }
});

let eggsIntervals: Map<string, number> = new Map<string, number>

function updateEgg(egg: Egg, intervalId: number): void {
    const eggLi: HTMLElement = document.getElementById(egg.id)
    const secondsRemaining: number = egg.updateAndReturnSecondsRemaining()
    eggLi.textContent = formatSecondsToText(secondsRemaining)
    if (secondsRemaining == 0) {
        clearInterval(intervalId)
        eggLi.setAttribute('class', 'egg ready')
    }
}

class Egg {
    secondsRemaining: number;
    id: string;
    private width: number = 136;
    private height: number = 190;

    constructor(timeText: string, id: string) {
        this.secondsRemaining = formatTextToSeconds(timeText)
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