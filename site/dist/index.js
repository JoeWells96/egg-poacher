window.addEventListener("DOMContentLoaded", () => {
    const time = document.getElementById('time');
    const pan = document.getElementById('pan');
    const plus = document.getElementById("plus");
    const minus = document.getElementById("minus");
    pan.addEventListener('click', addOrRemoveEgg);
    plus.addEventListener('click', _ => updateTime(15));
    minus.addEventListener('click', _ => updateTime(-15));
    function updateTime(diff) {
        const newTime = formatTextToSeconds(time.value) + diff;
        if (newTime >= 0) {
            time.value = formatSecondsToText(newTime, true);
        }
        else {
            time.value = "00:00";
        }
    }
    function addOrRemoveEgg(event) {
        const target = event.target;
        if (target.matches(".egg")) {
            clearInterval(eggsIntervals.get(target.id));
            target.remove();
        }
        else {
            const egg = new Egg(time.value, `egg-${eggsIntervals.size}`);
            pan.appendChild(egg.toHtml(event.clientX, event.clientY));
            const intervalId = setInterval(() => updateEgg(egg, intervalId), 1000);
            eggsIntervals.set(egg.id, intervalId);
        }
    }
});
let eggsIntervals = new Map;
function updateEgg(egg, intervalId) {
    const eggLi = document.getElementById(egg.id);
    const secondsRemaining = egg.updateAndReturnSecondsRemaining();
    eggLi.textContent = formatSecondsToText(secondsRemaining);
    if (secondsRemaining == 0) {
        clearInterval(intervalId);
        eggLi.setAttribute('class', 'egg ready');
    }
}
class Egg {
    constructor(timeText, id) {
        this.width = 136;
        this.height = 190;
        this.secondsRemaining = formatTextToSeconds(timeText);
        this.id = id;
    }
    updateAndReturnSecondsRemaining() {
        if (this.secondsRemaining > 0)
            this.secondsRemaining--;
        return this.secondsRemaining;
    }
    toHtml(clickX, clickY) {
        const eggHtml = document.createElement('div');
        eggHtml.setAttribute('class', 'egg');
        eggHtml.setAttribute('id', this.id);
        eggHtml.style.width = toPx(this.width);
        eggHtml.style.height = toPx(this.height);
        eggHtml.style.left = toPx(clickX - this.width / 2);
        eggHtml.style.top = toPx(clickY - this.height / 2);
        eggHtml.textContent = formatSecondsToText(this.secondsRemaining);
        return eggHtml;
    }
}
