window.addEventListener("DOMContentLoaded", () => {
    const addEggbutton: HTMLElement = document.getElementById('add-egg')
    const pan: HTMLElement = document.getElementById('pan')

    addEggbutton.addEventListener('click', addEgg)

    let eggs: Egg[] = []

    function addEgg() {
        const egg: Egg = new Egg(document.getElementById('time').value, `egg${eggs.length}`)
        eggs.push(egg)
        pan.appendChild(egg.toHtml())
        setInterval(() => updateEgg(egg), 1000)
    }

    function updateEgg(egg: Egg): void {
        const eggLi: HTMLElement = document.getElementById(egg.id)
        const secondsRemaining: number = egg.updateAndReturnSecondsRemaining()
        eggLi.textContent = String(secondsRemaining)
    }
});

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
        const eggLi: HTMLLIElement = document.createElement('li')
        eggLi.setAttribute('id', this.id)
        eggLi.textContent = String(this.secondsRemaining)
        return eggLi
    }
}