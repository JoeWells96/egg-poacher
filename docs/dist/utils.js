function toPx(pixels) {
    return `${pixels}px`;
}
function formatSecondsToText(totalSeconds, withLeadingZeroMinute = false) {
    const minutes = Math.floor(totalSeconds / 60);
    const minutesString = minutes < 10 && withLeadingZeroMinute ? `0${minutes}` : `${minutes}`;
    const seconds = totalSeconds % 60;
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutesString}:${secondsString}`;
}
function formatTextToSeconds(timeText) {
    const time = timeText.split(':');
    return (Number(time[0]) * 60) + Number(time[1]);
}
