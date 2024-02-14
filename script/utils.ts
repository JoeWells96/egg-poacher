function toPx(pixels: number): string {
    return `${pixels}px`
}

function formatSecondsToText(totalSeconds: number): string {
    const minutes: number = Math.floor(totalSeconds / 60)
    const seconds: number = totalSeconds % 60
    const secondsString: string = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${minutes}:${secondsString}`
}