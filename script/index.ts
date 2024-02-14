window.addEventListener("DOMContentLoaded", () => {
    const addEggButton: HTMLElement = document.getElementById('add-egg')
    const pan: HTMLElement = document.getElementById('pan')
    addEggButton.addEventListener('click', addEgg)

    function addEgg(): void {
        const egg: Egg = new Egg(document.getElementById('time').value, `egg${eggs.length}`)
        eggs.push(egg)
        pan.appendChild(egg.toHtml())
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

function formatSecondsToText(totalSeconds: number): string {
    const minutes: number = Math.floor(totalSeconds / 60)
    const seconds: number = totalSeconds % 60
    const secondsString: string = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${minutes}:${secondsString}`
}

class Egg {
    secondsRemaining: number;
    id: string;

    constructor(timeText: string, id: string) {
        const time: string[] = timeText.split(':')
        this.secondsRemaining = (Number(time[0]) * 60) + Number(time[1])
        this.id = id
    }

    updateAndReturnSecondsRemaining(): number {
        if (this.secondsRemaining > 0) this.secondsRemaining--
        return this.secondsRemaining
    }

    toHtml(): HTMLElement {
        const eggHtml: HTMLElement = document.createElement('div')
        eggHtml.setAttribute('class', 'egg')
        eggHtml.setAttribute('id', this.id)
        eggHtml.textContent = formatSecondsToText(this.secondsRemaining)
        return eggHtml
    }
}