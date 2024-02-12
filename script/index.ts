window.addEventListener("DOMContentLoaded", () => {
    const addEggbutton: HTMLElement = document.getElementById('add-egg')
    const pan: HTMLElement = document.getElementById('pan')

    addEggbutton.addEventListener('click', addEgg)

    function addEgg() {
        const time = document.getElementById('time').value
        const egg = new Egg(time)
        const eggLi = document.createElement('li');
        eggLi.textContent = String(egg.secondsRemaining)

        pan.appendChild(eggLi)
    }
});

class Egg {
    secondsRemaining: number;

    constructor(timeText: string) {
        const time: string[] = timeText.split(':');
        this.secondsRemaining = (Number(time[0]) * 60) + Number(time[1])
    }
}